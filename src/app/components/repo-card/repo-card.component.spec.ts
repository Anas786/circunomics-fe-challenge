import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCardComponent } from './repo-card.component';
import { DebugElement } from '@angular/core';
import { RepoData } from 'src/app/interfaces/repo-data';
import { By } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalServiceStub } from 'src/app/services/modal/modal.service.stub';
import { repositoryData } from 'src/app/utils/mock-test-data';

describe('RepoCardComponent', () => {
  let component: RepoCardComponent;
  let fixture: ComponentFixture<RepoCardComponent>;
  let debugElement: DebugElement;
  let modalService: ModalService;

  const getCardElement = () => debugElement.query(By.css('.card'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RepoCardComponent,
      ],
      providers: [
        { provide: ModalService, useClass: ModalServiceStub },
      ]
    });
    fixture = TestBed.createComponent(RepoCardComponent);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('and there is repository data', () => {
    let cardElement: DebugElement;
    let setModalDataSpy: jasmine.Spy<(data: RepoData) => void>;

    function clickOnHeader() {
      const headerElement = cardElement.query(By.css('.name-container')).nativeElement;
      headerElement.click();
    };

    beforeEach(() => {
      component.repository = repositoryData;
      setModalDataSpy = spyOn(modalService, 'setModalData');
      fixture.detectChanges();
      cardElement = getCardElement();
    });

    describe('and the header is clickable', () => {
      beforeEach(() => {
        component.headerClickable = true;
        fixture.detectChanges();
        clickOnHeader();
      });

      describe('ratings', () => {
        let ratings: number;
        let activeRatings: number;

        const getActiveRatingElems = () => cardElement.queryAll(By.css('.rating.active')).length;

        beforeEach(() => {
          ratings = cardElement.queryAll(By.css('.rating')).length;
        });

        it('should exist', () => {
          expect(ratings).toEqual(5);
        });

        describe('and the rating is 0', () => {
          beforeEach(() => {
            component.rating = 0;
            fixture.detectChanges();
            activeRatings = getActiveRatingElems();
          });

          it('should not have any active ratings', () => {
            expect(activeRatings).toEqual(0);
          });
        });
      })

      it('should call #openModal when clicked', () => {
        expect(setModalDataSpy).toHaveBeenCalledOnceWith(repositoryData);
      });
    });
  });
});
