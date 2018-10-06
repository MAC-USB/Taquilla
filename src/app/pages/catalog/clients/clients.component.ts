import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Clientmodel } from './clients.model';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ClientService } from './clients.service';

@Component({
  selector: 'mac-clients',
  templateUrl: './clients.component.html',
  styles: ['./clients.component.scss'],
  providers: [ClientService]
})
export class ClientsComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      cedula: {
        title: 'Cédula',
        type: 'string',
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      apellido: {
        title: 'Apellido',
        type: 'string',
      },
      telefono: {
        title: 'Teléfono',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,
              private clientService: ClientService) {
    this.getClients()
  }

  getClients(): void{
    this.clientService.getClients().subscribe(clients =>
      this.source.load(clients))
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}