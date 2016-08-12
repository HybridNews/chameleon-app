import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

	constructor(private http: Http) { }

	public get(url: string): Promise<Response> {
		var that = this;
		return this.http.get(url).toPromise().catch(reason => that.handleError(reason));
	}

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // TODO: use logger

		return Promise.reject(errMsg);
	}
}