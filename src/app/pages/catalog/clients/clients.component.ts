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
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      cedula: {
        title: 'Cédula',
        type: 'string',
        editable: false
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
      this.clientService.deleteClient(event.data as Clientmodel).subscribe(client =>{
        this.getClients()
      })
    } else {
      event.confirm.reject();
    }
  }

  editClient(event):void {
    this.clientService.updateClient(event.newData as Clientmodel).subscribe(client =>{
        if (client){
          event.confirm.resolve(event.newData)
        }
      }
    )
  }

  createClient(event): void{
    this.clientService.addClient(event.newData as Clientmodel).subscribe(client =>{
        if (client) {
          event.confirm.resolve(event.newData)
        }
      }
    )
  }
}
