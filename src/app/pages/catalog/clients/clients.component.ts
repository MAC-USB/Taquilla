import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Clientmodel } from './clients.model';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ClientService } from './clients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from '@angular/compiler/src/util';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'mac-clients',
  templateUrl: './clients.component.html',
  styles: ['./clients.component.scss'],
  providers: [ClientService]
})
export class ClientsComponent {

  settings = {
    mode: 'external',
    actions: {
      position: 'right'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>'
    },
    columns: {
      cedula: {
        title: 'id',
        type: 'string',
        editable: false
      },
      nombre: {
        title: 'Name',
        type: 'string',
      },
      apellido: {
        title: 'Last name',
        type: 'string',
      },
      telefono: {
        title: 'Phone',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  clientemodel = new Clientmodel();
  activeModal: any;
  config:ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-full-width',
    timeout: 30000,
    tapToDismiss: true,
    showCloseButton: true
  });


  constructor(private service: SmartTableService,
              private clientService: ClientService,
              private modalService: NgbModal,
              private toasterService: ToasterService) {
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

  createClientModal(content): void{
    this.activeModal =  this.modalService.open(content, { size: 'lg'})
  }

  createClient(): void{
    this.clientService.addClient(this.clientemodel).subscribe(client =>{
        if(client){
          if(!client.error){
            this.activeModal.dismiss()
            this.getClients() 
          }else{ 
            this.toasterService.pop('warning', 'Your request has the following errors:\n',
            this.getErrorMessage(client.error))
          }
        }
      }
    )
  }

  getErrorMessage(object): string{
    let error_message = ""
    for ( var key in object){
        if (object.hasOwnProperty(key)){
            error_message += object[key] + "\n"
        }
    }
    return error_message
  }
}
