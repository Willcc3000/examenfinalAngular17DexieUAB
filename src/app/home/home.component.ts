import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { CuerpoComponent } from '../cuerpo/cuerpo.component';
import { PieComponent } from '../pie/pie.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CabeceraComponent, CuerpoComponent, PieComponent, BannerComponent],
})
export class HomeComponent {}
