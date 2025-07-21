import { Component } from '@angular/core';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CustomerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fronted_web_application';
}