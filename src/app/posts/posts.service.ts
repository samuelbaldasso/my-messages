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

  getPostById(id: string){
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(id: string, title: string, content: string){
    const post = {id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe(data => {
      console.log(data);
      const updatedPosts = [...this.posts];
      const oldIndex = updatedPosts.findIndex(post => post.id === post.id);
      updatedPosts[oldIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId)
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
