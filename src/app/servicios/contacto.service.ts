import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiServerUrl=environment.apiBaseUrl;
  
    constructor(private http:HttpClient ) { }
  
    public getCont():Observable<Contacto[]>{
      return this.http.get<Contacto[]>(`${this.apiServerUrl}/api/contacto/all`);

    }

    public addCont(contacto: Contacto): Observable<Contacto>{
        return this.http.post<Contacto>(`${this.apiServerUrl}/api/contacto/add`, contacto);
    }

    public updateCont(contacto: Contacto): Observable<Contacto>{
        return this.http.put<Contacto>(`${this.apiServerUrl}/api/contacto/update`, contacto);
    }
    public deleteCont(idContac: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/api/contacto/delete/${idContac}`);
    }     
}
