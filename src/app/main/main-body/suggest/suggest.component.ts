import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Numerology } from 'src/app/model/Numerology';
import { Util } from 'src/app/services/Util';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent implements OnInit, AfterViewInit {
  curr_nums: Numerology = {
    s_n: 0,
    d_n: 0,
    p_n: 0,
    c_n: 0,
    name: '',
    r_n: 0,
    l_n: 0,
  };
  private formbuilder: FormBuilder = new FormBuilder();
  searched = false;
  spFormGroup: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['name', 'c_n', 's_n', 'p_n', 'd_n', 'd_nm'];

  dataSource: MatTableDataSource<Numerology>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('fgGroupDirective')
  fgGroupDirective: FormGroupDirective | undefined;
  constructor(
    private route: ActivatedRoute,
    private be: BackendService,
    private cdr: ChangeDetectorRef
  ) {
    let dat: Numerology[] = [];
    this.dataSource = new MatTableDataSource(dat);
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => {
      // this.paginator.pageIndex = 0;
      // console.count('sorting called');
      this.dataSource.paginator && this.dataSource.paginator.firstPage();
    });
    // this.applyFilter('');
    // If the user changes the sort order, reset back to the first page.
  }

  ngOnInit(): void {
    this.spFormGroup = this.formbuilder.group({
      c_n: new FormControl('', [
        Validators.required,
        Validators.pattern("['0-9']+$"),
      ]),
      s_n: new FormControl('', [
        Validators.required,
        Validators.pattern("['0-9']"),
      ]),
      p_n: new FormControl('', [
        Validators.required,
        Validators.pattern("['0-9']"),
      ]),
      d_n: new FormControl('', [
        Validators.required,
        Validators.pattern("['0-9']"),
      ]),
      prefix: new FormControl('', [
        // Validators.required,
        Validators.pattern("['A-Za-z ']+$"),
      ]),
      suffix: new FormControl('', [
        // Validators.required,
        Validators.pattern("['A-Za-z ']+$"),
      ]),
      // tolerance: new FormControl('', [Validators.required]),
    });
    this.route.queryParams.subscribe((val) => {
      // console.log(val);
      this.spFormGroup.patchValue(val, { emitEvent: false, onlySelf: true });
    });

    this.spFormGroup.valueChanges.subscribe((val) => {
      if (this.spFormGroup.valid) {
        this.calculate(val.prefix + ' ' + val.suffix + ' ');
      } else {
        this.calculate('');
      }
    });

    this.be.$dict_data.subscribe((val) => {
      console.log('received ' + val.length);
      if (val.length && !this.dataSource.data.length) {
        this.dataSource = new MatTableDataSource<Numerology>(val);
        this.applyFilter('');
        this.cdr.detectChanges();
        if (val.length) this.searched = true;
      } else if (val.length) {
        //append
        val.forEach((new_val) => {
          this.dataSource.data.push(new_val);
        });
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  calculate = (p_name: string) => {
    this.curr_nums = this.be.calculateNums(p_name);
  };

  fetchSuggestions = () => {
    this.be.fetch(this.spFormGroup.getRawValue(), this.curr_nums);
  };

  back = () => {
    this.searched = false;
    this.dataSource = new MatTableDataSource<Numerology>([]);
  };

  applyFilter(val: string) {
    this.dataSource.filter = val.trim().toLowerCase();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator && this.dataSource.paginator.firstPage();
  }

  charToValFunc(ch: string) {
    return Util.charToVal[ch.toLowerCase() as keyof typeof Util.charToVal];
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  egStr() {
    return (
      'Ex. ' +
      this.spFormGroup.getRawValue().prefix +
      ' Flora ' +
      this.spFormGroup.getRawValue().suffix
    );
  }
}
