// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TimeCapsuleListComponent } from './components/time-capsule-list/time-capsule-list.component';
import { CreateCapsuleComponent } from './components/create-capsule/create-capsule.component';

export const routes: Routes = [
  { 
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: TimeCapsuleListComponent },
      { path: 'create', component: CreateCapsuleComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];