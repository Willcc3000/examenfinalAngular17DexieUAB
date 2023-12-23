import { Component } from '@angular/core';
import { SuscritoComponent } from '../suscrito/suscrito.component';

@Component({
  selector: 'app-cuerpo',
  standalone: true,
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.css',
  imports: [SuscritoComponent],
})
export class CuerpoComponent {}
