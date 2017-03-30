'use strict';

import { NgModule } from '@angular/core';
import { HttpModule, XHRBackend, Http, ConnectionBackend } from '@angular/http';
import { CustomHttp } from './api-http.service';

@NgModule({
    imports: [
      HttpModule
    ],
    providers: [
      { provide: CustomHttp, useClass: CustomHttp },
      { provide: ConnectionBackend, useExisting: XHRBackend }
    ]
})

export class APIModule {};
