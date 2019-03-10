
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Clientmodel } from './clients.model';
import { catchError, tap } from 'rxjs/operators'
import { HttpHeaders, HttpClient } from '@angular/common/http'

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}


/**
 * Service with methods to add, edit or
 * delete clients.
 *
 * @export
 * @class ClientService
 */
@Injectable()
export class ClientService {

    API_URL:string = "https://mactaquilla.herokuapp.com/taquilla-api"

    /**
     *Creates an instance of ClientService.
     * @param {HttpClient} http
     * @memberof ClientService
     */
    constructor(
        private http: HttpClient
    ){}
    
    /**
     * Method to get all clients
     *
     * @returns {Observable<Clientmodel[]>} Return list of clients 
     * if everything is ok or error if not 
     * @memberof ClientService
     */
    getClients():Observable<any>{
        let apiURL =  `${this.API_URL}/client/`
        return this.http.get<Clientmodel[]>(apiURL).pipe(
            tap(clients => console.log("Fetched clients")),
            catchError(this.handleError('getClients'))
        )
    }

    /**
     * Method to add client
     *
     * @param {Clientmodel} client to be added
     * @returns {Observable<any>} Return client if everything is ok
     * or error if not
     * @memberof ClientService
     */
    addClient(client: Clientmodel):Observable<any>{
        let apiURL =  `${this.API_URL}/client/`
        return this.http.post<Clientmodel>(apiURL, client, httpOptions).pipe(
            tap((client: Clientmodel) => console.log("Client added")),
            catchError(this.handleError<any>('addClient'))
        )
    }

    /**
     * Method to edit client
     *
     * @param {Clientmodel} client to be edited
     * @returns {Observable<any>} return client if everythings is ok
     * or error if not
     * @memberof ClientService
     */
    updateClient(client: Clientmodel):Observable<any>{
        let apiURL =  `${this.API_URL}/client/${client.id_document}/`
        return this.http.put(apiURL, client, httpOptions).pipe(
            tap(_ => console.log(`update client ${client.id_document}`)),
            catchError(this.handleError<any>('updateClient'))
        )
    }

    /**
     * Method to delete client
     *
     * @param {Clientmodel} client to be deleted
     * @returns {Observable<any>} return null if everythings is ok
     * or error if not
     * @memberof ClientService
     */
    deleteClient(client: Clientmodel):Observable<any>{
        let apiURL = `${this.API_URL}/client/${client.id_document}/`
        return this.http.delete<Clientmodel>(apiURL, httpOptions).pipe(
            tap(_ => console.log(`delete client ${client.id_document}`)),
            catchError(this.handleError<any>('deleteClient'))
        )
    }

    
    /**
     * Method to handle errors
     *
     * @private
     * @template T
     * @param {string} [operation='operation'] operation that generates the error
     * @returns Observable with error info
     * @memberof ClientService
     */
    private handleError<T>(operation = 'operation'){
        return (error_object: any):Observable<T> =>{
            return of(error_object)
        }
    }
}
