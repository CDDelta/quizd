import { Component, OnInit } from '@angular/core';
import { MonetizationService } from 'ngx-monetization';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private monetization: MonetizationService) {}

  ngOnInit() {
    this.monetization.setPaymentPointer(environment.defaultPaymentPointer);
  }
}
