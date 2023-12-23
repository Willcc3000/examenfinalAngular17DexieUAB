import { Routes } from '@angular/router';
import { ParabolaComponent } from './parabola/parabola.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'parabolas', component: ParabolaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // redirect to `inicio`
  { path: '**', component: ErrorpageComponent },
];
