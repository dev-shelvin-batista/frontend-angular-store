import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
  standalone: false
})
export class ConfirmationComponent {

  constructor(private router: Router) {}

  /**
   * Method for returning to the main page when clicking the button.
   */
  back = () => {
    this.router.navigateByUrl("/sales/home")
  }

}
