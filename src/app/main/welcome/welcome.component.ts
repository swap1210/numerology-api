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
  public loaded: boolean = false;
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
      if (v.hasOwnProperty('welcome')) {
        this.labels = v.welcome;
        this.loaded = true;
      }
    });

    this.be.$notif.subscribe((v) => {
      if (
        v.hasOwnProperty('title') &&
        v.hasOwnProperty('desc') &&
        v.hasOwnProperty('enable') &&
        v.enable
      ) {
        this.dialog.open(NotificationDialog, {
          data: {
            title: v.title,
            desc: v.desc,
          },
          maxWidth: '35em',
        });
      }
    });
  }
}

@Component({
  selector: 'notification-dialog',
  templateUrl: 'notification-dialog.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class NotificationDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
