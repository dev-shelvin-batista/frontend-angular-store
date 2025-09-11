import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../../core/utils/alerts.service';
import { SaveComponent } from '../save/save.component';
import { CONST } from '../../../../core/utils/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: false
})
export class ListComponent implements OnInit {
  list_products: any = [];

  constructor(
    private productSer: ProductsService, 
    private modalService: NgbModal, 
    private alertSer: AlertsService
  ) {}
  
  async ngOnInit() {
    await this.alertSer.openLoading();
    await this.listProducts();
    await this.alertSer.closeloading();
  }

  /**
   * Method for generating the list of registered products
   */
  async listProducts() {
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
  openModalSaveProduct(tipo:String = "save", id:String = "") {
    const modalRef = this.modalService.open(SaveComponent,
      { backdrop: 'static', keyboard: false, windowClass:'modal-lg' 
    });
    modalRef.componentInstance.action_type = tipo;
    modalRef.componentInstance.product_id = id;
    modalRef.result.then(async (data) => {
      await this.alertSer.openLoading();
      await this.listProducts();
      await this.alertSer.closeloading();
    },
    async (error) => {
    });
  }

  /**
   * Method for removing a product from inventory
   */
  deleteProduct(id: any) {
    const deleteFnt = async () => {
      await this.alertSer.openLoading();
      const {error, data}: any = await this.productSer.deleteData(`${CONST.URL}/product/${id}`);
      this.listProducts();
      await this.alertSer.closeloading();
    }
    this.alertSer.openAlert('Confirmation', "Do you want to delete this product?", 'Yes', deleteFnt, 'No')
  }
}
