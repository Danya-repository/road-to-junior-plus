import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {BaseLayoutComponent} from "./components/base-layout/base-layout.component";
import {AuthGuard} from "../authorize/services/auth.guard";

const routes: Routes = [
  { path: '', component: BaseLayoutComponent, canActivate: [() => inject(AuthGuard).canActivate()] }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class MainRoutingModule { }
