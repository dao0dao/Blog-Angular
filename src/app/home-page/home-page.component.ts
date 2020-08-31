import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts: Post[]
  postSub: Subscription

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.posts = posts
      }
    )
  }
  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe()
    }
  }
}
