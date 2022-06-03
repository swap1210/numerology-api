import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
})
export class CalculateComponent implements OnInit {
  formError = '';
  public fg: FormGroup = new FormGroup({});
  constructor() {}

  ngOnInit(): void {
    this.fg = new FormGroup({
      name: new FormControl('Swapnil', Validators.required),
    });
  }

  getErrorMessage() {
    return this.formError;
  }
}
