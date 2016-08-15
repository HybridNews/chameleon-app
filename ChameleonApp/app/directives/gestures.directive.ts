/// <reference path="../../typings/hammerjs/hammerjs.d.ts" />
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
        if (!GesturesDirective.hammerInitialized) {

            let hammertime = new Hammer(that.el.nativeElement);
            hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
            hammertime.on(GesturesDirective.events.swipeUp, (ev) => {
                this.onGesture.emit(GesturesDirective.events.swipeUp);
            });
            hammertime.on(GesturesDirective.events.swipeDown, (ev) => {
                this.onGesture.emit(GesturesDirective.events.swipeDown);
            });
            hammertime.on(GesturesDirective.events.swipeLeft, (ev) => {
                this.onGesture.emit(GesturesDirective.events.swipeLeft);
            });
            hammertime.on(GesturesDirective.events.swipeRight, (ev) => {
                this.onGesture.emit(GesturesDirective.events.swipeRight);
            });
            hammertime.on(GesturesDirective.events.tap, (ev) => {
                this.onGesture.emit(GesturesDirective.events.tap);
            });

            GesturesDirective.hammerInitialized = true;
        }
    }
}