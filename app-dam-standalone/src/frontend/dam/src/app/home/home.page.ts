import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ListadoComponent } from '../listado/listado.component';
import { SensorComponent } from '../sensor/sensor.component';
import { PopUpComponent } from '../popUp/popUp.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SensorComponent,
    ListadoComponent,
    PopUpComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
  providers: [SensorComponent],
})
export class HomePage {
  constructor() {}
}
