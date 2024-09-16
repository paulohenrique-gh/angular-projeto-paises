import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SplitParagraphPipe } from '../../pipes/split-paragraph.pipe';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';

@Component({
  selector: 'app-full-article',
  standalone: true,
  imports: [
    HeaderComponent,
    AsyncPipe,
    CommonModule,
    SplitParagraphPipe,
    CommentSectionComponent,
  ],
  templateUrl: './full-article.component.html',
  styleUrl: './full-article.component.scss',
  host: { class: '' },
})
export class FullArticleComponent implements OnInit {
  articleId!: string | undefined;
  article$!: Observable<Article>;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.articleId =
      this.activatedRoute.snapshot.paramMap.get('articleId') || '';
  }

  ngOnInit(): void {
    this.loadArticle();
  }

  private loadArticle(): void {
    if (this.articleId) {
      this.article$ = this.articleService.getArticleById(this.articleId);
    }
  }
}
