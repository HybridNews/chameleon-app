import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
	private branding: Branding;
	private slides: Article[] = [];
	private articles: Article[] = [];
	@ViewChild(CarouselComponent)
	private topArticlesComponent: CarouselComponent;
	private reloadArticles: Function;

	constructor(
		private router: Router,
		private articlesService: ArticlesService,
		private brandingService: BrandingService
	) { }

	private onTopArticlesSwipe(direction: string) {
		let that = this;

		if (direction == GesturesDirective.events.swipeRight) {
			that.topArticlesComponent.prev();
		} else if (direction == GesturesDirective.events.swipeLeft) {
			that.topArticlesComponent.next();
		}
	}

	private onArticleClick(article: Article) {
		let that = this;
		that.router.navigate(['/articles', article.id, "details"]);
	}

	public ngOnInit() {
		let that = this;
		that.reloadArticles = this.loadArticles.bind(this);
		that.loadArticles();
	}

	private loadArticles() {
		let that = this;
		return Promise.all([that.brandingService.getBranding(), that.articlesService.getArticles()]).then(values => {
			that.branding = values[0];
			let allArticles = values[1];
			that.articles.length = 0;
			that.slides.length = 0;
			that.articles.push(...allArticles.slice(that.branding.topArticlesCount));
			that.slides.push(...allArticles.slice(0, that.branding.topArticlesCount));
		});
	}
}