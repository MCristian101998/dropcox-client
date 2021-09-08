import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TokenInterceptor } from "../../shared/services/token-interceptor.service";

@NgModule({

    declarations:[],
    exports:[HttpClientModule],
    providers:[{

        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }]
})

export class HttpModule{}