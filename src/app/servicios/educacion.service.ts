import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion';
 
 
@Injectable({
    providedIn: 'root'
})

export class EducacionService {
    private apiServerUrl=environment.apiBaseUrl;
  
    constructor(private http:HttpClient ) { }
  
    public getEdu():Observable<Educacion[]>{
      return this.http.get<Educacion[]>(`${this.apiServerUrl}/api/educacion/all`);

    }

    public addEdu(educacion: Educacion): Observable<Educacion>{
        return this.http.post<Educacion>(`${this.apiServerUrl}/api/educacion/add`, educacion);
    }

    public updateEdu(educacion: Educacion): Observable<Educacion>{
        return this.http.put<Educacion>(`${this.apiServerUrl}/api/educacion/update`, educacion);
    }
    public deleteEdu(idEdu: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/api/educacion/delete/${idEdu}`);
    }
  
     
}
  
