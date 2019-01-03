import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Productmodel } from './product.model';
import {BaseService} from '../../../app.base.service'
import { Http } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class ProductsService extends BaseService{

/**
 * Service with methods to add, edit or
 * delete products.
 *
 * @export
 * @class ProductsService
 */

   /**
     *Creates an instance of ProductService.
     * @param {HttpProduct} http
     * @memberof ProductsService
     */
  constructor(http:HttpClient) {
      super(http)
  }

   /**
     * Method to get all products
     *
     * @returns {Observable<Productmodel[]>} Return list of products
     * if everything is ok or error if not 
     * @memberof ProductsService
     */

  getProductList():Observable<Productmodel[]> {
    return this.getBase('product/')
    
  }

  /**
     * Method to add product
     *
     * @param {Productmodel} product to be added
     * @returns {Observable<Productmodel>} Return product if everything is ok
     * or error if not
     * @memberof ProductsService
     */
    addProduct(product: Productmodel):Observable<any>{
      return this.addBase(product,`product/`)
  }

  /**
     * Method to edit product
     *
     * @param {Productmodel} product to be edited
     * @returns {Observable<any>} return product if everythings is ok
     * or error if not
     * @memberof ProductsService
     */
    updateProduct(product: Productmodel):Observable<any>{
      return this.updateBase(product,`product/${product.pk}/`)
  }

      /**
     * Method to delete product
     *
     * @param {Productmodel} product to be deleted
     * @returns {Observable<any>} return null if everythings is ok
     * or error if not
     * @memberof ProductService
     */
    deleteProduct(product: Productmodel):Observable<any>{
      return this.deleteBase(product,`product/${product.pk}/`)
  }



}
