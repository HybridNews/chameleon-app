import { Component } from '@angular/core';

//export class Hero {
//	id: number;
//	name: string;
//}
@Component({
	selector: 'articles-list',
	template: `
    <h1>Hello World!</h1>
    `
})
export class ArticlesComponent {
	title : string = 'Tour of Heroes';
}