import { Component, OnInit } from '@angular/core';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _TitleService: TitleService,
  ) {
    this._TitleService.setTitle('SIDEBAR.settings');
  }

  ngOnInit() {
  }

}
