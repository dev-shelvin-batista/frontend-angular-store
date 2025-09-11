import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../../../../core/services/sales.service';
import { AlertsService } from '../../../../core/utils/alerts.service';
import { Router } from '@angular/router';
import { CONST } from '../../../../core/utils/environment';

@Component({
  selector: 'app-current-sale',
  templateUrl: './current-sale.component.html',
  styleUrl: './current-sale.component.scss',
  standalone: false
})
export class CurrentSaleComponent {
  total_sale:number = 0

  constructor(
    private activeModal: NgbActiveModal,
    public saleSer: SalesService,
    private alertSer: AlertsService,
    private router: Router
  ){}

  async ngOnInit() {
    await this.alertSer.openLoading();
    await this.calculateTotal();
    await this.alertSer.closeloading();
  }

  /**
   * Close the data saving window
   */
  async closeWindow() {
    this.activeModal.close();
  }

  /**
   * Method for removing a product from the current sale
   * 
   * @param id ID of the product to be deleted
   */
  deleteProduct(id: any) {
    const deleteFnt = async () => {
      await this.alertSer.openLoading();
      this.saleSer.current_sale_detail = this.saleSer.current_sale_detail.filter((obj:any) => obj.product_id != id);
      await this.alertSer.closeloading();
    }
    this.alertSer.openAlert('Confirmation', "Do you want to delete this product?", 'Yes', deleteFnt, 'No')
  }

  /**
   * Method for recording sales data
   * 
   */
  async saveSale() {
    await this.alertSer.openLoading();
    const callBack = async () => {
      const request = {
        total: this.total_sale,
        detail: this.saleSer.current_sale_detail
      };

      const {error, data}: any = await this.saleSer.registerData(`${CONST.URL}/sale`, request);

      if(!error) {
        this.alertSer.openAlert(
          'Message',
          `Sale saved successfully!`,
          'Ok',
          () => {
            this.closeWindow();
            this.router.navigateByUrl("/sales/confirmation");
          }
        );
        this.saleSer.current_sale_detail = [];
        this.total_sale = 0;
        await this.alertSer.closeloading();
        return;
      }
      await this.alertSer.closeloading();
      this.alertSer.openAlert('Message', `The following errors have occurred: ${data}`, 'Ok');
            
    }
    await this.alertSer.closeloading();
    this.alertSer.openAlert('Confirmation', "Would you like to save the current sale?", 'Yes', callBack, 'No')
  }

  /**
   * Method for calculating the total of the current sale
   */
  async calculateTotal(){
    this.total_sale = 0;  
    this.saleSer.current_sale_detail.forEach((item:any) => {
      this.total_sale += item.total;
    });
  }

}
