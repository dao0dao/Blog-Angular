import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Post } from 'src/app/shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  id: string = ''
  editPostForm: FormGroup
  disbleSubmit: boolean = false
  updateSubscription: Subscription
  timeout: number

  get title() {
    return this.editPostForm.get('title')
  }

  get text() {
    return this.editPostForm.get('text')
  }

  applyChanges() {
    this.disbleSubmit = true;
    this.updateSubscription = this.postService.patchPost(this.id, this.editPostForm.value).subscribe(
      () => {
        this.alertService.info('Post zmodyfikowano')
        this.timeout = setTimeout(() => {
          this.router.navigate(['/post', this.id])
        }, 5000)
      },
      (err) => {
        this.disbleSubmit = false
        throw (err)
      }
    )
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.editPostForm = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      date: [''],
      author: ['']
    });
    this.route.params.subscribe((params: Params) => this.id = params.id);
    this.postService.fetchPostById(this.id).subscribe((post: Post) => {
      this.title.setValue(post.title);
      this.text.setValue(post.text);
      this.editPostForm.get('date').setValue(post.date);
      this.editPostForm.get('author').setValue(post.author);
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }
}
