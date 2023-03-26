import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencias } from '../models/experiencias';
 
 
@Injectable({
    providedIn: 'root'
})

export class ExperienciasService {
    private apiServerUrl=environment.apiBaseUrl;
  
    constructor(private http:HttpClient ) { }
  
    public getExp():Observable<Experiencias[]>{
      return this.http.get<Experiencias[]>(`${this.apiServerUrl}/experiencia/all`);

    }

    public addExp(experiencias: Experiencias): Observable<Experiencias>{
        return this.http.post<Experiencias>(`${this.apiServerUrl}/experiencia/add`, experiencias);
    }

    public updateExp(experiencias: Experiencias): Observable<Experiencias>{
        return this.http.put<Experiencias>(`${this.apiServerUrl}/experiencia/update`, experiencias);
    }
    public deleteExp(idExp: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/experiencia/delete/${idExp}`);
    }
  
     
}
  
