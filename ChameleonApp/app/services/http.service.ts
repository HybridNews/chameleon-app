import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

	constructor(private http: Http) { }

	public getArticles(): Promise<Response> {
		return this.http.get("http://www.novsport.com/rss_news.xml").map().toPromise();
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}

//http://www.novsport.com/rss_news.xml
//http://gong.bg/rss?view=full