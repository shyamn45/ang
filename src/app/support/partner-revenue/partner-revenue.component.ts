import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-partner-revenue',
  templateUrl: './partner-revenue.component.html',
  styleUrls: ['./partner-revenue.component.css']
})
export class PartnerRevenueComponent implements OnInit {
  RevenueRecords: any
  constructor(private spinner: NgxSpinnerService, private userService: UsersService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.PartnerRevenueRecords().subscribe((respoonse) => {
      if (respoonse.code == "PD01") {
        alert("You Don't Have a Permission")
        return;
      }
      if (respoonse.code == "S001") {
        this.RevenueRecords = respoonse.data.Records;
      } else {
        alert(respoonse.data)
        return;
      }


    }, function (error) {
      alert(error.error.data)
    })
  }

  update(){
    this.route.navigate(['/revenue/updateRevenue'])
  }

}
