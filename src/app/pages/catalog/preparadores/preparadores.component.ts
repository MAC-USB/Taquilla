import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Preparadormodel } from './preparadores.model';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { error } from '@angular/compiler/src/util';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { BaseService } from '../../../app.base.service'

/**
 * Component for crud of preparadores
 *
 * @export
 * @class PreparadoresComponent
 */
@Component({
  selector: 'mac-preparadores',
  templateUrl: './preparadores.component.html',
  styles: ['./preparadores.component.scss'],
  providers: [BaseService]
})

export class PreparadoresComponent {

  // smart-table settings
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      position: 'right'
    },
    add: {
      title:'Agregar',
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
      iniciales: {
        title: 'Iniciales',
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
      correo: {
        title: 'Correo',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  preparadormodel: Preparadormodel = new Preparadormodel();
  activeModal: any;
  apiurl = "preparador/"
  config:ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-full-width',
    timeout: 30000,
    tapToDismiss: true,
    showCloseButton: true
  });
  edit: boolean = false;


  /**
   *Creates an instance of PreparadoresComponent.
   * @param {SmartTableService} service
   * @param {BaseService} preparadoresService
   * @param {NgbModal} modalService
   * @param {ToasterService} toasterService
   * @memberof PreparadoresComponent
   */
  constructor(private service: SmartTableService,
              private preparadoresService: BaseService,
              private modalService: NgbModal,
              private toasterService: ToasterService) {
    this.getPreparadores()
  }

  /**
   * Get preparadores and show their info on smart-table
   *
   * @memberof PreparadoresComponent
   */
  getPreparadores(): void{
    this.preparadoresService.getBase(this.apiurl).subscribe(preparadores =>
      this.source.load(preparadores))
  }

  /**
   * Confirm method for delete preparador
   *
   * @param {preparadormodel} preparador to be deleted
   * @memberof PreparadoresComponent
   */
  onDeleteConfirm(preparador: Preparadormodel): void {
    let apiurl = `${this.apiurl}${preparador.cedula}/`
    this.preparadoresService.deleteBase(preparador, apiurl).subscribe(preparador =>{
      if (preparador == null){
        this.activeModal.dismiss()
        this.getPreparadores()
      }else{
        this.showErrorMessage(preparador.error)
      }
    })
  }

  /**
   * Method that makes the update for a preparador info
   *
   * @memberof PreparadoresComponent
   */
  editPreparador():void {
    let apiurl = `${this.apiurl}${this.preparadormodel.cedula}/`
    this.preparadoresService.updateBase(this.preparadormodel, apiurl).subscribe(preparador =>{
        if (!preparador.error){
          console.log(preparador)
          this.activeModal.dismiss()
          this.getPreparadores() 
        }else{
          this.showErrorMessage(preparador.error)
        }
      }
    )
  }

  /**
   * Activate create preparador modal
   *
   * @param {*} content Template to be render
   * @memberof PreparadoresComponent
   */
  createPreparadorModal(content): void{
    this.activeModal =  this.modalService.open(content, { size: 'lg'})
  }

  /**
   * Activate edit preparador modal
   *
   * @param {*} content Template to be render
   * @param {*} event with preparador info
   * @memberof PreparadoresComponent
   */
  editPreparadorModal(content, event): void{
    this.edit = true
    Object.assign(this.preparadormodel, event.data)
    const modal_options : NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.preparadormodel = new Preparadormodel();
        this.edit = false
        return true
      }
    }
    this.activeModal = this.modalService.open(content, modal_options)
  }

  /**
   * Delete preparador modal
   *
   * @param {*} content to be render
   * @param {*} event with preparador info
   * @memberof PreparadoresComponent
   */
  deletePreparadorModal(content, event): void{
    Object.assign(this.preparadormodel, event.data)
    const modal_options : NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.preparadormodel = new Preparadormodel();
        return true
      }
    }
    this.activeModal = this.modalService.open(content, modal_options)
  }

  /**
   * Add preparador to DB
   *
   * @memberof PreparadoresComponent
   */
  createPreparador(): void{
    this.preparadoresService.addBase(this.preparadormodel, this.apiurl).subscribe(preparador =>{
        if(preparador){
          if(!preparador.error){
            this.activeModal.dismiss()
            this.getPreparadores() 
          }else{ 
            this.showErrorMessage(preparador.error)
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
   * @memberof PreparadoresComponent
   */
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
