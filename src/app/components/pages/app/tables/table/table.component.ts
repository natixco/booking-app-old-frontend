import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { TableService } from '@services/table/table.service';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  tableId: string;
  tableName: string;
  services: Object;
  showDeletePopup: boolean;
  deletingServiceId: string;
  isLoading: boolean;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _AuthService: AuthService,
    private _TableService: TableService,
    private _TitleService: TitleService
  ) {
    this._TitleService.setTitle('TITLE.table');
  }

  ngOnInit() {
    this.tableId = this._ActivatedRoute.snapshot.params['id'];
    this.getServices();
  }

  getServices() {
    this.isLoading = true;
    this._TableService.getAllService_private(this.tableId).subscribe(
      res => {
        console.log(res);
        this.tableName = res['name'];
        this.services = res['services'];
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }
  
  routeTo(serviceId: number) {
    this._Router.navigate([`/app/tables/${this.tableId}/${serviceId}`]);
  }

  confirmDelete(item: any) {
    this.showDeletePopup = true;
    this.deletingServiceId = item;
  }

  deleteTable() {
    this._TableService.deleteService(this.tableId, this.deletingServiceId['ID']).subscribe(
      res => {
        console.log(res);
        if(res['status'] === 'successful') {
          this.getServices();
          this.showDeletePopup = false;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel() {
    this.showDeletePopup = false;
  }

}
