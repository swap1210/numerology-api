import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const moduleList = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
];
@NgModule({
  declarations: [],
  imports: moduleList,
  exports: moduleList,
})
export class SharedModule {}
