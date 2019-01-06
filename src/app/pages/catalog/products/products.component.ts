import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {Productmodel} from './product.model';
// Services
import { ProductsService } from './products.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

/**
 * Component for crud of products
 *
 * @export
 * @class ProductsComponent
 */
@Component({
  selector: 'crud-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class  ProductsComponent{

    // smart-table settings
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      price: {
        title: 'Precio',
        type: 'number',
      },
    },
  };

  activeModal: any;
  private source: LocalDataSource = new LocalDataSource(); //Storage on cache
  private productsList:any;
  edit: boolean = false; //Var to difference if open edit modal or add modal
  product:Productmodel = new Productmodel();
  config:ToasterConfig = new ToasterConfig({ //Toaster configurations
    positionClass: 'toast-top-full-width',
    timeout: 30000,
    tapToDismiss: true,
    showCloseButton: true
  });


  /**
   *Creates an instance of ProductsComponent.
   * @param {ProductsService} clientService
   * @param {NgbModal} modalService
   * @param {ToasterService} toasterService
   * @memberof ProductsComponent
   */

  constructor(private ProductsService: ProductsService,
              private modalService: NgbModal,
              private toasterService: ToasterService
              ) 
  {

    this.getProducts();
  }

  //The following methods are for manage modal system

  /**
   * Activate add product modal
   *
   * @param {*} content Template to be render
   * @memberof ProductsComponent
   */
  addProductModal(content): void{
    this.activeModal =  this.modalService.open(content, { size: 'lg'})
  }

  /**
   * Activate edit product modal
   *
   * @param {*} content Template to be render
   * @param {*} event with product info
   * @memberof ProductsComponent
   */
  editProductModal(content, event): void{
    this.edit = true
    Object.assign(this.product, event.data)
    const modal_options : NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.product = new Productmodel();
        this.edit = false
        return true
      }
    }
    this.activeModal = this.modalService.open(content, modal_options)
  }

   /**
   * Delete product modal
   *
   * @param {*} content to be render
   * @param {*} event withproduct info
   * @memberof ProductsComponent
   */
  deleteProductModal(content, event): void{
    this.product = event.data
    const modal_options : NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.product = new Productmodel();
        return true
      }
    }
    this.activeModal = this.modalService.open(content, modal_options)
  }

  
  //The following methods are for interact on DB


   /**
   * Get clients from service/DB and show their info on smart-table
   *
   * @memberof ProductsComponent
   */
   getProducts() {
    this.ProductsService.getProductList().subscribe(data => {
      if (data) {
        this.productsList = data;
        this.source.load(this.productsList);
      }else {
        // console.log('Error to load products list');
      }
    })
  }

  /**
   * Method that makes to add a new product to service/DB
   *
   * @memberof ProductsComponent
   */
  addProduct() {
    this.ProductsService.addProduct(this.product).subscribe(data=>{
      if (data){ 
        if(!data.error){
          this.activeModal.dismiss()
          this.getProducts() 
        }else{ 
          this.showErrorMessage(data.error)
        }
      }
    })
  }

   /**
   * Method that makes the update for a product info on service/DB
   *
   * @memberof ProductsComponent
   */
  editProduct(){
    this.ProductsService.updateProduct(this.product).subscribe(data=>{
      if(data){
        if (!data.error){
          this.activeModal.dismiss();
          this.getProducts();
        }
        else {
          this.showErrorMessage(data.error)
        } 
      }
      
    })
  }

    /**
   * Confirm method for delete product on service/DB
   *
   * @param {Productmodel} product to be deleted
   * @memberof ProductsComponent
   */
  deleteProduct(product: Productmodel): void {
    this.ProductsService.deleteProduct(product).subscribe(data =>{
      if (data == null){
        this.activeModal.dismiss()
        this.getProducts()
      }else{
        this.showErrorMessage(data.error)
      }
    })
  }

  //The following method is for error handle
  
   /**
   * Method to show notifications
   * when some error occurs
   *
   * @param {*} object with error info
   * @memberof ClientsComponent
   */
  showErrorMessage(object): void{
    let error_message = ""
    for ( var key in object){
        if (object.hasOwnProperty(key)){
            error_message += object[key] + "\n"
        }
    }
    this.toasterService.pop('warning', 'Tu solicitud presentó los siguientes errores:\n',
    error_message)
  }

}
