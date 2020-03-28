import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '@components/errors/error404/error404.component';

const routes: Routes = [{ path: '', component: Error404Component }];

@NgModule({
  declarations: [Error404Component],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsModule {}
