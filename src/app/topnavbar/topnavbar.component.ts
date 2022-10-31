import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import {UsersService} from '../users.service'
@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {
  token: any
  constructor(private userservice:UsersService,private route:Router) { }
  ngOnInit(): void {
      this.token = localStorage.getItem('x-fiftyaccess-token')
  }
 
  logout()
   {
    localStorage.removeItem("x-fiftyaccess-token")
    this.route.navigate(["/login"]); 
  }

}
