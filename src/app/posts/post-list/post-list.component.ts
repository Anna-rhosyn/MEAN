import { Component, OnDestroy, OnInit } from "@angular/core";
// import { tick } from "@angular/core/testing";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostService } from "../posts.serice";

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy{
  // posts=[
  //   {title:'First Post',content:"This is th efirst post content"},
  //   {title:'First Post',content:"This is th efirst post content"},
  //   {title:'First Post',content:"This is th efirst post content"}
  // ]
  posts:Post[]=[];
  isLoading=false;
  private postsSub:Subscription;


 constructor(public postsService:PostService){}

 ngOnInit(){
  this.isLoading=true;
   this.postsService.getPosts();
   this.postsSub= this.postsService.getPostUpdateListener()
   .subscribe((posts:Post[])=>{
    this.isLoading=false;
     this.posts=posts;
   });
 }

 onDelete(postId:string){
     this.postsService.deletePost(postId);
 }

   ngOnDestroy() {
     this.postsSub.unsubscribe();
   }
}
