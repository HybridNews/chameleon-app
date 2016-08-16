import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from 'ng2-bootstrap/components/carousel/carousel.component';
import { SlideComponent } from 'ng2-bootstrap/components/carousel/slide.component';
import { PullToRefreshComponent } from '../../components/pull-to-refresh/pull-to-refresh.component';
import { GesturesDirective } from '../../directives/gestures/gestures.directive';

import { Article } from '../../models/article.model';
import { Branding } from '../../models/branding.model';

import { ArticlesService } from '../../services/articles.service';
import { BrandingService } from '../../services/branding.service';

@Component({
	directives: [CarouselComponent, SlideComponent, GesturesDirective, PullToRefreshComponent],
	selector: 'articles-list',
	templateUrl: 'app/components/articles-list/articles-list.component.html',
	styleUrls: ['app/components/articles-list/articles-list.component.css']
})
export class ArticlesComponent implements OnInit {
	branding: Branding;
	slides: Article[];
	articles: Article[];
	@ViewChild(CarouselComponent)
	topArticlesComponent: CarouselComponent;

	constructor(
		private articlesService: ArticlesService,
		private brandingService: BrandingService
	) { }

	doSwipe(direction: string) {
		if (direction == GesturesDirective.events.swipeRight) {
			this.topArticlesComponent.prev();
		} else if (direction == GesturesDirective.events.swipeLeft) {
			this.topArticlesComponent.next();
		}
	}

	reloadArticles() {
		var a = 1;
	}

	ngOnInit() {
		let that = this;
		Promise.all([this.brandingService.getBranding(), this.articlesService.getArticles()]).then(values => {
			that.branding = values[0];
			let allArticles = values[1];
			that.articles = allArticles.slice(this.branding.topArticlesCount);
			that.slides = allArticles.slice(0, this.branding.topArticlesCount);
		});
	}
}


//import {Component, OnInit} from '@angular2/core';
//import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular2/common';
//import {Carousel} from 'ng2-bootstrap/components/carousel/carousel.component';
//import {Slide} from 'ng2-bootstrap/components/carousel/slide.component';
//import ArticlesService from 'app/services/articlesService.js';
//import ConfigurationService from 'app/services/configurationService.js';
//import XmlToJsonService from 'app/services/xmlToJsonService.js';

//var ArticlesListComponent =
//	Component({
//		selector: 'articles-list',
//		directives: [Carousel, Slide, CORE_DIRECTIVES, FORM_DIRECTIVES],
//		templateUrl: 'app/components/articles-list/articles-list.template.html'
//	})
//		.Class({
//			constructor: [ArticlesService, ConfigurationService, XmlToJsonService, function ArticlesListComponent(articlesService, configurationService, xmlToJsonService) {
//				var that = this;
//				that.baseUrl = "";
//				that.articles = [];
//				that.myInterval = 2000;
//				that.noWrapSlides = false;
//				that.slides = [];
//				configurationService.getConfiguration().subscribe(
//					function (response) {
//						var config = response.json();
//						articlesService.getArticles().subscribe(
//							function (response) {
//								var channel = xmlToJsonService.getJson(response.text()).channel;
//								that.baseUrl = channel.link;
//								var items = channel.item;
//								that.articles = items.slice(config.topArticlesCount);
//								that.slides = items.slice(0, config.topArticlesCount);
//							}
//						);
//					}
//				);
//			}],
//			ngOnInit: function () {

//			}
//		});

//export default ArticlesListComponent;