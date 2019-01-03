import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [{
  path: '',
  component: ProductsComponent,
  children: [{
    path: 'products',
    component: CatalogComponent,
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
];
