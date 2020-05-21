import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoadModule } from './app-load/app-load.module';

export function initApp() {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('In initApp');
        resolve();
      }, 2000);
    });
  };
}

export function initUser(http: HttpClient) {
  return () => {
    return http.get('https://reqres.in/api/users/2') // https://api.github.com/users/a-user
      .toPromise()
      .then((resp) => {
        console.log('http a user', resp);
      }, err => {
        alert(err);
      });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppLoadModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initUser,
      multi: true,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
