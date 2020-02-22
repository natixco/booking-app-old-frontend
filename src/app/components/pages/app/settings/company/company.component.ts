import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {

  companyForm: FormGroup;

  constructor(
    private _TitleService: TitleService,
  ) {
    this.companyForm = new FormGroup({
      company_name: new FormControl('', Validators.required),
      company_address: new FormControl('', Validators.required),
      company_country: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required)
    })

    this._TitleService.setTitle('TITLE.company');
  }

  get form() {
    return this.companyForm.controls;
  }

  ngOnInit() {
  }

}
