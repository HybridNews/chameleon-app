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

		return that.reloadArticles().then(that.cacheArticles);
	}

	private reloadArticles(): Promise<Article[]> {
		var that = this;

		return that.rssFeedService.getChannel()
			.then(rssChannel => Promise.resolve(rssChannel.items));
	}

	private cacheArticles(articles: Article[]): Promise<Article[]> {
		return Promise.resolve<Article[]>(articles);
	}
}