import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.sass']
})
export class NotificationPopupComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
