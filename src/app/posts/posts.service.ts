import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ messages: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map(data => {
        return data.posts.map(post => {
          return {
            title: post.title,
            id: post._id,
            content: post.content
          }
        })
      }))
      .subscribe((transformPosts) => {
        this.posts = transformPosts;
        this.postsUpdated.next([...this.posts]);
      })
  }

  getPostsListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ messages: string, postId: string }>('http://localhost:3000/api/posts', post).subscribe((data) => {
      const id = data.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId)
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
