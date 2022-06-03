import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
})
export class CalculateComponent implements OnInit {
  formError = '';
  public fg: FormGroup = new FormGroup({});
  public nums = { soul_number: 0, destiny_number: 0, personaly_number: 0 };
  private formbuilder: FormBuilder = new FormBuilder();
  constructor(private be: BackendService) {}

  @ViewChild('fgGroupDirective')
  fgGroupDirective: FormGroupDirective | undefined;

  ngOnInit(): void {
    this.fg = this.formbuilder.group({
      name: new FormControl('', Validators.required),
    });

    this.fg.valueChanges.subscribe((val) => {
      if (this.fg.valid) {
        this.calculate();
      }
    });
  }

  calculate = () => {
    this.nums = this.be.calculateNums(this.fg.getRawValue().name);
  };
  getErrorMessage() {
    return "Name must be all characters and can't be empty";
  }
}
