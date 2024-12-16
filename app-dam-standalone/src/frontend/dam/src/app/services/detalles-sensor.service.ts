import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PopUpService } from './popup-service';
import { MedicionService } from './medicion.service';
import { ValoresSensor } from '../interfaces/valoresSensor';
import * as Highcharts from 'highcharts';
import { RiegoService } from './riego.service';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  public valoresSensor: ValoresSensor;
  public myChart: any;
  public chartOptions: any;

  private apiUrl = 'http://localhost:8000/dispositivo';

  constructor(
    private http: HttpClient,
    private popUpService: PopUpService,
    private medicionService: MedicionService,
    private riegoService: RiegoService
  ) {
    this.valoresSensor = {
      valorObtenido: 0,
      nombreSensor: 'Elegir Sensor',
      idSensor: 0,
      apertura: 0,
    };
  }

  getSensorById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  getAllMedicionesById(idSensor: number) {
    this.medicionService.getAllMedicionesById(idSensor).subscribe(
      (data: any) => {
        this.popUpService.setPopUpData(data);
      },
      (error: any) => {
        console.error('Error al obtener última medición:', error);
      }
    );
  }

  getAllRiegosById(idSensor: number) {
    this.riegoService.getAllRiegosById(idSensor).subscribe(
      (data: any) => {
        this.popUpService.setPopUpData(data);
      },
      (error: any) => {
        console.error('Error al obtener última medición:', error);
      }
    );
  }

  onAbrirCerrarValvula() {
    this.riegoService
      .insertValveAction({
        apertura: !this.valoresSensor.apertura,
        id: this.valoresSensor.idSensor,
      })
      .subscribe(
        (data: any) => {
          this.setValoresSensor({
            ...this.valoresSensor,
            apertura: Number(data),
          });
        },
        (error: any) => {
          console.error('Error al obtener última medición:', error);
        }
      );
  }

  onVerTodasLasMedicionesClick() {
    this.getAllMedicionesById(this.valoresSensor.idSensor);
    this.popUpService.setIsOpen(true);
  }

  onVerLogRiegosClick() {
    this.getAllRiegosById(this.valoresSensor.idSensor);
    this.popUpService.setIsOpen(true);
  }

  setValoresSensor(valoresSensor: ValoresSensor) {
    this.valoresSensor = valoresSensor;
    this.generarChart(valoresSensor);
  }

  getValoresSensor() {
    return this.valoresSensor;
  }

  generarChart(valoresSensor: ValoresSensor) {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: valoresSensor.nombreSensor,
      },

      credits: { enabled: false },

      pane: {
        startAngle: -150,
        endAngle: 150,
      },
      // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto',
        },
        title: {
          text: 'kPA',
        },
        plotBands: [
          {
            from: 0,
            to: 10,
            color: '#55BF3B', // green
          },
          {
            from: 10,
            to: 30,
            color: '#DDDF0D', // yellow
          },
          {
            from: 30,
            to: 100,
            color: '#DF5353', // red
          },
        ],
      },
      series: [
        {
          name: [valoresSensor.nombreSensor],
          data: [valoresSensor.valorObtenido],
          tooltip: {
            valueSuffix: ' kPA',
          },
        },
      ],
    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }
}
