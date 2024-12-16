import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SensorService } from '../services/detalles-sensor.service';

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
})
export class SensorComponent implements OnInit {
  constructor(public sensorService: SensorService) {}

  ngOnInit() {
    this.sensorService.generarChart(this.sensorService.valoresSensor);
  }
}
