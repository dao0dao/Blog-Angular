import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../shared/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  id: string = ''
  post: Post
  postSub: Subscription

  constructor(private postService: PostService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => this.id = params.id,
      (err) => { throw (err) }
    );
    this.postService.fetchPostById(this.id).subscribe(
      (post: Post) => { this.post = post },
      (err) => { throw (err) }
    )
  }
  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe()
    }
  }
}
