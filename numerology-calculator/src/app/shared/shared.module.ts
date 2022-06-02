import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

const moduleList = [CommonModule, MatCardModule];
@NgModule({
  declarations: [],
  imports: moduleList,
  exports: moduleList,
})
export class SharedModule {}
