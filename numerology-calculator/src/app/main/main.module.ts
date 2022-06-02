import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    MainBodyComponent,
    NavFooterComponent,
    NavHeaderComponent,
    WelcomeComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class MainModule {}
