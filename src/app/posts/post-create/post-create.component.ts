import { PostsService } from './../posts.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  mode = 'create';
  postId: string;
  post: Post;
  constructor(public service: PostsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      if(param.has('postId')){
        this.mode = 'edit';
        this.postId = param.get('postId');
        this.service.getPostById(this.postId).subscribe(data => {
          this.post = {id: data._id, title: data.title, content: data.content};
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode === 'create'){
      this.service.addPost(form.value.title, form.value.content);
    }else {
      this.service.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
    this.router.navigateByUrl('/');
  }

}
