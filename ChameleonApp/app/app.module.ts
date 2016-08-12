import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }  from './app.component';
import { ArticlesComponent } from './components/articles-list/articles-list.component';

import { ArticlesService } from './services/articles.service';
import { XmlToJsonService } from './services/xml-to-json.service';
import { HttpService } from './services/http.service';
import { RssFeedService } from './services/rss-feed.service';
import { BrandingService } from './services/branding.service';

import 'rxjs/add/operator/toPromise';

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent, ArticlesComponent],
	bootstrap: [AppComponent],
	providers: [HTTP_PROVIDERS, ArticlesService, XmlToJsonService, HttpService, RssFeedService, BrandingService]
})
export class AppModule { }