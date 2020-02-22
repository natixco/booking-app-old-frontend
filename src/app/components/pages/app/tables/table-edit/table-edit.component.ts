import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '@services/title/title.service';
import { TableService } from '@services/table/table.service';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.sass']
})
export class TableEditComponent implements OnInit {

  calendarForm: FormGroup;
  days: string[] = [];
  formIsInvalid: boolean = true;
  isLoading: boolean;
  tableId: string;
  tableName: string;
  tableDays: Object;

  constructor(
    private _TableService: TableService,
    private _TitleService: TitleService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.calendarForm = new FormGroup({
      name: new FormControl('', Validators.required),
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
    this.tableId = this._ActivatedRoute.snapshot.params['id'];
    this.getServices();
  }

  getServices() {
    this._TableService.getAllService_private(this.tableId).subscribe(
      res => {
        console.log(res);
        this.tableName = res['name'];
        this.tableDays = res['days'];

        this.calendarForm.controls.name.setValue(this.tableName);

        let btns = document.querySelector('.day-selector').querySelectorAll('li');
        console.log(btns);

        Object.values(this.tableDays).forEach(item => {
          for(let item2 of this.form.days['controls']) {
            if(item2.value.day === item.day) {
              item2.enable();
            }
          }

          for(let i=0;i<7;i++) {
            if(btns[i].innerHTML === item.day)  {
              btns[i].classList.add('active');
              this.days.push(item.day);
            }
          }
        })
        
        Object.values(this.tableDays).forEach(item => {
          this.changeStartTime(item.day, item.start);
          this.changeEndTime(item.day, item.end);
        })



        console.log(this.calendarForm.value)
      },
      err => {
        console.log(err);
      }
    )
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
    console.log(this.calendarForm.value)
    this.calendarForm.value.tableID = this.tableId;
    this._TableService.editTable(this.calendarForm.value).subscribe(
      res => {
        console.log(res);
        if(res['status'] === 'failed') {
          this.isLoading = false;
        } else {
          // this._Router.navigate(['/app/tables']);
          console.log('👌')
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

}
