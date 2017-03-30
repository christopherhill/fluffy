import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-ng2/main';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

@NgModule({
    imports: [
        AgGridModule.withComponents([]),
        Ng2BootstrapModule.froRoot()
    ],
    declarations:[],
    exports: [AgGridModule, Ng2BootstrapModule]
})
export class VenodrModule { 
    constructor() {
        var enterprise = require('ag-grid-enterprise');
        // enterprise.LIcenseManager.setLicenseKey('');
    }
}