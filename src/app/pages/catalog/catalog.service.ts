import { Injectable } from '@angular/core';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BaseService } from '../../app.base.service';

@Injectable()
export class CatalogService extends BaseService {

  getAssistants(){
    let observers = new BehaviorSubject(null);
    this.getBase('assistant/').subscribe(data => {
      var assitants = data;
      observers.next(assitants);
    }, error => {
      observers.next(error);
    });
    return observers;
  }

  getClients(){
    let observers = new BehaviorSubject(null);
    this.getBase('client/').subscribe(data => {
      var clients = data;
      observers.next(clients);
    }, error => {
      observers.next(error);
    });
    return observers;
  }
}