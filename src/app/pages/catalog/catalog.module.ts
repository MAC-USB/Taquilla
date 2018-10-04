import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { CatalogRoutingModule, routedComponents } from './catalog-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ProductsService } from '../../@core/data/products.service';

@NgModule({
  imports: [
    ThemeModule,
    CatalogRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
    ProductsService
  ],
})
export class CatalogModule { }
