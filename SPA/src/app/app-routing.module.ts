import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CustomersComponent } from './views/customers/customers.component';
import { AuthGuard } from './_core/_guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    component: CustomersComponent,
    title: 'customers'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'page not found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
