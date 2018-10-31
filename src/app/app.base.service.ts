import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';

/**
 * Base service to do GET and POST methods globaly.
 * @export
 * @class BaseService
 */
@Injectable()
export class BaseService {

  // Variables Declaration.
  base_path: string = ''; // Route to server.
  json_path: string = ''; // Route to JSON (Only for testing).

  /**
   * Creates an instance of BaseService.
   * @param {Http} http // Method to establish the http connection.
   * @memberof BaseService
   */
  constructor(private http: Http) {}

  /**
   * Get's data from backend.
   * @param {string} endpoint // Provides the endpoint to access backend.
   * @memberof BaseService
  */
  getBase(
    endpoint: string 
  ):Object {
    return this.http.get(this.base_path + endpoint, null)
      .map((res: any) => {
        return res.json();
      }
    )
  }

  /**
   * Get's data from local JSON. Only for testing purposes.
   * @param {string} endpoint // Provides the endpoint to access backend.
   * @memberof BaseService
  */
  getJSON(
    endpoint: string
  ):Object {
    return this.http.get(this.json_path + endpoint, null)
      .map((res: any) => {
        return res.json();
      }
    )
  }

  /**
   * Does modifications on backend. (Edit, Delete).
   * @param {string} endpoint // Provides the endpoint to access backend.
   * @param {Object} payload // JSON data to do modifications in backend data.
   * @param {ResquestOptions} options // Configuration for permissions.
   * @memberof BaseService
  */
  postBase(
    endpoint: string, 
    payload: Object, 
    options: RequestOptions = null,
  ):Object {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: headers });
    return this.http.post(this.base_path + endpoint, payload, options)
      .map((res: any) => {
        return res.json();
      }
    )
  };

}