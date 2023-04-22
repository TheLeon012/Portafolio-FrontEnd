import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidades } from '../models/habilidades';
 
 
@Injectable({
    providedIn: 'root'
})

export class HabilidadesService {
    private apiServerUrl=environment.apiBaseUrl;
  
    constructor(private http:HttpClient ) { }
  
    public getSkill():Observable<Habilidades[]>{
      return this.http.get<Habilidades[]>(`${this.apiServerUrl}/api/skill/all`);

    }

    public addSkill(habilidades: Habilidades): Observable<Habilidades>{
        return this.http.post<Habilidades>(`${this.apiServerUrl}/api/skill/add`, habilidades);
    }

    public updateSkill(habilidades: Habilidades): Observable<Habilidades>{
        return this.http.put<Habilidades>(`${this.apiServerUrl}/api/skill/update`, habilidades);
    }
    public deleteSkill(idSkill: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/api/skill/delete/${idSkill}`);
    }     
}
  
