import { NgModule } from '@angular/core';

// services
import { CatalogService } from './catalog.service';

const components = [
];

const services = [
  CatalogService
];

@NgModule({
  imports: [
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ...services,
  ]
})
export class CatalogModule { }
