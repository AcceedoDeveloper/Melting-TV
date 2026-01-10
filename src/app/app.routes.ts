import { Routes } from '@angular/router';
import { Result } from './result/result';
import { Bunker } from './bunker/bunker';

export const routes: Routes = [
  { path: '', component: Result },
  { path: 'bunker', component: Bunker }
];