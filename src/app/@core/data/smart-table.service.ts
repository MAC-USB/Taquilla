import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {

  data = [{
    cedula: "25872062",
    nombre: "Manuel",
    apellido: "Rodriguez",
    telefono: "04141633960"
  }];

  getData() {
    return this.data;
  }
}
