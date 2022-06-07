import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Numerology } from 'src/app/model/Numerology';
import { BackendService } from 'src/app/services/backend.service';
import { Util } from 'src/app/services/Util';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
})
export class CalculateComponent implements OnInit {
  formError = '';
  public fg: FormGroup = new FormGroup({});
  public nums: Numerology = {
    name: '',
    l_n: 0,
    r_n: 0,
    s_n: 0,
    d_n: 0,
    p_n: 0,
    c_n: 0,
  };
  private formbuilder: FormBuilder = new FormBuilder();
  constructor(private be: BackendService) {}

  @ViewChild('fgGroupDirective')
  fgGroupDirective: FormGroupDirective | undefined;

  ngOnInit(): void {
    this.fg = this.formbuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("['A-Za-z ']+$"),
      ]),
      pob: new FormControl('', [Validators.pattern("['A-Za-z ']+$")]),
      dob: new FormControl('', []),
    });

    this.fg.valueChanges.subscribe((val) => {
      if (this.fg.valid) {
        this.calculate(val.name, val.dob);
      } else {
        this.calculate('', new Date());
      }
    });
  }

  calculate = (p_name: string, p_dob: Date) => {
    if (p_name) this.nums = this.be.calculateNums2(p_name, p_dob);
  };

  charToValFunc(ch: string) {
    return Util.charToVal[ch.toLowerCase() as keyof typeof Util.charToVal];
  }

  getErrorMessage() {
    return "Name must be all characters and can't be empty";
  }

  getNums = (): Nums[] => {
    let n: Nums[] = [];
    let excluded_filed = ['name', 'd_nm'];

    Object.keys(this.nums)
      .filter((v) => !excluded_filed.includes(v))
      .sort((a, b) => a.localeCompare(b))
      .forEach((val) => {
        n.push({
          num_label: Util.fullForm[val as keyof typeof Util.fullForm],
          num: this.nums[val as keyof typeof this.nums],
        });
      });
    return n;
  };
}
interface Nums {
  num_label: number | string | undefined;
  num: number | string | undefined;
}
