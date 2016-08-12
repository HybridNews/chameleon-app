import { Injectable } from '@angular/core';

import { AppConfig } from '../app.config';
import { RssChannel } from '../models/rss-channel.model';

import { HttpService } from './http.service';
import { XmlToJsonService } from './xml-to-json.service';

@Injectable()
export class RssFeedService {

	constructor(
		private httpService: HttpService,
		private xmlToJsonService: XmlToJsonService) {
	}

	public getChannel(): Promise<RssChannel> {
		let that = this;

		return that.httpService.get(AppConfig.feedUrl)
			.then(response => Promise.resolve(that.getArticlesFromRssFeed(response)));
	}

	private getArticlesFromRssFeed(rssFeed): RssChannel {
		let jsonFeed: any = this.xmlToJsonService.getJson(rssFeed.text());
		jsonFeed.channel.items = jsonFeed.channel.item;
		delete jsonFeed.channel.item;
		let result = <RssChannel>jsonFeed.channel;

		return result;
	}
}