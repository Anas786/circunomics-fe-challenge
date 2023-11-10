import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RatingData, RatingDataKV } from 'src/app/interfaces/rating-data';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratingData: RatingDataKV = {};
  private ratingDataSubject: Subject<RatingDataKV> = new Subject();
  public ratingDataChanged: Observable<RatingDataKV> = this.ratingDataSubject.asObservable();

  getRatingData(name: string): number {
    return this.ratingData[name] ?? 0;
  }

  setRatingData(data: RatingData): void {
    this.ratingData[data.name] = data.rating;
    this.ratingDataSubject.next(this.ratingData);
  }
}
