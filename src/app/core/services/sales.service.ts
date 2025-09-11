import { Injectable } from '@angular/core';
import { RestService } from '../../intranet/rest.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  current_sale_detail: any = [];

  constructor(private rest: RestService) { }

  /**
   * Method for consuming the sales registration service
   *
   * @param   {string}  url   Service URL
   * @param   {any}     data  Data passed as a parameter. If there is none, an empty object is sent.
   *
   * @return  {Promise<Object>}        Returns a promise with an object containing the service response and an attribute indicating whether an error has occurred.
   */
  registerData = (url:string, data: any = {}) => {
    return this.rest.post(url, data);
  }
}
