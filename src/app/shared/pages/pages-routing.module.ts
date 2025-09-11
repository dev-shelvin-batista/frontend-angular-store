import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
  },
  {
    path: '',
    redirectTo: '/sales/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/sales/home',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
