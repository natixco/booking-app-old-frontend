import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  greeting: string;
  todayBookings: any = [
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '10:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '11:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '12:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '13:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '14:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '15:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '10:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '11:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '12:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '13:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '14:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '15:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '10:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '11:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '12:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '13:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '14:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '15:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '10:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '11:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '12:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '13:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '14:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '15:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '10:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '11:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '12:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '13:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '14:00 AM',
      'date':  '08, Sept. 2019'
    },
    {
      'customerName': 'Adam Johns',
      'service': 'Plumbing',
      'time': '15:00 AM',
      'date':  '08, Sept. 2019'
    }
  ]

  todayBookings2: any = [];
  isVerified: boolean = true;
  userInfo: Object;

  constructor(
    private _UserService: UserService,
    private _TitleService: TitleService,
  ) {
    this._UserService._userInfo.subscribe((data: Object) => {
      this.userInfo = data;
    })

    this._TitleService.setTitle('SIDEBAR.dashboard');
  }

  ngOnInit() {

    let hour = new Date().getHours();
    
    if(hour === 3 || hour === 4 || hour === 5 || hour === 6 || hour === 7 || hour === 8 || hour === 9 || hour === 10 || hour === 11) {
      this.greeting = 'Good morning';
    } else if(hour === 12 || hour === 13 || hour === 14 || hour === 15 || hour === 16 || hour === 17) {
      this.greeting = 'Good afternoon';
    } else if(hour === 18 || hour === 19 || hour === 20 || hour === 21 || hour === 22 || hour === 23 || hour === 24 || hour === 1 || hour === 2) {
      this.greeting = 'Good evening';
    }
  }

}
