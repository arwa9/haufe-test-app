import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, effects } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
