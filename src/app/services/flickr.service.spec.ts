import { TestBed, async, inject } from '@angular/core/testing';

import { FlickrService } from './flickr.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient, HttpClientModule } from "@angular/common/http";

describe('FlickrService', () => {
  let flickrService: FlickrService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [FlickrService]
    });
    flickrService = TestBed.inject(FlickrService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const service: FlickrService = TestBed.get(FlickrService);
    expect(service).toBeTruthy();
  });

  it(`should fetch Flicker responses as an Observable`, async(inject([HttpTestingController, FlickrService],
    (httpMock: HttpTestingController, flickrService: FlickrService) => {

    // TODO
      const flickerResponses = [
        {
          "title": "Covid-19 United States \u25cf graphs",
          "link": "https:\/\/www.flickr.com\/photos\/eagle1effi\/50113627677\/",
          "media": {"m":"https:\/\/live.staticflickr.com\/65535\/50113627677_2fcde16fbd_m.jpg"},
          "date_taken": "2020-07-14T23:49:10-08:00",
          "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/eagle1effi\/\">eagle1effi<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/eagle1effi\/50113627677\/\" title=\"Covid-19 United States \u25cf graphs\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50113627677_2fcde16fbd_m.jpg\" width=\"156\" height=\"240\" alt=\"Covid-19 United States \u25cf graphs\" \/><\/a><\/p> <p>CDC-Chef - Acht Wochen Maske und Ausbruch ist unter Kontrolle<br \/> <br \/> Die USA k\u00f6nnten einem f\u00fchrenden Mediziner zufolge den Ausbruch in vier bis acht Wochen unter Kontrolle bringen \u2013 \u201ewenn wir alle dazu bringen k\u00f6nnten, jetzt Masken zu tragen\u201c, wie der Direktor der Seuchenzentren CDC, Robert Redfield, bei einer Veranstaltung des Journal of the American Medical Association erkl\u00e4rt. Dann k\u00f6nnte die Kontrolle in \u201evier, sechs, acht Wochen\u201c erlangt sein<\/p>",
          "published": "2020-07-14T21:49:16Z",
          "author": "nobody@flickr.com (\"eagle1effi\")",
          "author_id": "40036489@N00",
          "tags": "usa covid19 stats graphs daten masks rules"

        },
        {
          "title": "Which Fabric Makes for the Best Face Mask?",
          "link": "https:\/\/www.flickr.com\/photos\/189304670@N03\/50111725486\/",
          "media": {"m":"https:\/\/live.staticflickr.com\/65535\/50111725486_fd7c395603_m.jpg"},
          "date_taken": "2020-07-14T06:14:47-08:00",
          "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/189304670@N03\/\">cottonmaskssupplier<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/189304670@N03\/50111725486\/\" title=\"Which Fabric Makes for the Best Face Mask?\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50111725486_fd7c395603_m.jpg\" width=\"240\" height=\"142\" alt=\"Which Fabric Makes for the Best Face Mask?\" \/><\/a><\/p> <p>As we enter yet another month of pandemic, it seems like the endless stream of info regarding the novel Coronavirus enclosing our planet in a global pandemic is still varying regularly.<br \/> <br \/> Read more at <a href=\"https:\/\/bit.ly\/2DzJeoN\" rel=\"noreferrer nofollow\">bit.ly\/2DzJeoN<\/a><\/p>",
          "published": "2020-07-14T13:15:13Z",
          "author": "nobody@flickr.com (\"cottonmaskssupplier\")",
          "author_id": "189304670@N03",
          "tags": "custom printed face masks"
        },
        {
          "title": "Get Your Hands On The Latest Custom Printed Medical Masks From None Other Than Cotton Masks!",
          "link": "https:\/\/www.flickr.com\/photos\/189304670@N03\/50111140993\/",
          "media": {"m":"https:\/\/live.staticflickr.com\/65535\/50111140993_91babf11a5_m.jpg"},
          "date_taken": "2020-07-14T06:10:40-08:00",
          "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/189304670@N03\/\">cottonmaskssupplier<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/189304670@N03\/50111140993\/\" title=\"Get Your Hands On The Latest Custom Printed Medical Masks From None Other Than Cotton Masks!\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50111140993_91babf11a5_m.jpg\" width=\"240\" height=\"171\" alt=\"Get Your Hands On The Latest Custom Printed Medical Masks From None Other Than Cotton Masks!\" \/><\/a><\/p> <p>Are you one the lookout of a reliable manufacturer to source your bulk need for custom printed medical masks? Look no further, as Cotton Masks is bringing to you an absolute fresh batch of medical masks customized under a team of extremely talented designers.<br \/> <br \/> Click now at <a href=\"https:\/\/bit.ly\/2ZrsUze\" rel=\"noreferrer nofollow\">bit.ly\/2ZrsUze<\/a><\/p>",
          "published": "2020-07-14T13:11:06Z",
          "author": "nobody@flickr.com (\"cottonmaskssupplier\")",
          "author_id": "189304670@N03",
          "tags": "custom printed masks usa"
        },
      ];


      flickrService.fetchImage('')
        .subscribe((items: any) => {
          expect(items.length).toBe(3);
        });

      let req = httpMock.expectOne('https://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK&tags=&JSONP_CALLBACK=JSONP_CALLBACK');
      expect(req.request.method).toBe("JSONP");
      expect(req.request.responseType).toBe("json");

      req.flush(flickerResponses);
      httpMock.verify();

    })));
});
