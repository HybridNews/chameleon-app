import { Injectable } from '@angular/core';

import { Article } from '../models/article.model';
import { RssChannel } from '../models/rss-channel.model';

import { RssFeedService } from './rss-feed.service';
import { ArticlesCacheService } from './articles-cache.service';

@Injectable()
export class ArticlesService {

	constructor(
		private rssFeedService: RssFeedService,
		private cacheService: ArticlesCacheService) {
	}

	public getArticles(): Promise<Article[]> {
		let that = this;

		return that.reloadArticles().then(that.cacheArticles.bind(that));
	}

	public getById(id: number): Promise<Article> {
		let that = this;
		let foundArticle = that.cacheService.getById(id);

		return Promise.resolve<Article>(foundArticle);
	}

	private reloadArticles(): Promise<Article[]> {
		let that = this;

		return that.rssFeedService.getChannel()
			.then(rssChannel => Promise.resolve(rssChannel.items));
	}

	private cacheArticles(articles: Article[]): Promise<Article[]> {
		let that = this;

		let cachedArticles = that.cacheService.update(articles);

		return Promise.resolve<Article[]>(cachedArticles);
	}
}