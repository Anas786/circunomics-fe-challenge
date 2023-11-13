import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoModalComponent } from './repo-modal.component';
import { RepoCardComponentStub } from '../repo-card/repo-card.component.stub';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RatingService } from 'src/app/services/rating/rating.service';
import { RatingServiceStub } from 'src/app/services/rating/rating.service.stub';
import { RepoData } from 'src/app/interfaces/repo-data';

describe('RepoModalComponent', () => {
  let component: RepoModalComponent;
  let fixture: ComponentFixture<RepoModalComponent>;
  let debugElement: DebugElement;
  let ratingService: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RepoModalComponent,
      ],
      declarations: [RepoCardComponentStub],
      providers: [
        { provide: RatingService, useClass: RatingServiceStub },
      ]
    });
    fixture = TestBed.createComponent(RepoModalComponent);
    ratingService = TestBed.inject(RatingService);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let getRatingSpy: jasmine.Spy;

    beforeEach(() => {
      getRatingSpy = spyOn(component, 'getRating');
      component.ngOnInit();
    });

    it('should call getRating method', () => {
      expect(getRatingSpy).toHaveBeenCalledOnceWith();
    });
  });

  describe('getRating method', () => {
    let getRatingDataSpy: jasmine.Spy<(name: string) => number>
    const data = {
      name: 'example name',
    } as RepoData;

    beforeEach(() => {
      component.modalData = data;
      getRatingDataSpy = spyOn(ratingService, 'getRatingData');
      component.getRating();
    });

    it('should call getRatingData method', () => {
      expect(getRatingDataSpy).toHaveBeenCalledOnceWith(data.name);
    });
  });

});
