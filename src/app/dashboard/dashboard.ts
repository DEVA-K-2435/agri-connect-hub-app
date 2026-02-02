import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  username = 'Deva'; // later load from JWT or API

  ngOnInit(): void {
    // Example: get username from localStorage or token
    // this.username = localStorage.getItem('username') || 'User';
  }

}
