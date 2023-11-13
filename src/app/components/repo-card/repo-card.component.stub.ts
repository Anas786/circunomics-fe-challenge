import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-repo-card',
    template: '',
})
export class RepoCardComponentStub {
    @Input() repository: any;
    @Input() headerClickable: any;
    @Input() rating: any;
}
