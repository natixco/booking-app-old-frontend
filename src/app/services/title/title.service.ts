import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private _TranslateService: TranslateService,
    private _Title: Title
  ) { }

  setTitle(key: string) {
    if(key === null) {
      this._Title.setTitle('Bookly');
    } else {
      this._TranslateService.get(key).subscribe(
        res => {
          this._Title.setTitle('Bookly - ' + res);
        }
      )
    }
  }
}
