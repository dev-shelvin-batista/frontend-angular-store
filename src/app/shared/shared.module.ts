import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    PagesModule,
    ComponentsModule,
    HttpClientModule, 
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { 
  
}
