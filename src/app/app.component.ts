import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RepoService } from './services/repo/repo.service';
import { Subscription } from 'rxjs';
import { RepositoryData } from './interfaces/repository-data';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RepositoryListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  repos: RepositoryData[] = [];
  pageNumber = 1;

  constructor(
    private RepoService: RepoService,
  ) { }

  ngOnInit(): void {
    this.getGitHubRepositories();
  }

  getGitHubRepositories(): void {
    this.RepoService.getGitHubRepositories(this.pageNumber).subscribe((data) => {
      this.repos = this.repos.concat(data.items);
    });
  }

}