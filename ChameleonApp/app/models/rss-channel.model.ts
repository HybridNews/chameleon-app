import { Article } from './article.model';

export class RssChannel {
	title: string;
	link: string;
	description: string;
    items: Article[];
    image: RssChannelImage
}

class RssChannelImage {
	link: string;
	url: string;
}