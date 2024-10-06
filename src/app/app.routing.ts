import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import { LoginComponent } from './Components/User/login/login.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { PageNewComponent } from './Components/Page/page-new/page-new.component';
import { PageEditComponent } from './Components/Page/page-edit/page-edit.component';
import { PageListComponent } from './Components/Page/page-list/page-list.component';
import { WebsiteListComponent } from './Components/Website/website-list/website-list.component';
import { WebsiteNewComponent } from './Components/Website/website-new/website-new.component';
import { WebsiteEditComponent } from './Components/Website/website-edit/website-edit.component';
import { WidgetEditComponent } from './Components/Widget/widget-edit/widget-edit.component';
import { WidgetChooserComponent } from './Components/Widget/widget-chooser/widget-chooser.component';
import { WidgetListComponent } from './Components/Widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './Components/Widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './Components/Widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './Components/Widget/widget-edit/widget-youtube/widget-youtube.component';
import { OmdbComponent } from './Components/omdb/omdb.component';
import {AuthGuard} from './services/auth-guard.service';
import { FlickrImageSearchComponent } from './Components/Widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';

// Import all other components here 

const APP_ROUTES : Routes = [
  { path : '', component : LoginComponent},
  { path : 'OMdb', component : OmdbComponent},
  { path : 'login', component : LoginComponent},
  { path : 'register', component: RegisterComponent},
  { path : 'user' , component: ProfileComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website' , component: WebsiteListComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/new' , component: WebsiteNewComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/:wid' , component: WebsiteEditComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/:wid/page' , component: PageListComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/:wid/page/new' , component: PageNewComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/:wid/page/:pid' , component: PageEditComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/:wid/page/:pid/widget' , component: WidgetListComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/:wid/page/:pid/widget/new' , component: WidgetChooserComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/:wid/page/:pid/widget/:wgid' , component: WidgetEditComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website/:wid/page/:pid/widget/:wgid/flickr' , component: FlickrImageSearchComponent, canActivate: [AuthGuard]}

  // so on
];

// Export the routes as module providers
export const Routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES);