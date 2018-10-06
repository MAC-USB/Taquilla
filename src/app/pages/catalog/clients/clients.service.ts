
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

    private handleError<T>(operation = 'operation', result?: T){
        return (error: any):Observable<T> =>{
            console.log(error);
            return of(result as T)
        }
    }
}
