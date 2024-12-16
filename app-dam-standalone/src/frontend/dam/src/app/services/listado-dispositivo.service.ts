import { Injectable } from '@angular/core';
import { Dispositivo } from '../interfaces/dispositivo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListadoDispositivoService {
  private apiUrl = 'http://localhost:8000/dispositivo/';

  constructor(private http: HttpClient) {}

  getAllSensors(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(this.apiUrl);
  }
}
