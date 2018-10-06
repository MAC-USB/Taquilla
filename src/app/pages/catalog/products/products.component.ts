import { Component, OnInit } from '@angular/core';
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
export class  ProductsComponent implements OnInit {

  /*Settings of ng2-smart-table configuration*/
  settings = {
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
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
  getProducts() {
    this.service.getProductList().subscribe(data => {
      if (data) {
        this.productsList = data;
        this.source.load(this.productsList);
      }else {
        // console.log('Error to load products list');
      }
    })
  }

  /*Delete especify product from service*/
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      let deleteProduct = event.data;
      this.service.deleteProduct(deleteProduct).subscribe(data=>{

          console.log('Se ha eliminado exitosamente');
          event.confirm.resolve(event);

      })
    } else {
      event.confirm.reject();
    }
  }

  /*Handler event to create and send new Product to service*/
  onCreateConfirm(event) {
    let newProduct = event.newData;
    this.service.createProduct(newProduct).subscribe(data=>{
      if (data){
        event.confirm.resolve(event.newData);
        this.getProducts();
        console.log('El producto se ha creado exitosamente');
      }else{
        console.log('Hubo un error')
      }
    }
    )
  }

  /*Update product list from service*/
  updatesRecord(event) {
    let newProduct = event.newData;
    this.service.updateProduct(newProduct).subscribe(data=>{
      if (data){
        event.confirm.resolve(event.newData);
        console.log('El producto se ha creado exitosamente');
      }else{
        console.log('Hubo un error')
      }
    }
    )
    
  }


  ngOnInit() {
    this.getProducts();

  }
}
