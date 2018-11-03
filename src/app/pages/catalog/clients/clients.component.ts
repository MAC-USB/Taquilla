import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Clientmodel } from './clients.model';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ClientService } from './clients.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { error } from '@angular/compiler/src/util';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

/**
 * Component for crud of clients
 *
 * @export
 * @class ClientsComponent
 */
@Component({
  selector: 'mac-clients',
  templateUrl: './clients.component.html',
  styles: ['./clients.component.scss'],
  providers: [ClientService]
})

export class ClientsComponent {

  // smart-table settings
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
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
  clientemodel: Clientmodel = new Clientmodel();
  activeModal: any;
  config:ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-full-width',
    timeout: 30000,
    tapToDismiss: true,
    showCloseButton: true
  });
  edit: boolean = false;


  /**
   *Creates an instance of ClientsComponent.
   * @param {SmartTableService} service
   * @param {ClientService} clientService
   * @param {NgbModal} modalService
   * @param {ToasterService} toasterService
   * @memberof ClientsComponent
   */
  constructor(private service: SmartTableService,
              private clientService: ClientService,
              private modalService: NgbModal,
              private toasterService: ToasterService) {
    this.getClients()
  }

  /**
   * Get clients and show their info on smart-table
   *
   * @memberof ClientsComponent
   */
  getClients(): void{
    this.clientService.getClients().subscribe(clients =>
      this.source.load(clients))
  }

  /**
   * Confirm method for delete client
   *
   * @param {Clientmodel} client to be deleted
   * @memberof ClientsComponent
   */
  onDeleteConfirm(client: Clientmodel): void {
    this.clientService.deleteClient(client).subscribe(client =>{
      if (client == null){
        this.activeModal.dismiss()
        this.getClients()
      }else{
        this.showErrorMessage(client.error)
      }
    })
  }

  /**
   * Method that makes the update for a client info
   *
   * @memberof ClientsComponent
   */
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

  /**
   * Activate create client modal
   *
   * @param {*} content Template to be render
   * @memberof ClientsComponent
   */
  createClientModal(content): void{
    this.activeModal =  this.modalService.open(content, { size: 'lg'})
  }

  /**
   * Activate edit client modal
   *
   * @param {*} content Template to be render
   * @param {*} event with client info
   * @memberof ClientsComponent
   */
  editClientModal(content, event): void{
    this.edit = true
    Object.assign(this.clientemodel, event.data)
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

  /**
   * Delete client modal
   *
   * @param {*} content to be render
   * @param {*} event with client info
   * @memberof ClientsComponent
   */
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

  /**
   * Add client to DB
   *
   * @memberof ClientsComponent
   */
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

  /**
   * Method to show notifications
   * when some error occurs
   *
   * @param {*} object with error info
   * @memberof ClientsComponent
   */
  showErrorMessage(object): void{
    let error_message = ""
    for ( var key in object){
        if (object.hasOwnProperty(key)){
            error_message += object[key] + "\n"
        }
    }
    this.toasterService.pop('warning', 'Tu solicitud presentó los siguientes errores:\n',
    error_message)
  }
}
