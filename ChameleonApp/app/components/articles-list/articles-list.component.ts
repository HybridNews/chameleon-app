import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';

import {CarouselComponent} from 'ng2-bootstrap/components/carousel/carousel.component';
import {SlideComponent} from 'ng2-bootstrap/components/carousel/slide.component';

import { ArticlesService } from '../../services/rss-articles.service';
import { XmlToJsonService } from '../../services/xml-to-json.service';

import { Article } from '../../models/article';

interface RssFeedResult {
	channel;
}

@Component({
	directives: [CarouselComponent, SlideComponent],
	selector: 'articles-list',
	templateUrl: 'app/components/articles-list/articles-list.component.html',
	styleUrls: ['app/components/articles-list/articles-list.component.css']
})
export class ArticlesComponent implements OnInit {
	baseUrl: string;
	articles: Article[];
	slides: Article[];
	myInterval: number;
	noWrapSlides: boolean;

	constructor(
		private articlesService: ArticlesService,
		private xmlToJsonService: XmlToJsonService
	) {
		this.myInterval = 2000;
		this.noWrapSlides = false;
	}

	ngOnInit() {
		let that = this;
		this.articlesService.getArticles().subscribe(
			function (response) {
				let channel = (<RssFeedResult>that.xmlToJsonService.getJson(response.text())).channel;
				that.baseUrl = channel.link;
				let items = channel.item;
				that.articles = items.slice(5);
				that.slides = items.slice(0, 5);
			}
		);
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