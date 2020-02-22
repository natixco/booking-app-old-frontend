import { Component, OnInit } from '@angular/core';
import { CalendarService } from '@services/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  headerTitle: string;
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  namesOfEachMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  allDay: any ;
  date: Object;

  activeDay: number;

  constructor(
    private calendarService: CalendarService
  ) {
    this.calendarService._date.subscribe((data: Object) => {
      this.date = data;
    });
  }
  
  ngOnInit() {
    this.allDay = document.querySelectorAll('.calendar-dates-day');
  
    this.update();
  }

  rightClick() {
    if (++this.currentMonth === 12) {
      this.currentMonth = 0;
      ++this.currentYear;
    }

    this.update();
  }

  leftClick() {
    if (--this.currentMonth === -1) {
      this.currentMonth = 11;
      --this.currentYear;
    }

    this.update();
  }

  update() {
    var bufferNum = this.buffer(this.currentYear, this.currentMonth);
    [].forEach.call(this.allDay, (day, index) => {
      if (this.daysInEachMonth[this.currentMonth] > index)
        day.classList.remove('hidden');
      else 
        day.classList.add('hidden');
      this.transform(day, index, bufferNum);
    });

    this.headerTitle = this.namesOfEachMonth[this.currentMonth] + ' ' + this.currentYear;
  };

  buffer(year, month) {
    var firstDayOfMonth = new Date();
    firstDayOfMonth.setFullYear(year);
    firstDayOfMonth.setMonth(month);
    firstDayOfMonth.setDate(1);
    return firstDayOfMonth.getDay();
  };

  
  transform(day, date, bufferNum) {
    day.style.transform = 'translate3d(' + Math.floor((bufferNum + date) % 7) * 50 + 'px,' + Math.floor((bufferNum + date) / 7) * 50 + 'px,0px)';
    day.style.opacity = '0';
    var fadeAway = setTimeout(function () {
      day.style.opacity = '1';
      clearTimeout(fadeAway);
    }, 100);
  }

  getDate(event) {
    // (this.currentMonth + 1) + "/" + event + "/" + this.currentYear
    this.calendarService._date.next({
      "year": this.currentYear,
      "month": this.currentMonth+1,
      "day": event
    });
    this.activeDay = event;
    console.log(event)

    // let dateStr = `${this.currentMonth+1}/${event}/${this.currentYear}`;
    // let date = new Date(dateStr);
    // console.log(date.toLocaleDateString('en-US', { weekday: 'long' }));

  }

}
