import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoListComponent } from './repo-list.component';
import { DebugElement } from '@angular/core';
import { RepoData } from 'src/app/interfaces/repo-data';
import { By } from '@angular/platform-browser';
import { RepoCardComponentStub } from '../repo-card/repo-card.component.stub';
import { RatingService } from 'src/app/services/rating/rating.service';
import { RatingServiceStub } from 'src/app/services/rating/rating.service.stub';
import { Subject } from 'rxjs';
import { RatingDataKV } from 'src/app/interfaces/rating-data';

describe('RepositoryListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let debugElement: DebugElement;
  let ratingService: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RepoListComponent,
        
      ],
      declarations: [RepoCardComponentStub],
      providers: [
        { provide: RatingService, useClass: RatingServiceStub },
      ]
    });
    fixture = TestBed.createComponent(RepoListComponent);
    ratingService = TestBed.inject(RatingService);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let ratingDataSubject: Subject<RatingDataKV>;
    const ratingDataCollection = {
      example: 6,
    };

    beforeEach(() => {
      ratingDataSubject = new Subject();
      ratingService.ratingDataChanged = ratingDataSubject.asObservable();
      component.ngOnInit();
      ratingDataSubject.next(ratingDataCollection);
    });

    it('should set the ratingData when ratingDataChanged emits', () => {
      expect(component.ratingData).toEqual(ratingDataCollection);
    });
  });
});
