import {Component, ElementRef, AfterContentInit, Output, EventEmitter, ViewChild} from '@angular/core';

@Component({
    selector: '[pull-to-refresh]',
	templateUrl: 'app/components/pull-to-refresh/pull-to-refresh.component.html',
	styleUrls: ['app/components/pull-to-refresh/pull-to-refresh.component.css']
})
export class PullToRefreshComponent implements AfterContentInit {
	@ViewChild('contentWrapper') refreshElement: ElementRef;
    @Output() onRefresh = new EventEmitter();
    static hammerInitialized = false;
	status: string;

    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
		let that = this;
        if (!PullToRefreshComponent.hammerInitialized) {

            let hammertime = new Hammer(that.el.nativeElement, { touchAction: "auto" });
            hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });


			hammertime.on("panstart", (ev) => {
				if (ev.direction !== Hammer.DIRECTION_DOWN) {
					return;
				}

				that.refreshElement.nativeElement.style.margin = '0 auto';
				that.status = 'pull to refresh';
            });

			hammertime.on("panmove", (ev) => {
				if (ev.direction !== Hammer.DIRECTION_DOWN) {
					return;
				}

				if (document.body.scrollTop < 5) {
					that.refreshElement.nativeElement.style.margin = '0 auto';
					that.status = 'release to refresh';
				}
            });

			hammertime.on("panend", (ev) => {
				if (document.body.scrollTop == 0) {
					that.status = 'loading';
					that.onRefresh.emit();
					that.refreshElement.nativeElement.style.margin = '';
				} else if (document.body.scrollTop < 40) {
					that.refreshElement.nativeElement.style.margin = '';
				}
            });

            PullToRefreshComponent.hammerInitialized = true;
        }
    }
}

//angular.module('mgcrea.pullToRefresh', [])

//	.constant('pullToRefreshConfig', {
//		treshold: 60,
//		debounce: 400,
//		text: {
//			pull: 'pull to refresh',
//			release: 'release to refresh',
//			loading: 'refreshing...'
//		},
//		icon: {
//			pull: 'fa fa-arrow-down',
//			release: 'fa fa-arrow-up',
//			loading: 'fa fa-refresh fa-spin'
//		}
//	})

//	.directive('pullToRefresh', function ($compile, $timeout, $q, pullToRefreshConfig) {

//		return {
//			scope: true,
//			restrict: 'A',
//			transclude: true,
//			templateUrl: 'angular-pull-to-refresh.tpl.html',
//			compile: function compile(tElement, tAttrs, transclude) {

//				return function postLink(scope, iElement, iAttrs) {

//					var config = angular.extend({}, pullToRefreshConfig, iAttrs);
//					var scrollElement = iElement.parent();
//					var ptrElement = window.ptr = iElement.children()[0];

//					// Initialize isolated scope vars
//					scope.text = config.text;
//					scope.icon = config.icon;
//					scope.status = 'pull';

//					var setStatus = function (status) {
//						shouldReload = status === 'release';
//						scope.$apply(function () {
//							scope.status = status;
//						});
//					};

//					var shouldReload = false;
//					iElement.bind('touchmove', function (ev) {
//						var top = scrollElement[0].scrollTop;
//						if (top < -config.treshold && !shouldReload) {
//							setStatus('release');
//						} else if (top > -config.treshold && shouldReload) {
//							setStatus('pull');
//						}
//					});

//					iElement.bind('touchend', function (ev) {
//						if (!shouldReload) return;
//						ptrElement.style.webkitTransitionDuration = 0;
//						ptrElement.style.margin = '0 auto';
//						setStatus('loading');

//						var start = +new Date();
//						$q.when(scope.$eval(iAttrs.pullToRefresh))
//							.then(function () {
//								var elapsed = +new Date() - start;
//								$timeout(function () {
//									ptrElement.style.margin = '';
//									ptrElement.style.webkitTransitionDuration = '';
//									scope.status = 'pull';
//								}, elapsed < config.debounce ? config.debounce - elapsed : 0);
//							});
//					});

//					scope.$on('$destroy', function () {
//						iElement.unbind('touchmove');
//						iElement.unbind('touchend');
//					});

//				};
//			}
//		};

//	});