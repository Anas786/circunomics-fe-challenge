import { of } from "rxjs";

export class ModalServiceStub {
    modalData = of();
    setModalData(): void { return; };
}
