
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

    addClient(client: Clientmodel):Observable<Clientmodel>{
        let apiURL =  `${this.API_URL}/cliente/`
        return this.http.post<Clientmodel>(apiURL, client, httpOptions).pipe(
            tap((client: Clientmodel) => console.log("Client added")),
            catchError(this.handleError<Clientmodel>('addClient'))
        )
    }

    updateClient(client: Clientmodel):Observable<any>{
        let apiURL =  `${this.API_URL}/cliente/${client.cedula}/edit/`
        return this.http.put(apiURL, client, httpOptions).pipe(
            tap(_ => console.log(`update client ${client.cedula}`)),
            catchError(this.handleError<any>('updateClient'))
        )
    }

    private handleError<T>(operation = 'operation', result?: T){
        return (error_object: any):Observable<T> =>{
            console.log(error_object.error);
            let error_message = "Your request return the following errors:\n"
            for ( var key in error_object.error){
                if (error_object.error.hasOwnProperty(key)){
                    error_message += key + ": " + error_object.error[key] + "\n"
                }
            }
            alert(error_message)
            return of(result as T)
        }
    }
}
