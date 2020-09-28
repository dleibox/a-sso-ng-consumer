import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppLoadModule } from './app-load/app-load.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// export function initApp() {
//   return () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log('In initApp');
//         resolve();
//       }, 500);
//     });
//   };
// }

// export function initUser(http: HttpClient) {
//   return () => {
//     return http.get('https://reqres.in/api/users/2') // https://api.github.com/users/a-user
//       .toPromise()
//       .then((resp) => {
//         console.log('http a user', resp);
//       }, err => {
//         alert(err);
//       });
//   };
// }

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, AppLoadModule],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initApp,
    //   multi: true
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initUser,
    //   multi: true,
    //   deps: [HttpClient]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
