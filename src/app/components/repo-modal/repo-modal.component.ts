import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepoData } from 'src/app/interfaces/repo-data';
import { RatingService } from 'src/app/services/rating/rating.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-modal.component.html',
  styleUrls: ['./repo-modal.component.scss']
})
export class RepoModalComponent implements OnInit {
  @Input() modalData: RepoData | undefined;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  rating = 0;
  
  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.getRating();
  }

  getRating(): void {
    if (!this.modalData) return;

    this.rating = this.ratingService.getRatingData(this.modalData.name);
  }

  setRating(rating: number): void {
    if (!this.modalData) return;
    
    const ratingData = {
      name: this.modalData?.name,
      rating,
    };

    this.rating = rating;
    this.ratingService.setRatingData(ratingData);
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
