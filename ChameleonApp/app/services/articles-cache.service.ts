import { Injectable } from '@angular/core';

import { Article } from '../models/article.model';
import { AppConfig } from '../app.config';

@Injectable()
export class ArticlesCacheService {
	// TODO: add app name + version
	private storageKey: string = "articlesCache";
	private maxArticleId: number;

	constructor() {
		// TODO: clear the cache of older versions
		this.maxArticleId = AppConfig.maxArticlesCount * 10;
	}

	public getAll(): Article[] {
		let that = this;
		let cachedArticles = localStorage.getItem(that.storageKey);

		return !!cachedArticles ? JSON.parse(cachedArticles) : [];
	}

	public update(articles: Article[]): Article[] {
		let that = this;
		let currentArticles = that.getAll();
		let articlesToCreate = [];
		let nextId = currentArticles.length ? _.first(currentArticles).id - 1 : that.maxArticleId;

		for (var i = articles.length; i-- > 0;) {
			let article = articles[i];
			let existingArticle = _.find(currentArticles, ca => ca.link == article.link);
			if (existingArticle) {
				_.extend(existingArticle, article);
			} else {
				article.id = nextId;
				nextId--;
				articlesToCreate.push(article);
			}
		}

		_.forEach(articlesToCreate, a => {
			currentArticles.push(a);
		});

		// avoid articleId >= 1 & <= (maxArticlesCount * 10)
		if (nextId <= 0) {
			that._resetArtileIds(currentArticles);
		}

		// sort by ids in order to get the newest articles first
		currentArticles = _.sortBy(currentArticles, a => a.id).slice(0, AppConfig.maxArticlesCount);
		localStorage.setItem(that.storageKey, JSON.stringify(currentArticles));

		return that.getAll();
	}

	private _resetArtileIds(articles: Article[]) {
		let that = this;
		let nextId = that.maxArticleId;
		for (var i = articles.length; i-- > 0;) {
			let article = articles[i];
			article.id = nextId;
			nextId--;
		}
	}

	public getById(id: number): Article {
		let that = this;
		let articles = that.getAll();
		let foundArticle = _.find(articles, a => a.id == id);

		return foundArticle;
	}
}