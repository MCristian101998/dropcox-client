import { Component, OnInit } from '@angular/core';
import { AppUserDto } from 'src/app/shared/models/AppUserDto';
import { UserService } from 'src/app/shared/services/user.service';
import { SidenavSerive } from '../../services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{

  currentUser!: AppUserDto;

  constructor(
    private sidenavService: SidenavSerive,
    private userService: UserService
  ) { }

  toggleSidenav(){
    this.sidenavService.toggle();
  }

  ngOnInit(){

    const user = this.userService.getCurrentUser();

    if(user)
    {
      this.currentUser = user;
    }
  }
}
