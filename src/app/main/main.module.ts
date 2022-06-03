import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { CalculateComponent } from './main-body/calculate/calculate.component';
import { SuggestComponent } from './main-body/suggest/suggest.component';

@NgModule({
  declarations: [CalculateComponent, SuggestComponent, WelcomeComponent],
  imports: [SharedModule],
})
export class MainModule {}
