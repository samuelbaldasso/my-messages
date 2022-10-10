import { PostsService } from './../posts.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  constructor(public service: PostsService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    this.service.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
