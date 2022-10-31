import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  Permissions:any
  constructor(private spinner: NgxSpinnerService, private userService: UsersService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.userService.Permissions().subscribe((respoonse) => {
      if (respoonse.code == "PD01") {
        alert("You Don't Have a Permission")
        return;
      }
      if (respoonse.code == "S001") {
       this.Permissions=respoonse.data;
      }

    },function (error) {
      alert(error.error.data)
    })

  }

}
