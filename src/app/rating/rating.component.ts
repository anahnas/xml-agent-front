import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { Comment } from '../model/comment';
import { faCar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RatingService } from './rating.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Rating} from '../model/rating';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  rating: Rating;
  currentRate = 0;
  commentForm: FormGroup;
  // ratings: Rating [];
  comments: Comment [];

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  selectedId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.comments = [];
    this.rating = new Rating();
    this.rating.rating = 0.0;

    this.activeRoute.params.subscribe((params) => {
      this.selectedId = params.id;
      this.ratingService.getRatings(this.selectedId)
      .subscribe( data => {
        for (const rating of data) {
          const comment = new Comment();
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
    this.rating.comment = formData.description;
    this.rating.userDTO.username = formData.author;
    console.log(this.rating);

    this.activeRoute.params.subscribe((params) => {
      this.selectedId = params.id;
      this.rating.carDTO.id = this.selectedId;
      this.ratingService.postRating(this.selectedId, this.rating)
        .subscribe( data => {
          this.comments.push(formData);
        }, error => {
          alert('Username does not exist.');
          return;
        });
      this.router.navigate(['ads/' + this.selectedId]);
    });

  }

  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}) {
    this.rating.rating = $event.newValue;
  }
}
