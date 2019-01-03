import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { CatalogRoutingModule, routedComponents } from './catalog-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ProductsService } from './products/products.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType, ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    ThemeModule,
    CatalogRoutingModule,
    Ng2SmartTableModule,
    ToasterModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
    ProductsService,
    ToasterService,
  ],
})
export class CatalogModule { }
