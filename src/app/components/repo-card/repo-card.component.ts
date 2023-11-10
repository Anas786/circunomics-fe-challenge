import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RepositoryData } from 'src/app/interfaces/repository-data';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent {
  @Input() repository: RepositoryData | undefined;
  @Input() headerClickable = true;
  @Input() rating = 0;

  constructor() { }
}
