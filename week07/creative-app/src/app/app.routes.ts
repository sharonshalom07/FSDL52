import { Routes } from '@angular/router';
import { TimeCapsuleListComponent } from './components/time-capsule-list/time-capsule-list.component';
import { CreateCapsuleComponent } from './components/create-capsule/create-capsule.component';

export const routes: Routes = [
  { path: '', component: TimeCapsuleListComponent },
  { path: 'create', component: CreateCapsuleComponent },
  { path: '**', redirectTo: '' }
];