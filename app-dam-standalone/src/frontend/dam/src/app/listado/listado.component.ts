import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoDispositivoService } from '../services/listado-dispositivo.service';
import { Dispositivo } from '../interfaces/dispositivo';
import { DispositivoComponent } from '../dispositivo/dispositivo.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: 'listado.component.html',
  styleUrls: ['listado.component.scss'],
  imports: [CommonModule, DispositivoComponent],
  standalone: true,
})
export class ListadoComponent {
  constructor(private listadoDispositivoService: ListadoDispositivoService) {}

  public listado: Observable<Dispositivo[]> =
    this.listadoDispositivoService.getAllSensors();

  setListado(listado: Observable<Dispositivo[]>) {
    this.listado = listado;
  }

  getNombreSensor() {
    return this.listado;
  }
}
