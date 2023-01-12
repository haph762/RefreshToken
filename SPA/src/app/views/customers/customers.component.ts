import { CustomersService } from './../../_core/_services/customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: string[] = [];
  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.getAllCustomer();
  }
  getAllCustomer() {
    this.customersService.getAllCustomer().subscribe({
      next: res => {
        this.customers = res;
      },
      error(_) { }
    })
  }

}
