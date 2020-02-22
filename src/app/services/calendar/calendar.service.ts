import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  date: Object;
  _date: BehaviorSubject<Object> = new BehaviorSubject<Object>({});

  constructor() {
    this._date.subscribe((data: Object) => {
      this.date = data;
    })
  }
}
