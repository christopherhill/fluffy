import Rxmq from 'rxmq';
import { Component, Input, Injectable } from '@angular/core';

const DEFAULT_ERROR_MESSAGE = 'Default Error Message';

@Component({
    selector: 'error-handler',
    styles: [require('./error-handler.sass').toString()],
    template: require('./error-handler.html')
})
export class ErrorHandlerComponent {
    @Input() error: {};
    @Input() visible: boolean = false;
    @Input() message: string = '';
    @Input() isError: boolean = false;
    constructor() {}

    ngOnInit() {
        Rxmq.channel('http').observe('error').subscribe((data) => {
            this.isError = true;
            this.visible = true;
            this.message = data.message || DEFAULT_ERROR_MESSAGE;
        });

        Rxmq.channel('notification').observe('confirmation').subscribe((data) => {
            this.isError = false;
            this.visible = true;
            this.message = data.message || DEFAULT_ERROR_MESSAGE;
        });

    }

    public close() { this.visible = false; }
    
}