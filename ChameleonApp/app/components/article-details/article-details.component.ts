import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PullToRefreshComponent } from '../../components/pull-to-refresh/pull-to-refresh.component';

import { Article } from '../../models/article.model';
import { Branding } from '../../models/branding.model';

import { ArticlesService } from '../../services/articles.service';
import { BrandingService } from '../../services/branding.service';

@Component({
	directives: [PullToRefreshComponent],
	selector: 'article-details',
	templateUrl: 'app/components/article-details/article-details.component.html',
	styleUrls: ['app/components/article-details/article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
	private articleId: number;
	private branding: Branding;
	private currentArticle: Article;
	private reloadArticles: Function;

	constructor(
		private router: Router,
		private activateRoute: ActivatedRoute,
		private articlesService: ArticlesService,
		private brandingService: BrandingService
	) { }

	public ngOnInit() {
		let that = this;

		that.reloadArticles = this.loadArticles.bind(this);
		that.loadArticles();
	}

	private loadArticles() {
		let that = this;

		that.articleId = this.activateRoute.snapshot.params['id'];
		if (that.articleId) {
			return Promise.all([that.brandingService.getBranding(), that.articlesService.getById(that.articleId)]).then(values => {
				that.branding = values[0];
				let article = values[1];
				if (!article) {
					that.navigateToArticlesList();
				} else {
					that.currentArticle = article;
				}
			});
		} else {
			that.navigateToArticlesList();
			return Promise.resolve();
		}
	}

	private goToFullArticle() {
		let that = this;
		window.open(that.currentArticle.link, '_system');
	}

	private navigateToArticlesList() {
		let that = this;
		that.router.navigate(["articles-list"]);
	}
}