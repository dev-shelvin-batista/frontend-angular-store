import { Component, Input } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ProductsService } from '../../../../core/services/products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../../core/utils/alerts.service';
import { CONST } from '../../../../core/utils/environment';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrl: './save.component.scss',
  standalone: false
})
export class SaveComponent {
  list_categories: any = [];
  @Input() action_type = "";
  @Input() product_id = "";

  product: any = {
    description: "",
    reference: "",
    price: 0,
    weight: 0,
    category_id: "",
    stock: 0
  }

  constructor(
    private categorySer: CategoriesService, 
    private productSer: ProductsService, 
    private activeModal: NgbActiveModal,
    private alertSer: AlertsService
    ){}

  async ngOnInit() {
    await this.alertSer.openLoading();
    await this.resetFields();
    await this.listCategories();

    if(this.action_type == 'edit') {
      await this.getProduct();
    }
    await this.alertSer.closeloading();
  }

  /**
   * Method for generating the list of registered categories
   */
  async listCategories() {
    this.list_categories = [];
    const {error, data}: any = await this.categorySer.listData(`${CONST.URL}/category`);
    if(!error) {
      this.list_categories = [...data];
      return;
    }  
    this.alertSer.openAlert('Message', `A server error occurred while performing the operation.`, 'Ok');
    return;
  }

  /**
   * Method for saving product data, either when registering or editing it.
   */
  async saveData(){
    await this.alertSer.openLoading();
    const validate = this.validateFields();
    if(validate.length == 0){      
      if(this.action_type == 'save') {
        const {error, data}: any = await this.productSer.registerData(`${CONST.URL}/product`, this.product);
        if(!error) {
          await this.alertSer.closeloading();
          this.alertSer.openAlert('Message', `Product stored correctly!`, 'Ok', () => {this.closeWindow();});
          await this.resetFields();
          return;
        } 
        const errors = [];
        for (let [key, value] of Object.entries(data)) {
          switch(key){
            case "description":
              value = 'You must enter the description.'
              break;
            case "reference":
              value = 'You must enter the reference.'
              break;
            case "price":
              value = 'You must enter a price greater than zero.'
              break;
            case "weight":
              value = 'You must enter a weight greater than zero.'
              break;
            case "category_id":
              value = 'You must select the category.'
              break;
            case "stock":
              value = 'You must enter a stock level greater than zero.'
              break;
          }
          errors.push(value);
        }
        this.alertSer.openAlert('Message', `The following errors have occurred: ${errors.join(", ")}`);
        await this.alertSer.closeloading();
      } else {
        const {error, data}: any = await this.productSer.updateData(`${CONST.URL}/product/${this.product_id}`, this.product);
        if(!error) {
          this.alertSer.openAlert('Message', `Product stored correctly!`, 'Ok', () => {this.activeModal.close();});
          await this.resetFields();
          await this.alertSer.closeloading();
        } 
      }
      return;
    }
    await this.alertSer.closeloading();
    this.alertSer.openAlert('Message', `The following errors have occurred: ${validate.join(", ")}`, 'Ok');
     
  }

  /**
   * Method for consulting the data of the product to be edited.
   */
  async getProduct() {
    const {error, data}: any = await this.productSer.listData(`${CONST.URL}/product/${this.product_id}`);
    if(!error) {
      this.product = {...data};
      return;
    }  
    this.alertSer.openAlert('Message', `A server error occurred while performing the operation.`, 'Ok');
    return;
  }

  /**
   * Close the data saving window
   */
  async closeWindow() {
    await this.resetFields()
    this.activeModal.close();
  }

  /**
   * Method for resetting the values of the form fields
   */
  resetFields(){
    this.product = {
      description: "",
      reference: "",
      price: 0,
      weight: 0,
      category_id: "",
      stock: 0
    }
  }
  
  /**
   * Method for validating form fields
   */
  validateFields(){
    let messages = [];

    if(this.product.description.trim() == ""){
      messages.push("You must enter the description");
    }

    if(this.product.reference.trim() == ""){
      messages.push("You must enter the reference.");
    }

    if(this.product.price == "" || this.product.price == 0){
      messages.push("You must enter a price greater than zero.");
    }

    if(this.product.weight == "" || this.product.weight == 0){
      messages.push("You must enter a weight greater than zero.");
    }

    if(this.product.category_id == ""){
      messages.push("You must select the category.");
    }

    if(this.product.stock == "" || this.product.stock == 0){
      messages.push("You must enter a stock level greater than zero.");
    }
    return messages;
  }
}
