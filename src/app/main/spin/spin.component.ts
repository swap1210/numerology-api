import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'spin-loader',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
