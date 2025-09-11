import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { SalesService } from '../../../../core/services/sales.service';
import { AlertsService } from '../../../../core/utils/alerts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrentSaleComponent } from '../current-sale/current-sale.component';
import { CONST } from '../../../../core/utils/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent {
  list_products: any = [];

  constructor(
    private productSer: ProductsService, 
    public saleSer: SalesService,
    private alertSer: AlertsService,
    private modalService: NgbModal
    ) {}

  async ngOnInit() {
    await this.alertSer.openLoading();
    await this.getProducts();
    await this.alertSer.closeloading();
  }
  /**
   * Method for generating the list of registered products
   */
  async getProducts() {
    this.list_products = [];
    const {error, data}: any = await this.productSer.listData(`${CONST.URL}/product`);
    if(!error) {
      this.list_products = [...data];
      return;
    }  
    this.alertSer.openAlert('Message', `A server error occurred while performing the operation.`, 'Ok');
    return;
  }

  /**
   * Method for opening the product data save window, either for recording or editing.
   */
  async openModalCurrentSale() {
    await this.alertSer.openLoading();
    this.modalService.open(CurrentSaleComponent,
      { backdrop: 'static', keyboard: false, windowClass: 'modal-lg' 
    });
    await this.alertSer.closeloading();
  }

  /**
   * Method for adding a product for sale or increasing the quantity
   *  
   * @param item Product to add to sale
   */
  async addProductSale(item: any){
    if(Number(item.count) > 0){
      await this.alertSer.openLoading();
      if(Number(item.stock) >= Number(item.count)){
        const exists = this.saleSer.current_sale_detail.find((obj: any) => obj.product_id == item.id);
    
        if(exists){
          exists.count += Number(item.count);
          exists.total = exists.price * exists.count;
        } else {
          this.saleSer.current_sale_detail.push({
            product_id: item.id,
            description: item.description,
            reference: item.reference,
            price: Number(item.price),
            count: Number(item.count),
            total: Number(item.price) * Number(item.count)
          });
        }
        item.count = 0;
      } else {
        this.alertSer.openAlert('Message', "There is insufficient stock of the product to complete the sale.", 'Ok')
      }
      await this.alertSer.closeloading();
    } else {
      this.alertSer.openAlert('Message', "You must enter an amount greater than zero for the product to be added.", 'Ok')
    }   
  }
}
