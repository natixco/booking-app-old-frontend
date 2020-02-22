import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from '@services/table/table.service';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-table-create',
  templateUrl: './table-create.component.html',
  styleUrls: ['./table-create.component.sass']
})
export class TableCreateComponent implements OnInit {

  calendarForm: FormGroup;
  days: string[] = [];
  formIsInvalid: boolean = true;
  isLoading: boolean;

  constructor(
    private _TableService: TableService,
    private _TitleService: TitleService,
    private _Router: Router
  ) {
    this.calendarForm = new FormGroup({
      name: new FormControl('', Validators.required),
      minimumTimeBeforeService: new FormControl('', Validators.required),
      hourSplitting: new FormControl('', Validators.required),
      resetIntervalEachHour: new FormControl('', Validators.required),
      days: new FormArray([
        new FormGroup({
          day: new FormControl('Monday',Validators.required),
          start: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        }),
        new FormGroup({
          day: new FormControl('Tuesday',Validators.required),
          start: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        }),
        new FormGroup({
          day: new FormControl('Wednesday',Validators.required),
          start: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        }),
        new FormGroup({
          day: new FormControl('Thursday',Validators.required),
          start: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        }),
        new FormGroup({
          day: new FormControl('Friday',Validators.required),
          start: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        }),
        new FormGroup({
          day: new FormControl('Saturday',Validators.required),
          start: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        }),
        new FormGroup({
          day: new FormControl('Sunday',Validators.required),
          start: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        }),
      ])
    })

    this._TitleService.setTitle('TITLE.table_create');
  }

  get form() {
    return this.calendarForm.controls;
  }

  ngOnInit() {
    console.log(this.calendarForm.value)
    for(let item of this.form.days['controls']) {
      item.disable();
    }
  }

  isFormInvalid() {
    if(this.form.days.invalid && this.form.name.invalid) {
      this.formIsInvalid = true;
    } else if (this.form.days.invalid === false && this.form.name.invalid === true) {
      this.formIsInvalid = true;
    } else if (this.form.days.invalid === true && this.form.name.invalid === false) {
      this.formIsInvalid = true;
    } else if (this.days.length === 0 && this.form.name.invalid === false) {
      this.formIsInvalid = true;
    } else {
      this.formIsInvalid = false;
    }
  }

  changeDay(day, elem) {
    let index = this.days.indexOf(day);

    if (index === -1) {
      this.days.push(day);
      elem.classList.add('active');

      for(let item of this.form.days['controls']) {
        if(item.value['day'] === day) {
          item.enable();
        }
      }
    } else {
      this.days.splice(index, 1);
      elem.classList.remove('active');
      
      for(let item of this.form.days['controls']) {
        if(item.value['day'] === day) {
          item.disable();
          item.controls['start'].setValue('');
          item.controls['end'].setValue('');
        }
      }
    }

    const sorter = {
      "Monday": 0,
      "Tuesday": 1,
      "Wednesday": 2,
      "Thursday": 3,
      "Friday": 4,
      "Saturday": 5,
      "Sunday": 6
    }

    this.days.sort( (a,b) => {
      return sorter[a] - sorter[b];
    })

    this.isFormInvalid();
    console.log(this.calendarForm.value)
  }

  changeStartTime(day, value) {
    for(let item of this.form.days['controls']) {
      if(item.value['day'] === day) {
        item.controls['start'].setValue(value);
      }
    }
    this.isFormInvalid();
  }

  changeEndTime(day, value) {
    for(let item of this.form.days['controls']) {
      if(item.value['day'] === day) {
        item.controls['end'].setValue(value);
      }
    }
    this.isFormInvalid();
  }

  saveForm() {
    this.isLoading = true;
    // this.calendarForm.value.minimumTimeBeforeService = 0;
    // this.calendarForm.value.hourSplitting = 30;
    // this.calendarForm.value.resetIntervalEachHour = false;

    console.log(this.calendarForm.value)

    this._TableService.createTable(this.calendarForm.value).subscribe(
      res => {
        console.log(res);
        if(res['status'] === 'failed') {
          this.isLoading = false;
        } else {
          this._Router.navigate(['/app/tables']);
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }
}
