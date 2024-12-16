import { Component, OnInit, Input } from '@angular/core';
import { MedicionService } from '../services/medicion.service';
import { SensorService } from '../services/detalles-sensor.service';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styleUrls: ['./dispositivo.component.scss'],
  standalone: true,
})
export class DispositivoComponent implements OnInit {
  constructor(
    private medicionService: MedicionService,
    private sensorService: SensorService
  ) {}

  @Input() dispositivo: any;

  elegirSensor() {
    this.medicionService
      .getLastMedicionById(this.dispositivo.dispositivoId)
      .subscribe(
        (data: any) => {
          this.sensorService.setValoresSensor({
            nombreSensor: this.dispositivo.nombre,
            valorObtenido: Number(data.valor),
            idSensor: this.dispositivo.dispositivoId,
            apertura: data.apertura,
          });
        },
        (error: any) => {
          console.error('Error al obtener última medición:', error);
        }
      );
  }

  ngOnInit() {}
}
