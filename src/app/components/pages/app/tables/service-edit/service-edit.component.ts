import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '@services/table/table.service';
import { AuthService } from '@services/auth/auth.service';
import { TitleService } from '@services/title/title.service';

export interface ServiceInterface {
  ID: string,
  closeBooking: number,
  description: string,
  duration: number,
  maxBooking: number,
  onlinePayment: boolean,
  onsitePayment: boolean,
  price: number,
  title: string
}

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.sass']
})
export class ServiceEditComponent implements OnInit {

  tableID: string;
  serviceID: string;
  serviceForm: FormGroup;
  tableName: string;
  currentService: ServiceInterface;
  edited: boolean;
  isLoading: boolean;

  currentServiceCHECK: Object = {
    title: '',
    description: '',
    price: '',
    duration: ''
  };

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TableService: TableService,
    private _AuthService: AuthService,
    private _TitleService: TitleService
  ) {
    this.serviceForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
    })

    this._TitleService.setTitle('TITLE.service_edit');
  }

  get form() {
    return this.serviceForm.controls;
  }

  ngOnInit() {
    this.tableID = this._ActivatedRoute.snapshot.params['id'];
    this.serviceID = this._ActivatedRoute.snapshot.params['id2'];

    this.getServices();
  }

  getServices() {
    this._TableService.getAllService_private(this.tableID).subscribe(
      res => {
        this.tableName = res['name'];
        
        Object.values(res['services']).forEach((item: ServiceInterface) => {
          if(item["ID"] === this.serviceID) {
            this.currentService = item;
            
            this.currentServiceCHECK['title'] = item['title'];
            this.currentServiceCHECK['description'] = item['description'];
            this.currentServiceCHECK['price'] = item['price'].toString();
            this.currentServiceCHECK['duration'] = item['duration'].toString();
            this.currentServiceCHECK['title_edited'] = false;
            this.currentServiceCHECK['description_edited'] = false;
            this.currentServiceCHECK['price_edited'] = false;
            this.currentServiceCHECK['duration_edited'] = false;
          }
        })


        this.serviceForm.controls.title.setValue(this.currentService['title']);
        this.serviceForm.controls.description.setValue(this.currentService['description']);
        this.serviceForm.controls.price.setValue(this.currentService['price']);
        this.serviceForm.controls.duration.setValue(this.currentService['duration']);
      },
      err => {
        console.log(err);
      }
    )
  }

  checkEdited(item: string) {
    if(this.form[item].value !== this.currentServiceCHECK[item]) {
      this.currentServiceCHECK[`${item}_edited`] = true;
    } else {
      this.currentServiceCHECK[`${item}_edited`] = false;
    }
    console.log(this.currentServiceCHECK)
    let count = 0;
    Object.keys(this.currentServiceCHECK).forEach(item2 => {
      if(this.currentServiceCHECK[`${item2}_edited`] === true) {
        count++;
      }
    })

    count >= 1 ? this.edited = true : this.edited = false;
  }

  saveForm() {    
    let newData: Object = this.serviceForm.value;

    Object.keys(this.currentServiceCHECK).forEach(item => {
      if(this.currentServiceCHECK[`${item}_edited`] === false) {
        delete newData[item];
      }
    })

    newData['tableID'] = this.tableID;
    newData['serviceID'] = this.serviceID;
    newData['price'] = parseFloat(newData['price']);
    newData['duration'] = parseInt(newData['duration']);

    this._TableService.editService(newData).subscribe(
      res => {
        console.log(res);
        if(res['status'] === 'failed') {

        } else {
          this.getServices();
        }
      },
      err => {
        console.log(err)
      }
    )
  }

}
