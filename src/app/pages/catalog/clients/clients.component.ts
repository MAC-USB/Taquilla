import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Clientmodel } from './clients.model';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ClientService } from './clients.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
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
  clientemodel: Clientmodel = new Clientmodel();
  activeModal: any;
  config:ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-full-width',
    timeout: 30000,
    tapToDismiss: true,
    showCloseButton: true
  });
  edit: boolean = false;


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

  onDeleteConfirm(client: Clientmodel): void {
    this.clientService.deleteClient(client).subscribe(client =>{
      if (client){
        this.activeModal.dismiss()
        this.getClients()
      }else{
        this.showErrorMessage(client.error)
      }
    })
  }

  editClient():void {
    this.clientService.updateClient(this.clientemodel).subscribe(client =>{
        if (!client.error){
          this.activeModal.dismiss()
          this.getClients() 
        }else{
          this.showErrorMessage(client.error)
        }
      }
    )
  }

  createClientModal(content): void{
    this.activeModal =  this.modalService.open(content, { size: 'lg'})
  }

  editClientModal(content, event): void{
    this.edit = true
    this.clientemodel = event.data
    const modal_options : NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.clientemodel = new Clientmodel();
        this.edit = false
        return true
      }
    }
    this.activeModal = this.modalService.open(content, modal_options)
  }

  deleteClientModal(content, event): void{
    this.clientemodel = event.data
    const modal_options : NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.clientemodel = new Clientmodel();
        return true
      }
    }
    this.activeModal = this.modalService.open(content, modal_options)
  }

  createClient(): void{
    this.clientService.addClient(this.clientemodel).subscribe(client =>{
        if(client){
          if(!client.error){
            this.activeModal.dismiss()
            this.getClients() 
          }else{ 
            this.showErrorMessage(client.error)
          }
        }
      }
    )
  }

  showErrorMessage(object): void{
    let error_message = ""
    for ( var key in object){
        if (object.hasOwnProperty(key)){
            error_message += object[key] + "\n"
        }
    }
    this.toasterService.pop('warning', 'Your request has the following errors:\n',
    error_message)
  }
}
