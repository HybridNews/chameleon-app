import {Directive, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[gestures]'
})
export class GesturesDirective implements AfterViewInit, OnDestroy {
	static events = {
		swipeRight: 'swiperight',
		swipeLeft: 'swipeleft',
		swipeUp: 'swipeup',
		swipeDown: 'swipedown',
		tap: 'tap'
	};

    @Output() onGesture = new EventEmitter();
	private hamer: HammerManager;

    constructor(private targetElement: ElementRef) {
    }

    ngAfterViewInit() {
		let that = this;

		that.hamer = new Hammer(that.targetElement.nativeElement, { touchAction: "auto" });
		that.hamer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
		that.hamer.on(GesturesDirective.events.swipeUp, (ev) => {
			that.onGesture.emit(GesturesDirective.events.swipeUp);
		});
		that.hamer.on(GesturesDirective.events.swipeDown, (ev) => {
			that.onGesture.emit(GesturesDirective.events.swipeDown);
		});
		that.hamer.on(GesturesDirective.events.swipeLeft, (ev) => {
			that.onGesture.emit(GesturesDirective.events.swipeLeft);
		});
		that.hamer.on(GesturesDirective.events.swipeRight, (ev) => {
			that.onGesture.emit(GesturesDirective.events.swipeRight);
		});
		that.hamer.on(GesturesDirective.events.tap, (ev) => {
			that.onGesture.emit(GesturesDirective.events.tap);
		});
    }

	ngOnDestroy() {
		let that = this;

		that.hamer.destroy();
	}
}