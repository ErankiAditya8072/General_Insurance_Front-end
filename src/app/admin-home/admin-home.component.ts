import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Insurance } from 'Insurance';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'User';
import { AdminService } from '../admin.service';
import { InnsuranceService } from '../innsurance.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  user: User[];
 

  constructor(private router: Router, public storage : LocalStorageService, private userServ: UserService,private adminServ:AdminService) { }

  ngOnInit(): void {
    if(!this.storage.retrieve("isAdminLoggedIn")){
      alert("Please Log-In to continue");
      this.router.navigate(["/admin"]);
    }

    this.getUserList();
  }

  getUserList(){
    this.adminServ.getAllUsers().subscribe(data => 
      this.user = data);
  }


  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
