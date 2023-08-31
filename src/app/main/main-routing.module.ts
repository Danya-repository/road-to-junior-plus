import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BaseLayoutComponent} from "./components/base-layout/base-layout.component";


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class MainRoutingModule { }
