import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';
import Rxmq from 'rxmq';
import { ENV } from './api.config';

const _ = require('loadsh');

@Injectable()
export class CustomHttp extends Http {

  channel: any;
  baseUrl: string = '';

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions
  ) {
    super(backend, defaultOptions);
    this.channel = Rxmq.channel('http');
    this.setEnvironment(ENV);
  }

  setEnvironment(environment): void {
    this.baseUrl = this.baseUrl || environment.serverUrl;
  }

  setHeaders(options: RequestOptionsArgs) {
    const defaultHeaders: Headers = new Headers({ 'Content-Type' : 'application/json' });
    const defaultOptions: RequestOptionsArgs = { headers: defaultHeaders };
    if (!options) return defaultOptions;
    _.defaultsDeep(options, defaultOptions);
    return options;
  }


  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setHeaders(options);
    this.channel.subject('request').next({ progress: true });
    return super.get(this.baseUrl + url, options)
      .map(res => res.json())
      .do(() => { this.channel.subject('request').next({ progress: false }); })
      .catch(res => {
          const ERROR_MESSAGE = res.json().error || DEFAULT_ERROR_MESSAGE;
          this.channel.subject('error').next({ message: ERROR_MESSAGE });
          this.channel.subject('request').next({ progress: false });
          return Observable.throw(ERROR_MESSAGE);
    });
  };

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setHeaders(options);
    this.channel.subject('request').next({ progress: true });
    return super.post(this.baseUrl + url, body, options)
      .map(res => res.json())
      .do(() => { this.channel.subject('request').next({ progress: false }); })
      .catch(res => {
          const ERROR_MESSAGE = res.json().error || DEFAULT_ERROR_MESSAGE;
          this.channel.subject('error').next({ message: ERROR_MESSAGE });
          this.channel.subject('request').next({ progress: false });
          return Observable.throw(ERROR_MESSAGE);
    });
  };

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setHeaders(options);
    this.channel.subject('request').next({ progress: true });
    return super.post(this.baseUrl + url, body, options)
      .map(res => res.json())
      .do(() => { this.channel.subject('request').next({ progress: false }); })
      .catch(res => {
          const ERROR_MESSAGE = res.json().error || DEFAULT_ERROR_MESSAGE;
          this.channel.subject('error').next({ message: ERROR_MESSAGE });
          this.channel.subject('request').next({ progress: false });
          return Observable.throw(ERROR_MESSAGE);
    });
  };

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {  
    options = this.setHeaders(options);
    this.channel.subject('request').next({ progress: true });
    return super.post(this.baseUrl + url, body, options)
      .map(res => res.json())
      .do(() => { this.channel.subject('request').next({ progress: false }); })
      .catch(res => {
          const ERROR_MESSAGE = res.json().error || DEFAULT_ERROR_MESSAGE;
          this.channel.subject('error').next({ message: ERROR_MESSAGE });
          this.channel.subject('request').next({ progress: false });
          return Observable.throw(ERROR_MESSAGE);
    });
  };

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setHeaders(options);
    this.channel.subject('request').next({ progress: true });
    return super.post(this.baseUrl + url, body, options)
      .map(res => res.json())
      .do(() => { this.channel.subject('request').next({ progress: false }); })
      .catch(res => {
          const ERROR_MESSAGE = res.json().error || DEFAULT_ERROR_MESSAGE;
          this.channel.subject('error').next({ message: ERROR_MESSAGE });
          this.channel.subject('request').next({ progress: false });
          return Observable.throw(ERROR_MESSAGE);
    });
  };
}
