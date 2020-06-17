import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { Comment } from '../model/comment';
import { faCar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RatingService } from './rating.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  commentForm: FormGroup;

  //ratings: Rating [];
  comments: Comment [];
  
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  selectedId:string;

  constructor(private formBuilder: FormBuilder, private activeRouter: ActivatedRoute, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.comments = [];
 
    this.activeRouter.params.subscribe((params) => {
      this.selectedId = params['id'];
      this.ratingService.getRatings(this.selectedId)
      .subscribe( data => {
        for(let rating of data){
          let comment = new Comment();
          comment.author = rating.userDTO.username;
          comment.description = rating.comment;
          this.comments.push(comment);
        }
      });
    });

    this.commentForm = this.formBuilder.group({
      author: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  addComments() {
    const formData = this.commentForm.value;
    /*this.ratingService.addComments(formData)
    .subscribe(data => {
      this.comments.push(this.commentForm.value);
    });
   this.router.navigate(['ads/'+this.selectedId]);*/
  }
}
