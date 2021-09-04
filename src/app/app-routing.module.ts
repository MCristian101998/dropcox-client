import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MainGuard } from './guards/main.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module")
      .then(m => m.AuthModule), 
    canActivate: [AuthGuard]
  },

  {
    path: '',
    loadChildren: () => import("./modules/main/main.module")
      .then(m => m.MainModule),
  
    canActivate: [MainGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }