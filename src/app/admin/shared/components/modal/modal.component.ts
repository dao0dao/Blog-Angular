import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modalService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  open: boolean = false
  title: string = ''
  modalSub: Subscription

  constructor(public modalService: ModalService) { }

  ngOnInit() {
    this.modalSub = this.modalService.modal$.subscribe(
      (modal) => { this.open = modal.open; this.title = modal.title }
    )
  }
  ngOnDestroy() {
    if (this.modalSub) {
      this.modalSub.unsubscribe()
    }
  }
}
