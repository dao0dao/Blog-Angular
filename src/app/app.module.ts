import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import plLocale from '@angular/common/locales/pl';

import { AdminModule } from './admin/admin.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/post/post.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/authInterceptor';

registerLocaleData(plLocale, 'pl')

const INTERCEPTOR_PROVIDERS: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
