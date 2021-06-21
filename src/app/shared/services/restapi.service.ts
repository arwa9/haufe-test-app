import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '@models/character';
import { ResponseInfo } from '@models/response-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private apiUrl: string = 'https://rickandmortyapi.com/api/character/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCharacterList(filters: string): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(this.apiUrl + filters, this.httpOptions);
  }

  getSingleCharacter(id: number): Observable<Character> {
    return this.httpClient.get<Character>(this.apiUrl + id, this.httpOptions);
  }
}

interface ResponseData {
  info: ResponseInfo,
  results: Character[]
};
