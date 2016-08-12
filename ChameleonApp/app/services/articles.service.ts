import { Injectable }    from '@angular/core';

import { HttpService } from './http.service';
import { XmlToJsonService } from './xml-to-json.service';

import { Article } from '../models/article';


interface RssFeedResult {
	channel;
}

@Injectable()
export class ArticlesService {

	constructor(
		private httpService: HttpService,
		private xmlToJsonService: XmlToJsonService) {
	}

	public getArticles(): Promise<Article[]> {
		let that = this;

		return that.httpService.get("http://www.novsport.com/rss_news.xml")
			.then(response => that.getArticlesFromRssFeed(response));
	}

	private getArticlesFromRssFeed(rssFeed): Promise<Article[]> {
		let jsonFeed = <RssFeedResult>this.xmlToJsonService.getJson(rssFeed.text());
		let articles = <Article[]>jsonFeed.channel.item;

		return Promise.resolve(articles);
	}
}

//http://www.novsport.com/rss_news.xml
//http://gong.bg/rss?view=full