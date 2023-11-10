import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RepoData } from 'src/app/interfaces/repo-data';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalDataSubject: Subject<RepoData> = new Subject();
  public modalData: Observable<RepoData> = this.modalDataSubject.asObservable();

  setModalData(data: RepoData): void {
    this.modalDataSubject.next(data);
  }
}
