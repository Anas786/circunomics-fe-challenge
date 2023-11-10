import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RatingDataKV } from 'src/app/interfaces/rating-data';
import { RepoData } from 'src/app/interfaces/repo-data';
import { RatingService } from 'src/app/services/rating/rating.service';
import { RepoCardComponent } from '../repo-card/repo-card.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepoModalComponent } from '../repo-modal/repo-modal.component';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RepoCardComponent, RepoModalComponent],
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit, OnDestroy {
  @Input() repositories: RepoData[] = [];
  ratingData: RatingDataKV | undefined;
  ratingDataChangeSubscription: Subscription | undefined;

  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.ratingDataChangeSubscription = this.ratingService.ratingDataChanged.subscribe((data) => {
      this.ratingData = data;
    });
  }

  ngOnDestroy(): void {
    this.ratingDataChangeSubscription?.unsubscribe();
  }
}
