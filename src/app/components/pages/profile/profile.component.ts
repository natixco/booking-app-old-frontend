import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profile_id: string;

  img: string = 'https://i.ytimg.com/vi/Aw5in7rOUH0/maxresdefault.jpg'

  constructor(
    private _ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.profile_id = this._ActivatedRoute.snapshot.params['id'];
  }

}
