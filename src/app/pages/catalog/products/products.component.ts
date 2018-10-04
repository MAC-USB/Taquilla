import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsService } from '../../../@core/data/products.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './products.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class  ProductsComponent {

  /*Settings of ng2-smart-table configuration*/
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      pk: {
        title: 'ID',
        type: 'number',
      },
      precio: {
        title: 'Precio',
        type: 'number',
      },
      
    },
  };

  private source: LocalDataSource = new LocalDataSource();
  private productsList;

  constructor(private service: ProductsService) {}

  /*Get product list from service*/
  getProducts(){
    this.service.getProductList().subscribe(data=>{
      if(data){
        this.productsList = data;
        this.source.load(this.productsList);
      }else{
        console.log('Error to load products list');
      }
    })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event){
    console.log(event);
  }

  ngOnInit(){
    this.getProducts();
    
  }
}
