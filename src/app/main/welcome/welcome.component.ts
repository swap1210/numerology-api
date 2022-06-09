import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public labels = {
    title: '',
    hint: '',
    desc: '',
    bg: '',
    icon: '',
  };
  public hush: boolean = false;
  constructor(
    public be: BackendService,
    public auth: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.route.queryParams.subscribe((para) => {
      console.log(para);
      this.hush = para && para['m'] == 'shh';
    });
  }

  ngOnInit(): void {
    this.be.$comm.subscribe((v) => {
      if (v.hasOwnProperty('welcome')) this.labels = v.welcome;

      if (
        v.hasOwnProperty('notification') &&
        v.notification.hasOwnProperty('title') &&
        v.notification.hasOwnProperty('enable') &&
        v.notification.enable
      ) {
        this.dialog.open(NotificationDialog, {
          data: {
            title: v.notification.title,
            desc: v.notification.desc,
          },
        });
      }
    });
  }
}

@Component({
  selector: 'notification-dialog',
  templateUrl: 'notification-dialog.component.html',
})
export class NotificationDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
