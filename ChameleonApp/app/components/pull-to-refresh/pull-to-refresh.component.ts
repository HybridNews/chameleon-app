import {Component, ElementRef, AfterContentInit, OnDestroy, Input, EventEmitter, ViewChild} from '@angular/core';

@Component({
    selector: 'pull-to-refresh',
	templateUrl: 'app/components/pull-to-refresh/pull-to-refresh.component.html',
	styleUrls: ['app/components/pull-to-refresh/pull-to-refresh.component.css']
})
export class PullToRefreshComponent implements AfterContentInit, OnDestroy {
	@ViewChild('refreshWrapper') refreshElement: ElementRef;
    @Input() onRefresh: Function;
	private statusMessages = {
		'release': ' release to reload',
		'loading': ''
	};
	private statusIcons = {
		'release': 'fa fa-refresh',
		'loading': 'fa fa-spinner fa-spin'
	};
	private status: string;
	private isVisible: boolean = false;
	private shouldReload: boolean = false;
	private hammer: HammerManager;

    constructor(private contentElement: ElementRef) {
    }

	ngAfterContentInit() {
		let that = this;

		that.hammer = new Hammer(that.contentElement.nativeElement, { touchAction: "auto" });
		that.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		that.hammer.on("panstart", (ev) => {
			if (ev.direction !== Hammer.DIRECTION_DOWN) {
				return;
			}

			that._onMove(false);
		});

		that.hammer.on("panmove", (ev) => {
			if (ev.direction !== Hammer.DIRECTION_DOWN) {
				return;
			}

			that._onMove(false);
		});

		that.hammer.on("panend", (ev) => {
			that._onMove(true);
		});
	}

	ngOnDestroy() {
		let that = this;

		that.hammer.destroy();
	}

	_onMove(endMoove: boolean) {
		let that = this;
		let bodyTop = document.body.scrollTop;
		if (endMoove) {
			if (that.shouldReload && bodyTop === 0) {
				that._setStatus('loading');
				that.onRefresh().then(values => {
					that._hidePullToRefresh();
				});
			} else {
				that._hidePullToRefresh();
			}
		} else if (bodyTop === 0) {
			that._setStatus('release');
			that._showPullToRefresh();
		} else {
			that._hidePullToRefresh();
		}
	}

	_setStatus(status) {
		let that = this;
		that.shouldReload = that.status === 'release';
		that.status = status;
	};

	_showPullToRefresh() {
		let that = this;
		if (that.isVisible) {
			return;
		}

		that.refreshElement.nativeElement.style.webkitTransitionDuration = 0;
		that.refreshElement.nativeElement.style.transitionDuration = 0;
		that.refreshElement.nativeElement.style.margin = '0 auto';
		that.isVisible = true;
	}

	_hidePullToRefresh() {
		let that = this;
		if (!that.isVisible) {
			return;
		}

		that.refreshElement.nativeElement.style.margin = '';
		that.refreshElement.nativeElement.style.webkitTransitionDuration = '';
		that.refreshElement.nativeElement.style.transitionDuration = '';
		that.isVisible = false;
		that._setStatus('');
	}
}