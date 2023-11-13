import { of } from 'rxjs';

export class RatingServiceStub {
    ratingDataChanged = of();
    getRatingData(): void { return; };
    setRatingData(): void { return; };
}
