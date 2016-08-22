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
	private hammer: HammerManager;

    constructor(private targetElement: ElementRef) {
    }

    ngAfterViewInit() {
		let that = this;

		that.hammer = new Hammer(that.targetElement.nativeElement, { touchAction: "auto" });
		that.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
		that.hammer.on(GesturesDirective.events.swipeUp, (ev) => {
			that.onGesture.emit(GesturesDirective.events.swipeUp);
		});
		that.hammer.on(GesturesDirective.events.swipeDown, (ev) => {
			that.onGesture.emit(GesturesDirective.events.swipeDown);
		});
		that.hammer.on(GesturesDirective.events.swipeLeft, (ev) => {
			that.onGesture.emit(GesturesDirective.events.swipeLeft);
		});
		that.hammer.on(GesturesDirective.events.swipeRight, (ev) => {
			that.onGesture.emit(GesturesDirective.events.swipeRight);
		});
		that.hammer.on(GesturesDirective.events.tap, (ev) => {
			that.onGesture.emit(GesturesDirective.events.tap);
		});
    }

	ngOnDestroy() {
		let that = this;

		that.hammer.destroy();
	}
}