import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [AlertsComponent, HeaderComponent, LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertsComponent, HeaderComponent, LoadingComponent]
})
export class ComponentsModule { }
