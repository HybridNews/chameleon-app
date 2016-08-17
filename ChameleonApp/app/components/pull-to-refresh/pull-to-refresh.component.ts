import {Component, ElementRef, AfterContentInit, Input, EventEmitter, ViewChild} from '@angular/core';

@Component({
    selector: 'pull-to-refresh',
	templateUrl: 'app/components/pull-to-refresh/pull-to-refresh.component.html',
	styleUrls: ['app/components/pull-to-refresh/pull-to-refresh.component.css']
})
export class PullToRefreshComponent implements AfterContentInit {
    static hammerInitialized = false;
	@ViewChild('refreshWrapper') refreshElement: ElementRef;
    @Input() onRefresh: Function;
	status: string;
	isVisible: boolean = false;
	shouldReload: boolean = false;

    constructor(private contentElement: ElementRef) {
    }

	ngAfterContentInit() {
		let that = this;
		if (!PullToRefreshComponent.hammerInitialized) {

			let hammertime = new Hammer(that.contentElement.nativeElement, { touchAction: "auto" });
			hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
			hammertime.on("panstart", (ev) => {
				that._onMove(false);
			});

			hammertime.on("panmove", (ev) => {
				that._onMove(false);
			});

			hammertime.on("panend", (ev) => {
				that._onMove(true);
			});

			PullToRefreshComponent.hammerInitialized = true;
		}
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