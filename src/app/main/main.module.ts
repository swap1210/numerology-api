import { NgModule } from '@angular/core';
import {
  NotificationDialog,
  WelcomeComponent,
} from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { CalculateComponent } from './main-body/calculate/calculate.component';
import { SuggestComponent } from './main-body/suggest/suggest.component';
import { LoaderComponent } from './main-body/loader/loader.component';

@NgModule({
  declarations: [
    CalculateComponent,
    SuggestComponent,
    WelcomeComponent,
    LoaderComponent,
    NotificationDialog,
  ],
  imports: [SharedModule],
})
export class MainModule {}
