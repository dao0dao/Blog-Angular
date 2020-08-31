import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

interface Modal {
    open: boolean,
    title: string,
    delete?: boolean
}

@Injectable()

export class ModalService {

    modal$ = new Subject<Modal>()


    openModal(title: string) {
        this.modal$.next({ open: true, title })
    }

    closeModal() {
        this.modal$.next({ open: false, title: null })
    }

    delete() {
        this.modal$.next({
            open: false,
            title: null,
            delete: true
        })
    }
}