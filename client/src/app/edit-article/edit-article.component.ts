import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleErrorStateMatcher } from '../article-error-state-matcher';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  _id = '';
  title = '';
  author = '';
  description = '';
  content = '';
  isLoadingResults = false;
  matcher = new ArticleErrorStateMatcher();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private api: ApiService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getArticle(this.route.snapshot.params.id);
    this.articleForm = this.fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      description: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  getArticle(id: any) {
    this.api.getArticle(id)
      .subscribe(data => {
        this._id = data._id;
        this.articleForm.setValue({
          title: data.title,
          author: data.author,
          description: data.description,
          content: data.content,
        });
      });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateArticle(this._id, this.articleForm.value)
      .subscribe(response => {
        const id = response._id;
        this.isLoadingResults = false;
        this.router.navigate(['/show-article', id]);
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  articleDetails() {
    this.router.navigate(['/show-article', this._id]);
  }
}
