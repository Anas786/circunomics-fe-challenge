import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-repo-modal',
    template: '',
})
export class RepoModalComponentStub {
    @Input() modalData: any;
    @Output() closeModal: EventEmitter<void> = new EventEmitter();
}
