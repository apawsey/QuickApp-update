// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../models/customer'

const serviceUrl: string = 'http://localhost:20324/api/customer';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [fadeInOut]
})
export class CustomersComponent implements OnInit {

  source: LocalDataSource;

  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      id: {
        title: 'Id',
        filter: false,
        editable: false,
        addable: false
      },
      name: {
        title: 'Name'
      },
      email: {
        title: 'Email'
      },
      phoneNumber: {
        title: "Phone Number"
      },
      address: {
        title: 'Address'
      },
      city: {
        title: 'City'
      },
      gender: {
        title: 'Gender'
      }
    }
  };

  constructor(private customerService: CustomerService) {
    this.source = new LocalDataSource();
    this.loadCustomers();
  }

  ngOnInit(): void {

  }

  loadCustomers(): void {
    this.customerService.getAll(serviceUrl)
      .subscribe(customers => {
        this.source.load(customers);
      });
  }

  addCustomer(event) {
    const data: ICustomer = {
      "name": event.newData.name,
      "email": event.newData.email,
      "phoneNumber": event.newData.phoneNumber,
      "address": event.newData.address,
      "city": event.newData.city,
      "gender": event.newData.gender
    };
    this.customerService.add(serviceUrl, data).subscribe(
      data => {
        // Success
        if (data.message) {
          event.confirm.resolve();
          this.loadCustomers();
        } else {
          event.confirm.reject();
        }
      },
      error => {
        alert(error);
        event.confirm.reject();
      }
    );
  }

  updateCustomer(event) {
    const data: ICustomer = {
      "name": event.newData.name,
      "email": event.newData.email,
      "phoneNumber": event.newData.phoneNumber,
      "address": event.newData.address,
      "city": event.newData.city,
      "gender": event.newData.gender,
      "id": event.newData.id
    };
    this.customerService.update(serviceUrl, event.newData.id, data).subscribe(
      data => {
        // Success
        if (data.message) {
          event.confirm.resolve();
          this.loadCustomers();
        } else {
          event.confirm.reject();
        }
      },
      error => {
        alert(error);
        event.confirm.reject();
      }
    );
  }

  deleteCustomer(event) {
    console.log(event.data);
    this.customerService.delete(serviceUrl, event.data.id).subscribe(
      data => {
        // Success
        if (data.message) {
          event.confirm.resolve();
          this.loadCustomers();
        } else {
          event.confirm.reject();
        }
      },
      error => {
        alert(error);
        event.confirm.reject();
      }
    );
  }
}
