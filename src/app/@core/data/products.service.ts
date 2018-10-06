import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductsService {

  /*Endpoint to product list*/
  ProductList_URL = 'http://mactaquilla.herokuapp.com/taquilla-api/articulo/'

  constructor(public http: HttpClient) {}

  /*Method get to product list from backend*/
  getProductList() {
    const observable = new BehaviorSubject(null);
    this.http.get(this.ProductList_URL).subscribe(data => {
      if (data) {
        observable.next(data);
      }
    });
    return observable;
  }

  /*Method post to create product on backend*/
  createProduct(product) {
    const observable = new BehaviorSubject(null);
    this.http.post(this.ProductList_URL, product).subscribe(data => {
      if (data) {
        observable.next(data);
      }else {
        // console.log('Error to create product on backend');
      }
    });
    return observable;
  }
}
