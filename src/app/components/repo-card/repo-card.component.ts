import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RepoData } from 'src/app/interfaces/repo-data';
import { ModalService } from 'src/app/services/modal/modal.service';
import { RepoModalComponent } from '../repo-modal/repo-modal.component';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RepoModalComponent],
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent {
  @Input() repository: RepoData | undefined;
  @Input() headerClickable = true;
  @Input() rating = 0;

  constructor(private modalService: ModalService) { }

  openModal(data: RepoData) {
    this.modalService.setModalData(data);
  }
}
