import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
// import { QuillModule } from 'ngx-quill';

import { AppComponent } from "./app.component";
import { LoginComponent } from "./Components/User/login/login.component";
import { RegisterComponent } from "./Components/User/register/register.component";
import { ProfileComponent } from "./Components/User/profile/profile.component";
import { PageNewComponent } from "./Components/Page/page-new/page-new.component";
import { PageEditComponent } from "./Components/Page/page-edit/page-edit.component";
import { PageListComponent } from "./Components/Page/page-list/page-list.component";
import { WebsiteListComponent } from "./Components/Website/website-list/website-list.component";
import { WebsiteNewComponent } from "./Components/Website/website-new/website-new.component";
import { WebsiteEditComponent } from "./Components/Website/website-edit/website-edit.component";
import { WidgetEditComponent } from "./Components/Widget/widget-edit/widget-edit.component";
import { WidgetChooserComponent } from "./Components/Widget/widget-chooser/widget-chooser.component";
import { WidgetListComponent } from "./Components/Widget/widget-list/widget-list.component";
import { WidgetHeaderComponent } from "./Components/Widget/widget-edit/widget-header/widget-header.component";
import { WidgetImageComponent } from "./Components/Widget/widget-edit/widget-image/widget-image.component";
import { WidgetYoutubeComponent } from "./Components/Widget/widget-edit/widget-youtube/widget-youtube.component";
import { HttpClientModule } from "@angular/common/http";
import { Routing } from "./app.routing";

import { UserService } from "./services/user.service.client";
import { SecretKeysService } from "./services/env.service.client";
import { WebsiteService } from "./services/website.service.client";
import { PageService } from "./services/page.service.client";
import { WidgetService } from "./services/widget.service.client";
import { FlickrService } from "./services/flickr.service.client";
import { OmdbComponent } from "./Components/omdb/omdb.component";
import { SharedService } from "./services/shared.service.client";
import { FlickrImageSearchComponent } from "./Components/Widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component";
import { AuthGuard } from "./services/auth-guard.service";
import { WidgetHtmlComponent } from "./Components/Widget/widget-edit/widget-html/widget-html.component";
import { WidgetTextComponent } from "./Components/Widget/widget-edit/widget-text/widget-text.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WidgetEditComponent,
    WidgetChooserComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    OmdbComponent,
    FlickrImageSearchComponent,
    WidgetHtmlComponent,
    WidgetTextComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    Routing,
    FormsModule,
    HttpModule,
    // QuillModule.forRoot()
  ],
  providers: [
    UserService,
    SecretKeysService,
    WebsiteService,
    PageService,
    WidgetService,
    FlickrService,
    SharedService,
    AuthGuard,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
