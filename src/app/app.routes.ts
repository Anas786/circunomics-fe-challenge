import { Routes } from '@angular/router';
import { RepoListComponent } from './components/repo-list/repo-list.component';

export const routes: Routes = [
    {
        path: 'home',
        component: RepoListComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }

];
