import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Productmodel } from './product.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class ProductsService {

/**
 * Service with methods to add, edit or
 * delete products.
 *
 * @export
 * @class ProductsService
 */
  API_URL:string = "https://mactaquilla.herokuapp.com/taquilla-api"

   /**
     *Creates an instance of ClientService.
     * @param {HttpClient} http
     * @memberof ProductsService
     */
  constructor(public http: HttpClient) {}

   /**
     * Method to get all products
     *
     * @returns {Observable<Clientmodel[]>} Return list of products
     * if everything is ok or error if not 
     * @memberof ProductsService
     */

  getProductList() {
    let apiURL =  `${this.API_URL}/product/`
    return this.http.get<Productmodel[]>(apiURL).pipe(
    tap(clients => console.log("Fetched products")),
    catchError(this.handleError('getProductList'))
    )
  }

  /**
     * Method to add product
     *
     * @param {Productmodel} product to be added
     * @returns {Observable<any>} Return product if everything is ok
     * or error if not
     * @memberof ProductsService
     */
    addProduct(product: Productmodel):Observable<any>{
      let apiURL =  `${this.API_URL}/product/`
      return this.http.post<Productmodel>(apiURL, product, httpOptions).pipe(
          tap((client: Productmodel) => console.log("Product added")),
          catchError(this.handleError<any>('addProduct'))
      )
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
      let apiURL =  `${this.API_URL}/product/${product.pk}/`
      return this.http.put(apiURL, product, httpOptions).pipe(
          tap(_ => console.log(`update product ${product.pk}`)),
          catchError(this.handleError<any>('updateProduct'))
      )
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
      let apiURL = `${this.API_URL}/product/${product.pk}/`
      return this.http.delete<Productmodel>(apiURL, httpOptions).pipe(
          tap(_ => console.log(`delete product ${product.pk}`)),
          catchError(this.handleError<any>('deleteProduct'))
      )
  }


  /**
     * Method to handle error
     *
     * @private
     * @template T
     * @param {string} [operation='operation'] operation that generates the error
     * @returns Observable with error info
     * @memberof ProductsService
     */
    private handleError<T>(operation = 'operation'){
        return (error_object: any):Observable<T> =>{
            return of(error_object)
        }
    } 
}
