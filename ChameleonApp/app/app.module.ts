import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ArticlesComponent } from './components/articles-list/articles-list.component';

import { HTTP_PROVIDERS } from '@angular/http';
import { ArticlesService } from './services/rss-articles.service';
import { XmlToJsonService } from './services/xml-to-json.service';

import 'rxjs/add/operator/toPromise';

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent, ArticlesComponent],
	bootstrap: [AppComponent],
	providers: [HTTP_PROVIDERS, ArticlesService, XmlToJsonService]
})
export class AppModule { }