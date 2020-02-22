import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CalendarService } from '@services/calendar/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '@services/table/table.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent implements OnInit {

  currentBox: number = 0;
  barWidth: number = 0;
  activeTime: number = 0;
  bookingForm: FormGroup;
  tableId: string;

  services: Object;
  selectedService: Object;

  times: Object;
  selectedDate: Object;

  constructor(
    private _CalendarService: CalendarService,
    private _ActivatedRoute: ActivatedRoute,
    private _TableService: TableService,
    private _AuthService: AuthService
  ) {
    this.bookingForm = new FormGroup({
      tableID: new FormControl(''),
      serviceID: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required)
    })

    this._CalendarService._date.subscribe((data: Object) => {
      this.form.date.setValue({});
      this.selectedDate = data;

      if(Object.keys(data).length > 0) {
        this._TableService.getTimes(this.tableId, data).subscribe(
          res => {
            let breaks = res[Object.keys(res).length-1];
            delete res[Object.values(res).length-1];

            this.times = res;
            this.activeTime = 0;
            this.setTime(this.times[0], 0);
          },
          err =>{
            console.log(err)
            if(err['error']['code'] === 'service_closed') {
              this.times = [];
              this.form.time.setValue('');
            }
          }
        )
      }

    })
  }

  ngOnInit() {
    this._AuthService.renewCSRF();
    this.tableId = this._ActivatedRoute.snapshot.params['id'];
    this.getServices(this.tableId);
  }

  objectkeys(asd) {
    return Object.keys(asd);
  }

  get form() {
    return this.bookingForm.controls;
  }

  loadService(serviceID: string) {
    this._TableService.getServiceDetails(this.tableId, serviceID).subscribe(
      res => {
        console.log(res)
        this.selectedService = res;
      },
      err => {
        console.log(err);
      }
    )

    this.form.serviceID.setValue(serviceID);
  }

  getServices(tableID: string) {
    this._TableService.getAllService_public(tableID).subscribe(
      res => {
        console.log(res)
        this.services = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  prevPage() {
    this.currentBox--;
    this.barWidth-=25;
  }

  nextPage() {
    this.currentBox++;
    this.barWidth+=25;
  }

  setTime(time: string, index: number) {
    this.form.time.setValue(time);
    this.activeTime = index;
  }

  setBooking() {
    this.barWidth+=25;
    this.form.tableID.setValue(this.tableId);
    let time = this.form.time.value;
    time = time.split(':');
    this.selectedDate['hours'] = parseInt(time[0]);
    this.selectedDate['minutes'] = parseInt(time[1]);
    this.selectedDate['day'] = parseInt(this.selectedDate['day']);
    this.form.date.setValue(this.selectedDate);

    let data: Object = this.bookingForm.value;
    let phoneNumber: string = data['phone'];
    
    delete data['phone'];
    delete data['time'];
    
    data['phone'] = {
      'number': phoneNumber,
      'country': 'HU'
    };

    data['captcha'] = '';

    console.log(data);
    return;
    this._TableService.booking(data).subscribe(
      res => {
        console.log(res);
        if(res['status'] === 'failed') {

        } else {
          console.log('👌 Successful booking');
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
