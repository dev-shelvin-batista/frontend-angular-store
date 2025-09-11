import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  /**
   * Generate a connection to a POST-type REST service.
   *
   * @param   {string}  url   URL of the REST service to be executed
   * @param   {any}     data  Parameters to be sent in the REST service
   *
   * @return  {Promise<object>}   A promise is generated with the result of the REST service, whether it is correct or contains an error.
   */
  post = (url: string, data: any) => {
    return new Promise(resolve => {            
      this.http.post(`${url}`, data).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error || dataError.error.Message || dataError.error.errors
          })
        }
      })
    })
  }

  /**
   * Generate a connection to a PUT-type REST service.
   *
   * @param   {string}  url   URL of the REST service to be executed
   * @param   {any}     data  Parameters to be sent in the REST service
   *
   * @return  {Promise<object>}   A promise is generated with the result of the REST service, whether it is correct or contains an error.
   */
  put(url: string, data: any) {
    return new Promise(resolve => {
      
      this.http.put(url, data).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error || dataError.error.Message || dataError.error.errors
          })
        }
      })
    })
  }

  /**
   * Generate a connection to a DELETE-type REST service.
   *
   * @param   {string}  url   URL of the REST service to be executed
   * @param   {any}     data  Parameters to be sent in the REST service
   *
   * @return  {Promise<object>}   A promise is generated with the result of the REST service, whether it is correct or contains an error.
   */
  delete(url: string, data: any) {
    return new Promise(resolve => {
      
      this.http.delete(url, {body: data}).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error.error || dataError.error.Message
          })
        }
      })
    })
  }

  /**
   * Generate a connection to a GET-type REST service.
   *
   * @param   {string}  url   URL of the REST service to be executed
   * @param   {any}     data  Parameters to be sent in the REST service
   *
   * @return  {Promise<object>}        A promise is generated with the result of the REST service, whether it is correct or contains an error.
   */
  get = (url: string, data: any) => {
    return new Promise(resolve => {
      this.http.get(`${url}`, {params: data}).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          });
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error.error || dataError.error.Message || dataError.error.errors
          })
        }
      })
    })
  }
}
