import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './customers-routing.module';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { DefaultComponent } from './default/default.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditComponent, AddComponent, DefaultComponent]
})
export class CustomersModule { }
