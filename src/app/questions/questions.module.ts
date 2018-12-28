import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';

import { QuillModule } from 'ngx-quill'

import { routes } from './questions-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './_common/header/header.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TopicsComponent } from './topics/topics.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    QuillModule,
    FormsModule,
    DataTablesModule
  ],
  declarations: [AddComponent, EditComponent, DefaultComponent, HeaderComponent, SubjectsComponent, TopicsComponent]
})
export class QuestionsModule { }
