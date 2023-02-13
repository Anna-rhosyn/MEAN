import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../post.model";
import { PostService } from "../posts.serice";
import { ParamMap } from "@angular/router";
@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls:['./create.component.css']
})
export class PostCreateComponent implements OnInit{
  enteredContent='';
  enteredTitle='';
  post:Post;
  isLoading=false;
 private mode='create';
 private postId:string


 constructor(public postService:PostService,public route:ActivatedRoute){}

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap)=>{
   if(paramMap.has('postId')){
      this.mode='edit';
      this.postId=paramMap.get('postId');
      this.postService.getPost(this.postId).subscribe(postData=>{
        this.isLoading=false;
        this.post={id: postData._id, title: postData.title , content: postData.content};
      });
   }else{
    this.mode='create';
    this.postId=null;
   }
  });
}

onSavePost(form:NgForm){
  if(form.invalid){
    return;
  }
  this.isLoading=true;
  if(this.mode === 'create'){
    this.postService.addPost(form.value.title,form.value.content);
  }
  else{
    this.postService.updatePost(this.postId,form.value.title,form.value.content);
  }

form.resetForm();
}
}
