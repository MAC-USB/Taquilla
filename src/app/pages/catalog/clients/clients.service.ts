
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Clientmodel } from './clients.model';
import { catchError, tap } from 'rxjs/operators'
import { HttpHeaders, HttpClient } from '@angular/common/http'

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable()
export class ClientService {
    API_URL:string = "https://mactaquilla.herokuapp.com/taquilla-api"

    constructor(
        private http: HttpClient
    ){}
    
    getClients():Observable<Clientmodel[]>{
        let apiURL =  `${this.API_URL}/cliente/`
        return this.http.get<Clientmodel[]>(apiURL).pipe(
            tap(clients => console.log("Fetched clients")),
            catchError(this.handleError('getClients', []))
        )
    }

    addClient(client: Clientmodel):Observable<any>{
        let apiURL =  `${this.API_URL}/cliente/`
        return this.http.post<Clientmodel>(apiURL, client, httpOptions).pipe(
            tap((client: Clientmodel) => console.log("Client added")),
            catchError(this.handleError<any>('addClient'))
        )
    }

    updateClient(client: Clientmodel):Observable<any>{
        let apiURL =  `${this.API_URL}/cliente/${client.cedula}/edit/`
        return this.http.put(apiURL, client, httpOptions).pipe(
            tap(_ => console.log(`update client ${client.cedula}`)),
            catchError(this.handleError<any>('updateClient'))
        )
    }

    deleteClient(client: Clientmodel):Observable<any>{
        let apiURL = `${this.API_URL}/cliente/${client.cedula}/delete/`
        return this.http.delete<Clientmodel>(apiURL, httpOptions).pipe(
            tap(_ => console.log(`delete client ${client.cedula}`)),
            catchError(this.handleError<any>('deleteClient'))
        )
    }

    private handleError<T>(operation = 'operation', result?: T){
        return (error_object: any):Observable<T> =>{
            return of(error_object)
        }
    }
}
