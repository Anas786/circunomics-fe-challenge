import { Component, HostListener, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RatingDataKV } from 'src/app/interfaces/rating-data';
import { RepoData } from 'src/app/interfaces/repo-data';
import { RatingService } from 'src/app/services/rating/rating.service';
import { RepoCardComponent } from '../repo-card/repo-card.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepoModalComponent } from '../repo-modal/repo-modal.component';
import { RepoService } from 'src/app/services/repo/repo.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RepoCardComponent, RepoModalComponent],
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit, OnDestroy {
  @Input() repositories: RepoData[] = [];
  ratingData: RatingDataKV | undefined;
  ratingDataChangeSubscription: Subscription | undefined;
  
  repos: RepoData[] = [];
  pageNumber = 1;
  currentCount = 0;
  totalCount = 0;
  isLoading = false;

  showModal = false;
  modalData: RepoData | undefined;
  modalDataSubscription: Subscription | undefined;
  private ratingService = inject(RatingService);
  private repoService = inject(RepoService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.ratingDataChangeSubscription = this.ratingService.ratingDataChanged.subscribe((data) => {
      this.ratingData = data;
    });

    this.modalDataSubscription = this.modalService.modalData.subscribe((data) => {
      this.showModal = true;
      this.modalData = data;
    });

    this.getGitHubRepos();
  }

  onCloseModal(): void {
    this.showModal = false;
  }

  getGitHubRepos(): void {
    this.isLoading = true;

    this.repoService.getGitHubRepos(this.pageNumber).subscribe((data) => {
      this.repos = this.repos.concat(data.items);
      this.currentCount = this.repos.length;
      this.totalCount = data.total_count;
      this.isLoading = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const threshold = 500;
    let currentScrollPosition = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let maximumScrollPosition = document.documentElement.scrollHeight;

    if (currentScrollPosition >= maximumScrollPosition - threshold && !this.isLoading) {
      this.pageNumber++;
      this.getGitHubRepos();
    }
  }

  ngOnDestroy(): void {
    this.ratingDataChangeSubscription?.unsubscribe();
    this.modalDataSubscription?.unsubscribe();
  }
}
