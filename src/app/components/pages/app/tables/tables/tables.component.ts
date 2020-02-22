import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as escapeHTML from 'escape-html-in-json';
import { TableService } from '@services/table/table.service';
import { AuthService } from '@services/auth/auth.service';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.sass']
})
export class TablesComponent implements OnInit {

  showDeletePopup: boolean;
  showInputPopup: boolean;
  newTableForm: FormGroup;

  tables: any;

  isLoading: boolean;

  deletingTableId: string;

  constructor(
    private _TableService: TableService,
    private _AuthService: AuthService,
    private _TitleService: TitleService,
    private _Router: Router
  ) {
    this.newTableForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })

    this._TitleService.setTitle('SIDEBAR.tables');
  }

  ngOnInit() {
    this.getTables();
  }

  getTables() {
    this.isLoading = true;
    this._TableService.getAllTable().subscribe(
      res => {
        if (res['status'] === 'failed') {
          this.isLoading = false;
        } else {
          this.tables = res['tables'];
          console.log(res)
          this.tables = JSON.parse(JSON.stringify(this.tables, escapeHTML));
          this.isLoading = false;
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

  confirmDelete(item: any) {
    this.showDeletePopup = true;
    this.deletingTableId = item;
  }

  deleteTable() {
    this._TableService.deleteTable(this.deletingTableId['ID']).subscribe(
      res => {
        console.log(res);
        if(res['status'] === 'successful') {
          this.getTables();
          this.showDeletePopup = false;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  newTable() {
    this.showInputPopup = true;
  }

  cancel() {
    this.showDeletePopup = false;
    this.showInputPopup = false;
  }

  editTable(tableId: string) {
    this._Router.navigate(['/app/tables/' + tableId]);
  }

  copyLink(tableId: string) {
    const selBox = document.createElement('textarea');
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `https://www.bookly.com/booking/${tableId}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
