import { Observable, of } from 'rxjs';

export class RepoServiceStub {
    getGitHubRepos(): Observable<any> { return of() };
}
