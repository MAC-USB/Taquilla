import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { CatalogComponent } from './catalog.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [{
  path: '',
  component: CatalogComponent,
  children: [{
    path: 'products',
    component: ProductsComponent,
  }, {
    path: 'clients',
    component: ClientsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule { }

export const routedComponents = [
  ProductsComponent,
  CatalogComponent,
  ClientsComponent
];
