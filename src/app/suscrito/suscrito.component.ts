import { Component, Input, OnInit, VERSION } from '@angular/core';
// import { CabeceraComponent } from '../cabecera/cabecera.component';
import { liveQuery } from 'dexie';
import { db } from '../shared/db';
import { Suscrito } from '../shared/suscritos.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-suscrito',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './suscrito.component.html',
  styleUrl: './suscrito.component.css',
})
export class SuscritoComponent implements OnInit {
  // @Input() form: FormGroup | undefined;
  btnNuevoModificar = 1;
  alertTipo = 3;
  alertSMS = '';
  id = new FormControl('');
  nombreCompleto = new FormControl('');
  correo = new FormControl('');
  celular = new FormControl('');

  checkoutForm;
  listaSuscritos = liveQuery(() => db.suscritos.toArray());
  suscritos: Suscrito[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.btnNuevoModificar = 1;
    this.alertTipo = 3;
    this.alertSMS = '';
    console.log(this.btnNuevoModificar);
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: '',
    });
    // this.listaSuscritos.subscribe(
    //   (suscrito) => {
    //     this.suscritos = suscrito;
    //     console.log(suscrito);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    this.listTodoSuscritos();
  }

  ngOnInit() {
    // this.items = this.cartService.getItems();
  }

  async nuevoSuscrito() {
    // Asumiendo que this.nombreCompleto, this.correo, y this.celular son instancias de FormControl
    if (
      !this.nombreCompleto.value ||
      !this.correo.value ||
      !this.celular.value
    ) {
      // Si alguno de los campos está vacío, muestra un mensaje de error
      this.alertTipo = 2;
      this.alertSMS =
        'Error al querer registrarte, debes llenar todos los campos';
    } else {
      // Si todos los campos están llenos, procede a añadir los datos a la base de datos
      await db.suscritos.add({
        nombreCompleto: this.nombreCompleto.value,
        correo: this.correo.value,
        celular: Number(this.celular.value),
      });
      this.alertTipo = 1;
      this.alertSMS =
        'Bienvenido a nuestra comunidad, no olvides visitar nuestra página frecuentemente';

      // Limpiar los campos del formulario
      this.id.setValue('');
      this.nombreCompleto.setValue('');
      this.correo.setValue('');
      this.celular.setValue('');

      // Actualizar la lista de suscritos (si es necesario)
      this.listTodoSuscritos();
    }

    this.btnNuevoModificar = 1;
  }

  updateName(id: any, nom: any, corr: any, cel: any) {
    this.btnNuevoModificar = 2;

    // console.log(id);
    // console.log(nom);
    // console.log(corr);

    this.id.setValue(id);
    this.nombreCompleto.setValue(nom);
    this.correo.setValue(corr);
    this.celular.setValue(cel);
  }

  async updateDato() {
    if (
      !this.nombreCompleto.value ||
      !this.correo.value ||
      !this.celular.value
    ) {
      // Si alguno de los campos está vacío, muestra un mensaje de error
      this.alertTipo = 2;
      this.alertSMS =
        'Error al querer actualizar datos, debes llenar todos los campos';
    } else {
      db.suscritos
        .update(Number(this.id.value), {
          nombreCompleto: this.nombreCompleto.value,
          correo: this.correo.value,
          celular: Number(this.celular.value),
        })
        .then(function (updated) {
          if (updated) console.log('Datos modificados correctamente');
          else console.log('Registro no encontrado');
        });
      this.btnNuevoModificar = 1;
      this.alertTipo = 1;
      this.alertSMS =
        'Registro modificado correctamente en nuestra base de datos';
      // Limpiar los campos del formulario
      this.id.setValue('');
      this.nombreCompleto.setValue('');
      this.correo.setValue('');
      this.celular.setValue('');
    }
    this.listTodoSuscritos();
  }

  async deleteDato(id: any) {
    this.btnNuevoModificar = 1;

    db.suscritos.delete(Number(id));
    console.log('Registro ELIMINADO');
    this.alertTipo = 1;
    this.alertSMS =
      'Seguidor de Cristo eliminado de nuestra base de datos correctamente ';
    this.listTodoSuscritos();
  }

  async listTodoSuscritos() {
    // console.log(db.suscritos.toArray());
    db.suscritos
      .toArray()
      .then((data) => {
        this.suscritos = data;
      })
      .catch((error) => {
        console.error('Error al acceder a los datos:', error);
      });
  }

  async cancelarBtn() {
    this.btnNuevoModificar = 1;
    this.id.setValue('');
    this.nombreCompleto.setValue('');
    this.correo.setValue('');
    this.celular.setValue('');
    this.alertTipo = 3;
    this.alertSMS = '';
  }
}
