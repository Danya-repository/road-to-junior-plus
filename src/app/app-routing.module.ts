import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login/login-page/login-page.component";
import {NotFoundPageComponent} from "./shared/components/not-found-page/not-found-page.component";
import {LoginGuard} from "./login/login.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
