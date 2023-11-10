import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepoDataResponse } from '../../interfaces/repo-data';
import { DateService } from '../date/date.service';
import { apiURL } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  constructor(
    private httpClient: HttpClient,
    private dateService: DateService,
  ) { }

  getGitHubRepos(pageNum: number): Observable<RepoDataResponse> {
    const formatedDate = this.dateService.getPreviousMonthDate();

    let params = new HttpParams()
      .set('q', `created:>${formatedDate}`)
      .set('sort', 'stars')
      .set('order', 'desc');
      
    if (pageNum > 1) {
      params = params.set('page', pageNum.toString());
    }

    return this.httpClient.get<RepoDataResponse>(`${apiURL}search/repositories`, { params });
  }
}
