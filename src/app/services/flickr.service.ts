import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { FlickerResponse } from "../models/flickr-response";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private apiUrl = "https://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK";

  constructor(private http: HttpClient) { }

  fetchImage(searchKeyword: string): Observable<FlickerResponse> {

    const encodedTag = encodeURIComponent(searchKeyword);
    const url = `${this.apiUrl}&tags=${encodedTag}`;

    return this.http.jsonp<FlickerResponse>(url, 'JSONP_CALLBACK')
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something happened; please try again later.');

  }
}
