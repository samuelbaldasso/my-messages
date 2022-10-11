import { PostsService } from './../posts/posts.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../posts/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSub: Subscription;
  constructor(public service: PostsService) { }

  ngOnInit(): void {
    this.service.getPosts();
    this.postsSub = this.service.getPostsListener().subscribe((data: Post[]) => {
      this.posts = data;
    });

  }

  onDelete(postId: string){
    this.service.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
