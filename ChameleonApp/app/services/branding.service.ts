import { Injectable }    from '@angular/core';

import { AppConfig } from '../app.config';
import { Branding } from '../models/branding.model';

import { RssFeedService } from './rss-feed.service';

@Injectable()
export class BrandingService {

	constructor(private rssFeedService: RssFeedService) {
	}

	public getBranding(): Promise<Branding> {
		let that = this;

		return that.rssFeedService.getChannel()
			.then(rssChannel => {
				let branding = new Branding();
				// the rss values are overridden by the AppConfig ones.
				branding.description = AppConfig.description || rssChannel.description;
				branding.resourcesBaseUrl = AppConfig.resourcesBaseUrl || rssChannel.link;
				branding.title = AppConfig.title || rssChannel.title;
				branding.topArticlesCount = AppConfig.topArticlesCount;
				branding.topArticlesIntervalInMs = AppConfig.topArticlesIntervalInMs;
				branding.largeLogoUrl = AppConfig.largeLogoUrl

				return Promise.resolve(branding);
			});
	}
}