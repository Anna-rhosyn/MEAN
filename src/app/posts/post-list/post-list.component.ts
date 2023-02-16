import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

import { Post } from "../post.model";
import { PostsService } from "../posts.serice";

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
  totalposts=0;
  postperpage=2;
  currentPage=1;
  pageoptions=[1,2,5,10];
  userIsAuthenticated=false;
  userId:string;
  private postsSub:Subscription;
  private authStatusSub:Subscription;

 constructor(public postsService:PostsService,private authService:AuthService ){}

 ngOnInit(){
  this.isLoading=true;
   this.postsService.getPosts(this.postperpage,this.currentPage);
   this.userId=this.authService.getUserId();
   this.postsSub= this.postsService.getPostUpdateListener()
   .subscribe((postData:{posts: Post[], postCount:number})=>{
    this.isLoading=false;
    this.totalposts=postData.postCount;
     this.posts=postData.posts;
   });
   this.userIsAuthenticated=this.authService.getIsAuth();
     this.authStatusSub= this.authService.getAuthStatusListener()
     .subscribe(isAuthenticated=>{
       this.userIsAuthenticated= isAuthenticated;
       this.userId=this.authService.getUserId();
     });
 }

 onChangedPage(pageData: PageEvent){
  this.isLoading=true;
  this.currentPage=pageData.pageIndex + 1;
  this.postperpage=pageData.pageSize;
  this.postsService.getPosts(this.postperpage,this.currentPage)

 }

 onDelete(postId:string){
  this.isLoading=true;
    this.postsService.deletePost(postId).subscribe(()=>{
    this.postsService.getPosts(this.postperpage,this.currentPage);
     });
 }

   ngOnDestroy() {
     this.postsSub.unsubscribe();
     this.authStatusSub.unsubscribe();
   }
}
