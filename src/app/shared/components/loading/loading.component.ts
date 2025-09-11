import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  standalone: false
})
export class LoadingComponent {
  @Input() title:string = '';
}
