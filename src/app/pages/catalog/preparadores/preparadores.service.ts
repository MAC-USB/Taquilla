import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Preparadormodel } from './preparadores.model';
import { catchError, tap } from 'rxjs/operators'
import { HttpHeaders, HttpClient } from '@angular/common/http'

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}


/**
 * Service with methods to add, edit or
 * delete preparadores.
 *
 * @export
 * @class PreparadorService
 */
@Injectable()
export class PreparadorService {

    API_URL:string = "https://mactaquilla.herokuapp.com/taquilla-api"

    /**
     *Creates an instance of PreparadorService.
     * @param {HttpClient} http
     * @memberof PreparadorService
     */
    constructor(
        private http: HttpClient
    ){}
    
    /**
     * Method to get all Preparadores
     *
     * @returns {Observable<Preparadormodel[]>} Return list of Preparadores 
     * if everything is ok or error if not 
     * @memberof PreparadorService
     */
    getPreparadores():Observable<any>{
        let apiURL =  `${this.API_URL}/assistant/`
        return this.http.get<Preparadormodel[]>(apiURL).pipe(
            catchError(this.handleError('getPreparadores'))
        )
    }

    /**
     * Method to add Preparador
     *
     * @param {Preparadormodel} preparador to be added
     * @returns {Observable<any>} Return Preparador if everything is ok
     * or error if not
     * @memberof PreparadorService
     */
    addPreparador(preparador: Preparadormodel):Observable<any>{
        let apiURL =  `${this.API_URL}/assistant/`
        return this.http.post<Preparadormodel>(apiURL, preparador, httpOptions).pipe(
            catchError(this.handleError<any>('addPreparadores'))
        )
    }

    /**
     * Method to edit Preparador
     *
     * @param {Preparadormodel} Preparador to be edited
     * @returns {Observable<any>} return Preparador if everythings is ok
     * or error if not
     * @memberof PreparadorService
     */
    updatePreparador(preparador: Preparadormodel):Observable<any>{
        let apiURL =  `${this.API_URL}/assistant/${preparador.id_document}/`
        return this.http.put(apiURL, preparador, httpOptions).pipe(
            tap(_ => console.log(`update preparador ${preparador.id_document}`)),
            catchError(this.handleError<any>('updatePreparador'))
        )
    }

    /**
     * Method to delete preparador
     *
     * @param {Preparadormodel} Preparador to be deleted
     * @returns {Observable<any>} return null if everythings is ok
     * or error if not
     * @memberof PreparadorService
     */
    deletePreparador(preparador: Preparadormodel):Observable<any>{
        let apiURL = `${this.API_URL}/assistant/${preparador.id_document}/`
        return this.http.delete<Preparadormodel>(apiURL, httpOptions).pipe(
            catchError(this.handleError<any>('deletePreparador'))
        )
    }

    
    /**
     * Method to handle errors
     *
     * @private
     * @template T
     * @param {string} [operation='operation'] operation that generates the error
     * @returns Observable with error info
     * @memberof PreparadorService
     */
    private handleError<T>(operation = 'operation'){
        return (error_object: any):Observable<T> =>{
            return of(error_object)
        }
    }
}