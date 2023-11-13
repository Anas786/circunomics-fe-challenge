import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RepoData } from 'src/app/interfaces/repo-data';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent {
  @Input() repository: RepoData | undefined;
  @Input() headerClickable = true;
  @Input() rating = 0;
  private modalService = inject(ModalService);

  openModal(data: RepoData) {
    this.modalService.setModalData(data);
  }
}
