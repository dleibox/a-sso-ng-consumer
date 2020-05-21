import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { A_CONFIG_URL, A_CONFIG, appConfig } from '../app-config/app-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {
  constructor(@Inject(DOCUMENT) private document: Document, private cookieService: CookieService, private httpClient: HttpClient) { }

  loadConfig(): Promise<any> {
    const promise = this.httpClient
      .get(A_CONFIG_URL)
      .toPromise()
      .then((settings: A_CONFIG) => {
        appConfig.production = settings.production;
        appConfig.apiBaseUrl = settings.apiBaseUrl;

        console.log(`appConfig:`, appConfig);

        return settings;
      });

    return promise;
  };

  ssoLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      const q = new URLSearchParams(this.document.location.search); // alternative: inject UrlSerializer or new DefaultUrlSerializer()
      const ssoKey = q.get('ssoKey');
      const appToken = this.cookieService.get('app_token');
      if (appToken) {
        this.httpClient.get(`${environment.ssoUrl}/verifytoken?ssoToken=${appToken}`, {
          headers: {
            'Authorization': 'Bearer 8888'
          }
        })
          .toPromise()
          .then((resp: any) => {
            console.log('verifytoken', resp);
            resolve(appToken);
          }, err => {
            reject(err);
          });
      } else {
        if (ssoKey) {
          this.httpClient.get(`${environment.ssoUrl}/verifykey?ssoKey=${ssoKey}`, {
            headers: {
              'Authorization': 'Bearer 8888'
            }
          })
            .toPromise()
            .then((resp: any) => {
              console.log('verified', resp);
              if (resp.token) {
                const dateNow = new Date();
                dateNow.setMinutes(dateNow.getMinutes() + 2);
                this.cookieService.set('app_token', resp.token, dateNow);
                window.history.replaceState({}, '', `${location.pathname}`);
                resolve(ssoKey);
              }
            }, err => {
              reject(err);
            });
        } else {
          this.document.location.href = `${environment.ssoUrl}/login?appURL=${location.href}`;
        }
      }
    });
  }
}
