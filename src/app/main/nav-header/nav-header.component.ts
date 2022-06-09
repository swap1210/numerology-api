import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  sp = false;
  app_name = '';
  constructor(public be: BackendService, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$?.subscribe((v) => {
      this.sp = v && v.hasOwnProperty('workgroup') && v.workgroup == 'kk';
    });

    this.be.$comm.subscribe((v) => {
      this.app_name = v.app_name;
    });
  }
}
