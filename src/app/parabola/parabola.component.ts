import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { PieComponent } from '../pie/pie.component';
import moment from 'moment';
import 'moment/locale/es'; // Importa la localización en español
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { db } from '../shared/db';
import { Parabola } from '../shared/parabolas.model';
import { liveQuery } from 'dexie';

@Component({
  selector: 'app-parabola',
  standalone: true,
  templateUrl: './parabola.component.html',
  styleUrl: './parabola.component.css',
  imports: [CabeceraComponent, ReactiveFormsModule, PieComponent],
})
export class ParabolaComponent implements OnInit {
  alertTipo = 3;
  alertSMS = '';
  idRegistro: any;

  nickname = new FormControl('');
  tipoPubli = new FormControl('');
  tuparabola = new FormControl('');

  checkoutForm: any;
  listaSuscritos = liveQuery(() => db.parabolas.toArray());
  parabolas: Parabola[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.alertTipo = 3;
    this.alertSMS = '';
    this.listTodoParabolas();
  }
  convertirFecha(fecha: any): string {
    return moment(fecha).fromNow();
  }

  ngOnInit() {
    // this.items = this.cartService.getItems();
  }

  async listTodoParabolas() {
    db.parabolas
      .orderBy('id')
      .reverse()
      .toArray()
      .then((data) => {
        this.parabolas = data;
      })
      .catch((error) => {
        console.error('Error al acceder a los datos PARABOLAS:', error);
      });
  }

  async nuevoParabola() {
    // Asumiendo que this.nombreCompleto, this.correo, y this.celular son instancias de FormControl
    if (
      !this.nickname.value ||
      !this.tipoPubli.value ||
      !this.tuparabola.value
    ) {
      // Si alguno de los campos está vacío, muestra un mensaje de error
      this.alertTipo = 2;
      this.alertSMS =
        'Error al querer registrarte, debes llenar todos los campos';
    } else {
      let fecha = new Date();
      // Si todos los campos están llenos, procede a añadir los datos a la base de datos
      await db.parabolas.add({
        nickname: this.nickname.value,
        tipoPubli: this.tipoPubli.value,
        tuparabola: this.tuparabola.value,
        fechapubli: fecha,
      });
      this.alertTipo = 1;
      this.alertSMS =
        'Tu mensaje registrado correctamente, puedes eliminar en cualquier momento si asi lo deseas.';

      // Limpiar los campos del formulario
      this.nickname.setValue('');
      this.tipoPubli.setValue('');
      this.tuparabola.setValue('');

      // Actualizar la lista de  (si es necesario)
      this.listTodoParabolas();
    }
  }

  async preparaDeleteParabola(id: any) {
    this.idRegistro = id;
  }

  async deleteParabola(id: any) {
    db.parabolas.delete(Number(id));
    console.log('Registro ELIMINADO');
    this.alertTipo = 1;
    this.alertSMS =
      'Publicación eiminado de nuestra base de datos correctamente ';
    this.listTodoParabolas();
  }
}
