import { NgModule, provide } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent }  from './app.component';
import { ArticlesComponent } from './components/articles-list/articles-list.component';

import { ArticlesService } from './services/articles.service';
import { ArticlesCacheService } from './services/articles-cache.service';
import { XmlToJsonService } from './services/xml-to-json.service';
import { HttpService } from './services/http.service';
import { RssFeedService } from './services/rss-feed.service';
import { BrandingService } from './services/branding.service';

import 'rxjs/add/operator/toPromise';

@NgModule({
	imports: [BrowserModule, routing],
	declarations: [AppComponent, ArticlesComponent],
	bootstrap: [AppComponent],
	providers: [HTTP_PROVIDERS, HttpService, provide(APP_BASE_HREF, { useValue: '/' }), appRoutingProviders,
		ArticlesService, ArticlesCacheService, XmlToJsonService, RssFeedService, BrandingService]
})
export class AppModule {
	constructor() {

	}
}