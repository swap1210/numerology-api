import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss'],
})
export class NavFooterComponent implements OnInit {
  developer = '...';
  constructor(private be: BackendService) {}

  ngOnInit(): void {
    this.be.$comm.subscribe((v) => {
      this.developer = v.developer;
    });
  }
}
