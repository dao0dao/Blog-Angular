import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  postForm: FormGroup
  newPost: Post
  disableSubmit: boolean = false

  addPost() {
    event.preventDefault();
    this.disableSubmit = true
    this.newPost = {
      title: this.title.value,
      text: this.text.value,
      author: this.author.value,
      date: new Date()
    }
    this.postService.create(this.newPost).subscribe(
      () => {
        this.alertService.success('Utworzono post')
        this.postForm.reset();
        this.disableSubmit = false
      },
      () => {
        this.disableSubmit = false
      }
    )
  }

  get title() {
    return this.postForm.get('title')
  }
  get text() {
    return this.postForm.get('text')
  }
  get author() {
    return this.postForm.get('author')
  }

  constructor(private fb: FormBuilder, private postService: PostService, private alertService: AlertService) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      author: ['', Validators.required]
    })
  }

}
