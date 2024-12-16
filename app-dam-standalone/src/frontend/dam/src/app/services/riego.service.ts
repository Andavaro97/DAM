import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RiegoService {
  private apiUrl = 'http://localhost:8000/riego';

  constructor(private http: HttpClient) {}

  getAllRiegosById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/todas`;
    return this.http.get(url);
  }

  insertValveAction({ apertura, id }: any): Observable<any> {
    const url = `${this.apiUrl}/agregar`;
    return this.http.post(url, { apertura, id });
  }
}
