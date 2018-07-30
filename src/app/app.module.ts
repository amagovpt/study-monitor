import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxGaugeModule } from 'ngx-gauge';
import { HighlightModule } from 'ngx-highlightjs';

import { CookieService } from 'ngx-cookie-service';

import { UserAuthGuard } from './guards/user-auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

import { ToFixedPipe } from './pipes/to-fixed.pipe';
import { HtmlPipe } from './pipes/html.pipe';

import { AppComponent } from './app.component';
import { ErrorComponent } from './global/error/error.component';
import { LoadingComponent } from './global/loading/loading.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';
import { LoginComponent } from './pages/login/login.component';
import { UserStudiesComponent } from './pages/user-studies/user-studies.component';
import { UserComponent } from './pages/user/user.component';
import { NavbarComponent } from './pages/user/navbar/navbar.component';
import { CreateCategoryDialogComponent } from './dialogs/create-category-dialog/create-category-dialog.component';
import { TagComponent } from './pages/tag/tag.component';
import { TagStatisticsComponent } from './pages/tag/tag-statistics/tag-statistics.component';
import { AddWebsiteComponent } from './pages/tag/add-website/add-website.component';
import { PagesTableComponent } from './pages/website/pages-table/pages-table.component';
import { EvaluationResultsComponent } from './pages/evaluation-results/evaluation-results.component';
import { ElementResultComponent } from './pages/element-result/element-result.component';
import { WebpageCodeComponent } from './pages/webpage-code/webpage-code.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { RemoveTagsConfirmationDialogComponent } from './dialogs/remove-tags-confirmation-dialog/remove-tags-confirmation-dialog.component';
import { RemovePagesConfirmationDialogComponent } from './dialogs/remove-pages-confirmation-dialog/remove-pages-confirmation-dialog.component';
import { WebsitesTableComponent } from './pages/tag/websites-table/websites-table.component';
import { WebsiteComponent } from './pages/website/website.component';
import { WebsiteStatisticsComponent } from './pages/website/website-statistics/website-statistics.component';
import { AddPagesComponent } from './pages/website/add-pages/add-pages.component';
import { WebsiteDetailedStatisticsComponent } from './pages/website-detailed-statistics/website-detailed-statistics.component';
import { TagDetaildStatisticsComponent } from './pages/tag-detaild-statistics/tag-detaild-statistics.component';
import { RemoveWebsitesConfirmationDialogComponent } from './dialogs/remove-websites-confirmation-dialog/remove-websites-confirmation-dialog.component';
import { WebsitePagesResultsComponent } from './pages/website-detailed-statistics/website-pages-results/website-pages-results.component';
import { WebsiteMetadataComponent } from './pages/website-detailed-statistics/website-metadata/website-metadata.component';
import { WebsiteScoreDistributionComponent } from './pages/website-detailed-statistics/website-score-distribution/website-score-distribution.component';
import { WebsiteListPagesErrorComponent } from './pages/website-list-pages-error/website-list-pages-error.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [UserAuthGuard], children: [
    { path: '', component: UserStudiesComponent },
    { path: 'add-category', component: AddCategoryComponent },
    { path: ':tag', component: TagComponent },
    { path: ':tag/statistics', component: TagDetaildStatisticsComponent },
    { path: ':tag/:website', component: WebsiteComponent },
    { path: ':tag/:website/statistics', component: WebsiteDetailedStatisticsComponent },
    { path: ':tag/:website/statistics/:websiteError', component: WebsiteListPagesErrorComponent },
    { path: ':tag/:website/statistics/:websiteError/:url', component: EvaluationResultsComponent },
    { path: ':tag/:website/statistics/:websiteError/:url/code', component: WebpageCodeComponent },
    { path: ':tag/:website/statistics/:websiteError/:url/:ele', component: ElementResultComponent },
    { path: ':tag/:website/:url', component: EvaluationResultsComponent },
    { path: ':tag/:website/:url/code', component: WebpageCodeComponent },
    { path: ':tag/:website/:url/:ele', component: ElementResultComponent }
  ] },
  { path: '**', component: NotFound404Component }
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: true
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    NotFound404Component,
    LoginComponent,
    UserStudiesComponent,
    UserComponent,
    NavbarComponent,
    CreateCategoryDialogComponent,
    TagComponent,
    TagStatisticsComponent,
    AddWebsiteComponent,
    PagesTableComponent,
    ToFixedPipe,
    EvaluationResultsComponent,
    HtmlPipe,
    ElementResultComponent,
    WebpageCodeComponent,
    AddCategoryComponent,
    RemoveTagsConfirmationDialogComponent,
    RemovePagesConfirmationDialogComponent,
    WebsitesTableComponent,
    WebsiteComponent,
    WebsiteStatisticsComponent,
    AddPagesComponent,
    WebsiteDetailedStatisticsComponent,
    TagDetaildStatisticsComponent,
    RemoveWebsitesConfirmationDialogComponent,
    WebsitePagesResultsComponent,
    WebsiteMetadataComponent,
    WebsiteScoreDistributionComponent,
    WebsiteListPagesErrorComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGaugeModule,
    HighlightModule.forRoot()
  ],
  entryComponents: [
    CreateCategoryDialogComponent,
    RemoveTagsConfirmationDialogComponent,
    RemoveWebsitesConfirmationDialogComponent,
    RemovePagesConfirmationDialogComponent
  ],
  providers: [
    CookieService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
