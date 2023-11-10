import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RepositoryData } from 'src/app/interfaces/repository-data';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
  @Input() repositories: RepositoryData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
