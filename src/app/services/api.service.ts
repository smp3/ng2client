import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { URLSearchParams, Response } from '@angular/http';
import { SettingsService } from './settings.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class APIService {

    private http: HttpClient;

    constructor(http: HttpClient, private settingsService: SettingsService) {
        this.http = http;
    }

    makeRequest(
        url, 
        method, 
        inData = {}, 
        useToken = true, 
        redirectOnForbidden = true, 
        contentType='application/x-www-form-urlencoded'): Observable<any> {

        url = this.settingsService.get('server') + '/' + url;

        let body = new URLSearchParams();

        var data = {};

        var stringData = '';

        for (let i in inData) {
           /*  if (typeof (inData[i]) === 'object' && inData[i] !== null) {
                if (inData[i]._id) {
                    data[i] = inData[i]._id;
                } else if (inData[i].length) {
                    for (let n = 0; n < inData[i].length; n++) {
                        let k = i + '[]';
                        stringData += '&' + k + '=' + inData[i][n];
                    }
                }
            } else { */
               
                    data[i] = inData[i];
                

                
           /*  } */

            body.set(i, data[i]);
        }



        let headers = {
            'Content-Type': contentType
        };



        if (useToken) {
            if (method == 'get') {
                body.set('token', this.settingsService.get('token'));
            } else {
                headers['Authorization'] = 'Bearer ' + this.settingsService.get('token');
            }
        }

        let options = {
            headers: headers
        };



        let req;

        method = method.toLowerCase();

        let strBody;    
    
        if(contentType=='application/json') {
            strBody = body.paramsMap;     
            console.log('strBody', strBody);
        } else {
            strBody = body.toString() + '&' + stringData;
        }
        

        
        switch (method) {
            default:
            case 'get':
                req = this.http.get(url + '?' + strBody);
                break;
            case 'post':
                req = this.http.post(url, strBody, options);
                break;
            case 'put':
                req = this.http.put(url, strBody, options);
                break;
            case 'patch':
                req = this.http.patch(url, strBody, options);
                break;
            case 'delete':
                req = this.http.delete(url + '?' + strBody, options);
                break;
        }

        return req
            .map((res: Response) => {
                return res;

            },

            (error: HttpErrorResponse) => {
                return error;
            })
            .catch((error: HttpErrorResponse) => {

                return Observable.throw(error);

            });
    }



}