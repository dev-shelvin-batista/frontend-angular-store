import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from '../../shared/components/alerts/alerts.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  modalLoading = null as unknown as NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) { }

  /**
   * Method for generating a modal as an alert.
   *
   * @param   {string}    title           Title to display
   * @param   {string}    description     Description
   * @param   {string}    textButtonOk      Text on the Accept button
   * @param   {Function}  functionButtonOk  Method to be executed when the OK button in the modal is clicked before closing
   * @param   {string}    textButtonCancel      Cancel button text
   * @param   {Function}  functionButtonCancel  Method to be executed when the OK button in the modal is clicked before closing.
   *
   */
  openAlert = (title:string, description: string, textButtonOk = '', functionButtonOk: Function = () => {}, textButtonCancel = '', functionButtonCancel: Function = () => {}) => {
    const modalRef = this.modalService.open(AlertsComponent, { backdrop: 'static', keyboard: false, windowClass:'my-modal' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.description = description;
    modalRef.componentInstance.textButtonOk = textButtonOk;
    modalRef.componentInstance.functionButtonOk = functionButtonOk;
    modalRef.componentInstance.textButtonCancel = textButtonCancel;
    modalRef.componentInstance.functionButtonCancel = functionButtonCancel;
  }

  /**
   * Method for generating a loading modal
   * 
   * @param title Title to display
   */
  openLoading = (title:string = 'Loading...') => {
    this.modalLoading = this.modalService.open(LoadingComponent, { backdrop: 'static', keyboard: false, windowClass:'my-modal' });
    this.modalLoading.componentInstance.title = title;
  }

  /**
   * Method for closing the loading modal
   */
  closeloading = () => {
    this.modalLoading.close();
  }
}
