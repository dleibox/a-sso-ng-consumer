import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppLoadService } from './app-load.service';

// export function load_config(appLoadService: AppLoadService) {
//     return () => appLoadService.loadConfig();
// }

export function sso_login(appLoadService: AppLoadService) {
    // return () => appLoadService.ssoLogin();
    return () =>
        appLoadService
            .loadConfig()
            .then(() => appLoadService.ssoLogin())
            .catch((e) => this.reject(e));
}

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [
        AppLoadService,
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: load_config,
        //     deps: [AppLoadService],
        //     multi: true
        // },
        {
            provide: APP_INITIALIZER,
            useFactory: sso_login,
            deps: [AppLoadService],
            multi: true
        }
    ]
})
export class AppLoadModule {}
