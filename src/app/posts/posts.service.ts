import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) { }

  getPosts(){
    this.http.get<{messages: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((data) => {
      this.posts = data.posts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPostsListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{messages: string}>('http://localhost:3000/api/posts', post).subscribe((data) => {
      console.log(data.messages);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
}
}
