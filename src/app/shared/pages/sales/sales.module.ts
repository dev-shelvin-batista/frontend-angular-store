import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CurrentSaleComponent } from './current-sale/current-sale.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConfirmationComponent, CurrentSaleComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    HttpClientModule, 
    SalesRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesModule { }
