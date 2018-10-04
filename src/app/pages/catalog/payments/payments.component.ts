import { Component } from '@angular/core';

// ng2-smart-table
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'mac-payments',
  styleUrls: ['./payments.component.scss'],
  templateUrl: './payments.component.html',
})
export class PaymentsComponent {

  //Variables declaration
  payments: any = [
    { 
      id: 1,
      date: '04/10/2018', 
      assistant: {
        id: 1,
        initials: 'MF'
      },   
      client: {
        id: 1,
        name: 'Manuel Faria',
      },
      total: 1000,
      method: {
        id: 1,
        description: 'Efectivo',
        bank: {
          id: 1,
          name: 'Mercantil',
        },
        reference: 1234,
      },
      status: {
        id: 1,
        description: 'Pending'
      }
    },
    { 
      id: 1,
      date: '05/10/2018', 
      assistant: {
        id: 2,
        initials: 'JT'
      },   
      client: {
        id: 2,
        name: 'Jose Basanta',
      },
      total: 500,
      method: {
        id: 1,
        description: 'Transferencia',
        bank: {
          id: 1,
          name: 'Mercantil',
        },
        reference: 1234,
      },
      status: {
        id: 1,
        description: 'Pending'
      }
    }
  ];

  // Smart-Table Configurations
  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      add: false,
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
      },
      assistant: {
        title: 'Assistant',
        type: 'string',
        valuePrepareFunction: (assistant: any) => { return assistant.initials },
      },
      client: {
        title: 'Client',
        type: 'string',
        valuePrepareFunction: (client: any) => { return client.name },
      },
      total: {
        title: 'Total Bs.',
        type: 'number',
        valuePrepareFunction: (total: number) => { return total.toLocaleString('es', { minimumFractionDigits: 2 }); },
      },
      method: {
        title: 'Payment Method',
        type: 'string',
        valuePrepareFunction: (method: any) => { return method.description },
      },
      status: {
        title: 'Status',
        type: 'string',
        valuePrepareFunction: (status: any) => { return status.description },
      }
    },
  };

  sourcePayments: LocalDataSource = new LocalDataSource();

  constructor() {
    console.log(this.payments);
    this.sourcePayments.load(this.payments);
  }

  onEdit(event){
    console.log(event);
  }
}
