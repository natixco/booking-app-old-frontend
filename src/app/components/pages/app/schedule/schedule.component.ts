import { Component, OnInit } from '@angular/core';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass']
})
export class ScheduleComponent implements OnInit {

  dayNames: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  days: Object;
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  namesOfEachMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(
    private _TitleService: TitleService,
  ) {
    this._TitleService.setTitle('SIDEBAR.schedule');

    this.days = {
      "start": "8:00",
      "finish": "18:00",
      "dates": [
        {
          "date": "1",
          "bookingCount": "8"
        },
        {
          "date": "2",
          "bookingCount": "2"
        },
        {
          "date": "3",
          "bookingCount": "0"
        },
        {
          "date": "4"
        },
        {
          "date": "5"
        },
        {
          "date": "6"
        },
        {
          "date": "7",
          "bookingCount": "1"
        },
        {
          "date": "8"
        },
        {
          "date": "9"
        },
        {
          "date": "10"
        },
        {
          "date": "11"
        },
        {
          "date": "12",
          "bookingCount": "3",
          "bookings": [
            {
              "off": false,
              "len": "1"
            },
            {
              "off": true,
              "len": "1"
            },
            {
              "off": true,
              "len": "0"
            },
            {
              "off": false,
              "len": "2"
            }
          ]
        },
        {
          "date": "13"
        },
        {
          "date": "14"
        },
        {
          "date": "15"
        },
        {
          "date": "16"
        },
        {
          "date": "17"
        },
        {
          "date": "18"
        },
        {
          "date": "19"
        },
        {
          "date": "20"
        },
        {
          "date": "21"
        },
        {
          "date": "22"
        },
        {
          "date": "23"
        },
        {
          "date": "24"
        },
        {
          "date": "25"
        },
        {
          "date": "26"
        },
        {
          "date": "27"
        },
        {
          "date": "28"
        },
        {
          "date": "29"
        },
        {
          "date": "30"
        }
      ]
    }

  }

  ngOnInit() {
    console.log(this.days)
    this.updateDays();
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.updateDays();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.updateDays();
  }

  updateDays() {
    let date = `${this.currentYear}/${this.currentMonth+1}/1`;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(date);
    let dayName = days[d.getDay()];

    let shiftCount;
    days.forEach((item, index) => {
      if(item === dayName) shiftCount = index;
    })

    for(let i=0;i<shiftCount;i++) this.days['dates'].unshift({});
  }

}
