import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlickrService } from "../services/flickr.service";
import { FlickerResponse } from "../models/flickr-response";
import { EMPTY, fromEvent, Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  keywords: string;
  flickerResponse: FlickerResponse;

  term$ = new Subject<string>();
  private searchSubscription: Subscription;

  constructor(private flickrService: FlickrService) {
    // delay API request, less frequent
    this.searchSubscription = this.term$.pipe(
      map((event: any) => event.target.value),
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(_ => {
        this.search();
        return EMPTY;
      })
    ).subscribe();
  }

  ngOnInit() {
    this.flickrService.fetchImage('')
      .subscribe(response => {
          this.flickerResponse = response;
        },
        error => {
          console.log(error);
        })
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.searchSubscription = null;
    }
  }

  search() {
    // console.log("keywords: %s", this.keywords);
    this.flickrService.fetchImage(this.keywords)
      .subscribe(response => {
          this.flickerResponse = response;
        },
        error => {
          console.log(error);
        })
  }
}
