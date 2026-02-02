import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss'
})
export class DashboardLayout implements OnInit{

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('loginuser') || 'User';
  }
  username = ''; // later load from JWT or API

  get hasFarmerAccess(): boolean {
    const role = localStorage.getItem('role');
    return role === 'FARMER';
  }
}
