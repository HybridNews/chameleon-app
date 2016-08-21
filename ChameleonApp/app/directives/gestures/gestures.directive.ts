import {Directive, ElementRef, AfterViewInit, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[gestures]'
})
export class GesturesDirective implements AfterViewInit {
	static events = {
		swipeRight: 'swiperight',
		swipeLeft: 'swipeleft',
		swipeUp: 'swipeup',
		swipeDown: 'swipedown',
		tap: 'tap'
	};

    @Output() onGesture = new EventEmitter();
    static hammerInitialized = false;
    constructor(private el: ElementRef) {

    }
    ngAfterViewInit() {
		let that = this;
        //if (!GesturesDirective.hammerInitialized) {

            let hammertime = new Hammer(that.el.nativeElement, { touchAction: "auto" });
            hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
            hammertime.on(GesturesDirective.events.swipeUp, (ev) => {
                that.onGesture.emit(GesturesDirective.events.swipeUp);
            });
            hammertime.on(GesturesDirective.events.swipeDown, (ev) => {
                that.onGesture.emit(GesturesDirective.events.swipeDown);
            });
            hammertime.on(GesturesDirective.events.swipeLeft, (ev) => {
                that.onGesture.emit(GesturesDirective.events.swipeLeft);
            });
            hammertime.on(GesturesDirective.events.swipeRight, (ev) => {
                that.onGesture.emit(GesturesDirective.events.swipeRight);
            });
            hammertime.on(GesturesDirective.events.tap, (ev) => {
                that.onGesture.emit(GesturesDirective.events.tap);
            });

            GesturesDirective.hammerInitialized = true;
        //}
    }
}