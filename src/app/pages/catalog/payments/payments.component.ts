import { Component, OnInit } from '@angular/core';

// ng2-smart-table
import { LocalDataSource } from 'ng2-smart-table';

// Angular Modal Component
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// PROVIDERS
import { CatalogService } from '../catalog.service';

// MODELS
import { Assistant } from '../../../models/assistant.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'mac-payments',
  styleUrls: ['./payments.component.scss'],
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private catalogService: CatalogService,
  ) {
    // console.log(this.payments);
    // this.sourcePayments.load(this.payments);
  }

  assistants: Array<Assistant> = [];
  clients: Array<Client> = [];

  ngOnInit(){
    this.getAssistants();
    this.getClients();
  }

  getAssistants(){
    this.catalogService.getAssistants().subscribe(data => {
      console.log("Preparadores: ", data);
      this.assistants = data;
    });
  }

  getClients(){
    this.catalogService.getClients().subscribe(data => {
      console.log("Clientes: ", data);
      this.clients = data;
    });
  }

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
    // hideSubHeader: true,
    actions: {
      edit: false,
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      date: {
        title: 'Fecha',
        type: 'string',
      },
      assistant: {
        title: 'Preparador',
        type: 'string',
        valuePrepareFunction: (assistant: any) => { return assistant.initials },
      },
      client: {
        title: 'Cliente',
        type: 'string',
        valuePrepareFunction: (client: any) => { return client.name },
      },
      total: {
        title: 'Total Bs.',
        type: 'number',
        valuePrepareFunction: (total: number) => { return total.toLocaleString('es', { minimumFractionDigits: 2 }); },
      },
      method: {
        title: 'Método de Pago',
        type: 'string',
        valuePrepareFunction: (method: any) => { return method.description },
      },
      status: {
        title: 'Estado',
        type: 'string',
        valuePrepareFunction: (status: any) => { return status.description },
      }
    },
  };

  sourcePayments: LocalDataSource = new LocalDataSource();

  

  onCreate(event, content){
    this.modalService.open(content, { size: 'lg' });
  }

  onEdit(event){
    console.log(event);
  }
}
