import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './services/modal/modal.service';
import { RepoService } from './services/repo/repo.service';
import { Subscription } from 'rxjs';
import { RepoData } from './interfaces/repo-data';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { RepoModalComponent } from './components/repo-modal/repo-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RepoListComponent, RepoModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  repos: RepoData[] = [];
  pageNumber = 1;
  currentCount = 0;
  totalCount = 0;
  isLoading = false;

  showModal = false;
  modalData: RepoData | undefined;
  modalDataSubscription: Subscription | undefined;

  constructor(
    private repoService: RepoService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.modalDataSubscription = this.modalService.modalData.subscribe((data) => {
      this.showModal = true;
      this.modalData = data;
    });

    this.getGitHubRepos();
  }

  ngOnDestroy(): void {
    this.modalDataSubscription?.unsubscribe();
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
    let currentScrollPosition = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let maximumScrollPosition = document.documentElement.scrollHeight;

    if (currentScrollPosition >= maximumScrollPosition) {
      this.pageNumber++;
      this.getGitHubRepos();
    }
  }
}