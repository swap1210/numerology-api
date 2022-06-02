import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseOptions } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BackendService } from './services/backend.service';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { NavHeaderComponent } from './main/nav-header/nav-header.component';
import { NavFooterComponent } from './main/nav-footer/nav-footer.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent, NavHeaderComponent, NavFooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
    BrowserAnimationsModule,
    SharedModule,
    MainModule,
  ],
  providers: [BackendService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
