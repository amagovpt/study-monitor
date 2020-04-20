import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgxGaugeModule } from 'ngx-gauge';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

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
import { TagDetailedStatisticsComponent } from './pages/tag-detailed-statistics/tag-detailed-statistics.component';
import { RemoveWebsitesConfirmationDialogComponent } from './dialogs/remove-websites-confirmation-dialog/remove-websites-confirmation-dialog.component';
import { WebsitePagesResultsComponent } from './pages/website-detailed-statistics/website-pages-results/website-pages-results.component';
import { WebsiteMetadataComponent } from './pages/website-detailed-statistics/website-metadata/website-metadata.component';
import { WebsiteScoreDistributionComponent } from './pages/website-detailed-statistics/website-score-distribution/website-score-distribution.component';
import { WebsiteListPagesErrorComponent } from './pages/website-list-pages-error/website-list-pages-error.component';
import { TagStatisticsSummaryComponent } from './pages/tag-detailed-statistics/tag-statistics-summary/tag-statistics-summary.component';
import { TagStatisticsErrorsComponent } from './pages/tag-detailed-statistics/tag-statistics-errors/tag-statistics-errors.component';
import { TagStatisticsScoreDistributionComponent } from './pages/tag-detailed-statistics/tag-statistics-score-distribution/tag-statistics-score-distribution.component';
import { TagStatisticsWebsitesResultsComponent } from './pages/tag-detailed-statistics/tag-statistics-websites-results/tag-statistics-websites-results.component';
import { TagStatisticsPagesResultsComponent } from './pages/tag-detailed-statistics/tag-statistics-pages-results/tag-statistics-pages-results.component';
import { TagListWebsitesErrorComponent } from './pages/tag-list-websites-error/tag-list-websites-error.component';
import { AddExistingWebsiteComponent } from './pages/tag/add-website/add-existing-website/add-existing-website.component';
import { AddNewWebsiteComponent } from './pages/tag/add-website/add-new-website/add-new-website.component';
import { UserAuthErrorDialogComponent } from './dialogs/user-auth-error-dialog/user-auth-error-dialog.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddPagesErrorsDialogComponent } from './dialogs/add-pages-errors-dialog/add-pages-errors-dialog.component';
import { BackgroundEvaluationsInformationDialogComponent } from './dialogs/background-evaluations-information-dialog/background-evaluations-information-dialog.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [UserAuthGuard], children: [
    { path: '', component: UserStudiesComponent, canActivate: [UserAuthGuard] },
    { path: 'add-category', component: AddCategoryComponent, canActivate: [UserAuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [UserAuthGuard] },
    { path: ':tag', component: TagComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics', component: TagDetailedStatisticsComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError', component: TagListWebsitesErrorComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website', component: WebsiteComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website/statistics', component: WebsiteDetailedStatisticsComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website/statistics/:websiteError', component: WebsiteListPagesErrorComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website/statistics/:websiteError/:url', component: EvaluationResultsComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website/statistics/:websiteError/:url/code', component: WebpageCodeComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website/statistics/:websiteError/:url/:ele', component: ElementResultComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website/:url', component: EvaluationResultsComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website/:url/code', component: WebpageCodeComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/statistics/:tagError/:website/:url/:ele', component: ElementResultComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website', component: WebsiteComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website/statistics', component: WebsiteDetailedStatisticsComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website/statistics/:websiteError', component: WebsiteListPagesErrorComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website/statistics/:websiteError/:url', component: EvaluationResultsComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website/statistics/:websiteError/:url/code', component: WebpageCodeComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website/statistics/:websiteError/:url/:ele', component: ElementResultComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website/:url', component: EvaluationResultsComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website/:url/code', component: WebpageCodeComponent, canActivate: [UserAuthGuard] },
    { path: ':tag/:website/:url/:ele', component: ElementResultComponent, canActivate: [UserAuthGuard] }
  ] },
  { path: '**', component: NotFound404Component }
];

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
    TagDetailedStatisticsComponent,
    RemoveWebsitesConfirmationDialogComponent,
    WebsitePagesResultsComponent,
    WebsiteMetadataComponent,
    WebsiteScoreDistributionComponent,
    WebsiteListPagesErrorComponent,
    TagStatisticsSummaryComponent,
    TagStatisticsErrorsComponent,
    TagStatisticsScoreDistributionComponent,
    TagStatisticsWebsitesResultsComponent,
    TagStatisticsPagesResultsComponent,
    TagListWebsitesErrorComponent,
    AddExistingWebsiteComponent,
    AddNewWebsiteComponent,
    UserAuthErrorDialogComponent,
    SettingsComponent,
    AddPagesErrorsDialogComponent,
    BackgroundEvaluationsInformationDialogComponent
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
    A11yModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGaugeModule
  ],
  entryComponents: [
    CreateCategoryDialogComponent,
    RemoveTagsConfirmationDialogComponent,
    RemoveWebsitesConfirmationDialogComponent,
    RemovePagesConfirmationDialogComponent,
    UserAuthErrorDialogComponent,
    AddPagesErrorsDialogComponent,
    BackgroundEvaluationsInformationDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
