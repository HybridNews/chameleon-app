import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ArticlesService {

	constructor(private http: Http) { }

	getArticles() {
		return this.http.get("http://www.novsport.com/rss_news.xml");
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}

//http://www.novsport.com/rss_news.xml
//http://gong.bg/rss?view=full