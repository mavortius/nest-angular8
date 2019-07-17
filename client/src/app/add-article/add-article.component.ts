import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleErrorStateMatcher } from '../article-error-state-matcher';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;
  title = '';
  author = '';
  description = '';
  content = '';
  isLoadingResults = false;
  matcher = new ArticleErrorStateMatcher();

  constructor(private router: Router,
              private api: ApiService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      description: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addArticle(this.articleForm.value)
      .subscribe(response => {
        const id = response._id;
        this.isLoadingResults = false;
        this.router.navigate(['/show-article', id]);
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
