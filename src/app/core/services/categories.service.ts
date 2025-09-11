import { Injectable } from '@angular/core';
import { RestService } from '../../intranet/rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private rest: RestService) { }

  /**
   * Method for consuming the registered category retrieval service
   *
   * @param   {string}  url   Service URL
   * @param   {any}     data  Data passed as a parameter. If there is none, an empty object is sent.
   *
   * @return  {Promise<Object>}        Returns a promise with an object containing the service response and an attribute indicating whether an error has occurred.
   */
  listData = (url:string, data: any = {}) => {
    return this.rest.get(url, data);
  }
}
