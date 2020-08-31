import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../shared/services/alert.service';
import { ModalService } from '../shared/services/modalService';

@Component({
  selector: 'app-dashboar-page',
  templateUrl: './dashboar-page.component.html',
  styleUrls: ['./dashboar-page.component.scss']
})
export class DashboarPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  postSubscription: Subscription
  search: string = ''
  emptyBase: boolean = false
  modalSub: Subscription

  deletePost(id: string) {
    let title: string;
    this.posts.filter(post => { if (post.id === id) { title = post.title } })
    this.modalService.openModal(title)
    this.modalSub = this.modalService.modal$.subscribe((modal) => {
      if (modal.delete) {
        this.postService.deletePost(id).subscribe(
          () => {
            this.alertService.warning('Post usunięto')
            this.posts = this.posts.filter(post => post.id !== id)
            this.modalSub.unsubscribe()
          }
        )
      }
    })
  }

  constructor(
    private postService: PostService,
    private alertService: AlertService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.postSubscription = this.postService.fetchPosts().subscribe(
      (res) => {
        setTimeout(() => {
          if (res) {
            this.emptyBase = false
            this.posts = res
          } else {
            this.emptyBase = true
          }
        }, 2000)
      }
    )
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe()
  }

}
