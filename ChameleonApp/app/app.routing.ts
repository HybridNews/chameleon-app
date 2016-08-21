import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './components/articles-list/articles-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';

const appRoutes: Routes = [
	{ path: 'articles/:id/details', component: ArticleDetailsComponent },
	{ path: '**', component: ArticlesComponent }
		//{ path: 'articles/list', component: ArticlesComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });