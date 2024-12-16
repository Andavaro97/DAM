import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicionService {
  private apiUrl = 'http://localhost:8000/medicion';

  constructor(private http: HttpClient) {}

  getLastMedicionById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  getAllMedicionesById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/todas`;
    return this.http.get(url);
  }
}
