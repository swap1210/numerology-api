import { Component, Inject, OnInit } from '@angular/core';
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
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((para) => {
      console.log(para);
      this.hush = para && para['m'] == 'shh';
    });
  }

  ngOnInit(): void {
    this.be.$comm.subscribe((v) => {
      if (v.hasOwnProperty('welcome')) this.labels = v.welcome;
    });
  }
}
