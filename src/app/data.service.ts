import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Image } from './model/image.model';

@Injectable()
export class DataService {

  constructor(private httpService: HttpClient) { }

  fetchImages(): Observable<Image[]> {
    return this.httpService.get('http://localhost:3000/api/images');
  }

  remove(name) {
    return this.httpService.delete(`http://localhost:3000/api/images/${name}`);
  }

}
