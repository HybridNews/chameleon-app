import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PullToRefreshComponent } from '../../components/pull-to-refresh/pull-to-refresh.component';

import { Article } from '../../models/article.model';

import { ArticlesService } from '../../services/articles.service';

@Component({
	directives: [PullToRefreshComponent],
	selector: 'article-details',
	templateUrl: 'app/components/article-details/article-details.component.html'
})
export class ArticleDetailsComponent implements OnInit {
	private articleId: number;
	private currentArticle: Article;

	constructor(
		private router: Router,
		private activateRoute: ActivatedRoute,
		private articlesService: ArticlesService
	) { }

	ngOnInit() {
		let that = this;

		that.articleId = this.activateRoute.snapshot.params['id'];
		if (that.articleId) {
			that.articlesService.getById(that.articleId).then(article => {
				if (!article) {
					that.navigateToArticlesList();
				} else {
					that.currentArticle = article;
				}
			});
		} else {
			that.navigateToArticlesList();
		}
	}

	navigateToArticlesList() {
		let that = this;
		that.router.navigate(["articles-list"]);
	}
}