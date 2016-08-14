import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

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
		let headers = new Headers();
		headers.append('Accept', 'text/xml');

		return that.httpService.get(AppConfig.feedUrl, headers)
			.then(response => Promise.resolve(that.getArticlesFromRssFeed(response)));
	}

	private getArticlesFromRssFeed(rssFeed): RssChannel {
		let jsonFeed: any = this.xmlToJsonService.getJson(rssFeed.text());
		jsonFeed.channel.items = jsonFeed.channel.item;
		delete jsonFeed.channel.item;
		let item: any = null;
		for (let i in jsonFeed.channel.items) {
			item = jsonFeed.channel.items[i];
			item.description = item.plain_description || item.description;
			item.imageUrl = item.image || (item.enclosure && item.enclosure.url);
        }

		let result = <RssChannel>jsonFeed.channel;

		return result;
	}
}