import {NgModule, inject} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login/login-page/login-page.component";
import {NotFoundPageComponent} from "./shared/components/not-found-page/not-found-page.component";
import {LoginGuard} from "./login/login.guard";

export interface PageRoutes {
  MAIN: string,
  LOGIN: string,
  DEFAULT: string,
}

export const pageRoutes: PageRoutes = {
  MAIN: '',
  LOGIN: 'login',
  DEFAULT: '**',
}

const routes: Routes = [
  {
    path: pageRoutes.MAIN,
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  },
  {
    path: pageRoutes.LOGIN,
    component: LoginPageComponent,
    canActivate: [() => inject(LoginGuard).canActivate()],
  },
  {
    path: pageRoutes.DEFAULT,
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
