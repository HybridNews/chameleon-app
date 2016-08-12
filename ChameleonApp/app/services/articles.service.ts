import { Injectable } from '@angular/core';

import { Article } from '../models/article.model';
import { RssChannel } from '../models/rss-channel.model';

import { RssFeedService } from './rss-feed.service';

@Injectable()
export class ArticlesService {

	constructor(private rssFeedService: RssFeedService) {
	}

	public getArticles(): Promise<Article[]> {
		let that = this;

		return that.rssFeedService.getChannel()
			.then(rssChannel => Promise.resolve(rssChannel.items));
	}
}