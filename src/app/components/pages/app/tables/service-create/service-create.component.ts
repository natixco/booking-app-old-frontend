import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { TableService } from '@services/table/table.service';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.sass']
})
export class ServiceCreateComponent implements OnInit {

  serviceForm: FormGroup;
  tableId: string = '';
  isLoading: boolean;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private _TableService: TableService,
    private _TitleService: TitleService,
    private _Router: Router
  ) {
    this.serviceForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required)
    })

    this._TitleService.setTitle('TITLE.service_create');
  }

  get form() {
    return this.serviceForm.controls;
  }

  ngOnInit() {
    this.tableId = this._ActivatedRoute.snapshot.params['id'];
  }

  saveForm() {
    this.serviceForm.value.tableID = this.tableId;
    this.serviceForm.value.maxBooking = 1;
    this.serviceForm.value.onsitePayment = true;
    this.serviceForm.value.onlinePayment = true;
    this.serviceForm.value.price = parseFloat(this.serviceForm.value.price);
    this.serviceForm.value.duration = parseInt(this.serviceForm.value.duration);

    this._TableService.createService(this.serviceForm.value).subscribe(
      res => {
        console.log(res);
        this._Router.navigate([`/app/tables/${this.tableId}`]);
      },
      err => {
        console.log(err);
      }
    )
  }

}
