import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) {}
  
  // TABLES
  getAllTable() {
    return this._HttpClient.post('http://auth.localhost.net:3001/api/table/list', null);
  }

  createTable(data: Object) {
    return this._HttpClient.post('http://auth.localhost.net:3001/api/table', data);
  }

  editTable(data: Object) {
    return this._HttpClient.post('http://auth.localhost.net:3001/api/table/edit', data);
  }

  deleteTable(tableID: string) {
    return this._HttpClient.post('http://auth.localhost.net:3001/api/table/delete', {tableID: tableID});
  }



  // SERVICES
  getAllService_private(tableID: string) {
    return this._HttpClient.post(`http://auth.localhost.net:3001/api/table/list?details&tableID=${tableID}`, null);
  }
  
  getAllService_public(tableID: string) {
    return this._HttpClient.get(`http://auth.localhost.net:3001/api/service/list?tableID=${tableID}`);
  }

  getServiceDetails(tableID: string, serviceID: string) {
    return this._HttpClient.get(`http://auth.localhost.net:3001/api/service?tableID=${tableID}&serviceID=${serviceID}`);
  }

  createService(data: Object) {
    return this._HttpClient.post('http://auth.localhost.net:3001/api/service/', data);
  }

  deleteService(tableID: string, serviceID: string) {
    return this._HttpClient.post('http://auth.localhost.net:3001/api/service/delete', {tableID: tableID, serviceID: serviceID});
  }

  editService(data: Object) {
    return this._HttpClient.post('http://auth.localhost.net:3001/api/service/edit', data);
  }


  // BOOKING
  booking(data: Object) {
    return this._HttpClient.post('/api/book', data);
  }

  getTimes(tableID: string, date: Object) {
    return this._HttpClient.get(`http://auth.localhost.net:3001/api/table/available?tableID=${tableID}&year=${date['year']}&month=${date['month']}&day=${date['day']}`);
  }
}
