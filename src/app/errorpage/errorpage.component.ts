import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { PieComponent } from '../pie/pie.component';
@Component({
  selector: 'app-errorpage',
  standalone: true,
  templateUrl: './errorpage.component.html',
  styleUrl: './errorpage.component.css',
  imports: [RouterLink, CabeceraComponent, PieComponent],
})
export class ErrorpageComponent {}
