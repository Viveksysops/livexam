import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../_config/config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: string = config.baseUrl;
  headers: HttpHeaders;
  
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = config.baseUrl;
    this.headers = new HttpHeaders();
  }

  /**
   * for using get method.
   * @param url : url where requei
   * @param params
   */
  get(url: string, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.get(apiUrl, {
      headers: this.headers
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params 
   */
  put(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.put(apiUrl, data, {
      headers: this.headers
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params 
   */
  post(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data, {
      headers: this.headers
    });
  }

  /**
   * delete method does not have any body part
   * passes object id as parameter
   * also passes token in header part
   * @param url : url where request will be send
   */
  delete(url: string) {
    const apiUrl = `${this.baseUrl}${url}`;
    return this.http.delete(apiUrl, {
      headers: this.headers
    });
  }

  /**
   * Helper Method that will generate the queryString.
   * @param params Object to be converted into URLSearchParam.
   */
  generateQueryString(params?: object): string {
    let queryString = '',
      httpParam = new URLSearchParams();
    Object.keys(params || {}).forEach(key => httpParam.set(key, params[key]));
    queryString = httpParam.toString() ? `?${httpParam.toString()}` : '';
    return queryString;
  }

  /**
   * Helper method to call the GET api for any url.
   * @param url string url that needs to be called.
   */
  simpleGet(url: string) {
    return this.http.get(url);
  }

  /**
   * Helper method to call the POST api for any url.
   * @param url string url that needs to be called.
   * @param data Object data that needs to be passed with API.
   */
  simplePost(url: string, data: any) {
    return this.http.post(url, data);
  }
}
