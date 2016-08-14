import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

	constructor(private http: Http) { }

	public get(url: string, headers: Headers): Promise<Response> {
		let that = this;
		let options: any = {};
		if (headers) {
			options.headers = headers;
		}

		return this.http.get(url, options).toPromise().catch(reason => that.handleError(reason));
	}

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // TODO: use logger

		return Promise.reject(errMsg);
	}
}