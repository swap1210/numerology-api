import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss'],
})
export class SuggestComponent implements OnInit {
  private formbuilder: FormBuilder = new FormBuilder();
  spFormGroup: FormGroup = new FormGroup({});
  displayedColumns: string[] = [
    'Name',
    'Compund Number',
    'Soul Number',
    'Personality Number',
    'Destiny Number',
    'Domain Name Avalability',
  ];

  dataSource: MatTableDataSource<Numerology>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild('fgGroupDirective')
  fgGroupDirective: FormGroupDirective | undefined;
  fetchedData: Numerology[] = [];
  constructor() {
    this.dataSource = new MatTableDataSource(this.fetchedData);
  }

  ngOnInit(): void {
    this.spFormGroup = this.formbuilder.group({
      prefix: new FormControl('', [Validators.required]),
      suffix: new FormControl('', [Validators.required]),
    });
  }

  fetchSuggestions() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

interface Numerology {
  name: string;
  compund_number: number;
  soul_number: number;
  personality_number: number;
  destiny_number: number;
  domain_name: string;
}
