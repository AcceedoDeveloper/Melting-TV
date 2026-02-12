import { Routes } from '@angular/router';
import { Result } from './result/result';
import { Bunker } from './bunker/bunker';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'bunker', component: Bunker }
];