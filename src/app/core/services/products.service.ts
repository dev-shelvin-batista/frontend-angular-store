import { Injectable } from '@angular/core';
import { RestService } from '../../intranet/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private rest: RestService) { }

  /**
   * Method for using the product registration service
   *
   * @param   {string}  url   Service URL
   * @param   {any}     data  Data passed as a parameter. If there is none, an empty object is sent.
   *
   * @return  {Promise<Object>}        Returns a promise with an object containing the service response and an attribute indicating whether an error has occurred.
   */
  registerData = (url:string, data: any = {}) => {
    return this.rest.post(url, data);
  }

  /**
   * Method for consuming a product update service
   *
   * @param   {string}  url   Service URL
   * @param   {any}     data  Data passed as a parameter. If there is none, an empty object is sent.
   *
   * @return  {Promise<Object>}        Returns a promise with an object containing the service response and an attribute indicating whether an error has occurred.
   */
  updateData = (url:string, data: any = {}) => {
    return this.rest.put(url, data);
  }

  /**
   * Method for consuming a product delete service
   *
   * @param   {string}  url   Service URL
   * @param   {any}     data  Data passed as a parameter. If there is none, an empty object is sent.
   *
   * @return  {Promise<Object>}        Returns a promise with an object containing the service response and an attribute indicating whether an error has occurred.
   */
  deleteData = (url:string, data: any = {}) => {
    return this.rest.delete(url, data);
  }

  /**
   * Method for consuming the service of obtaining registered products or a single product.
   *
   * @param   {string}  url  Service URL
   * @param   {any}     data  Data passed as a parameter. If there is none, an empty object is sent.
   *
   * @return  {Promise<Object>}        Returns a promise with an object containing the service response and an attribute indicating whether an error has occurred.
   */
  listData = (url:string, data: any = {}) => {
    return this.rest.get(url, data);
  }
}
