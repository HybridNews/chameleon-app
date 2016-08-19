import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './components/articles-list/articles-list.component';

const appRoutes: Routes = [
	{ path: '**', component: ArticlesComponent }
		//{ path: 'articles/list', component: ArticlesComponent },
		//{ path: 'articles/:id/details', component: ArticleDetailsComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });