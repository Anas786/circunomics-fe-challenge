import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './services/modal/modal.service';
import { RepoService } from './services/repo/repo.service';
import { Subscription } from 'rxjs';
import { RepoData } from './interfaces/repo-data';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { RepoModalComponent } from './components/repo-modal/repo-modal.component';
import { RepoCardComponent } from './components/repo-card/repo-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RepoListComponent, RepoModalComponent, RepoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, OnDestroy {

  showModal = false;
  modalData: RepoData | undefined;
  modalDataSubscription: Subscription | undefined;
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.modalDataSubscription = this.modalService.modalData.subscribe((data) => {
      this.showModal = true;
      this.modalData = data;
    });
  }

  ngOnDestroy(): void {
    this.modalDataSubscription?.unsubscribe();
  }

  onCloseModal(): void {
    this.showModal = false;
  }
}