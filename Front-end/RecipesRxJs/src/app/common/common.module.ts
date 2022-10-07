import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-me/about-me.component';
const routes: Routes = [
  {
    path: 'aboutme',
    component: AboutUsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [AboutUsComponent],
  exports: [RouterModule],
})
export default class CommonModule {}
