import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from './tests-routing.module';
import { DefaultComponent } from './default/default.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { InstructionComponent } from './instruction/instruction.component';
import { InvitesComponent } from './invites/invites.component';
import { HeaderComponent } from './_common/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DefaultComponent, AddComponent, EditComponent, AddQuestionsComponent, InstructionComponent, InvitesComponent, HeaderComponent]
})
export class TestsModule { }
