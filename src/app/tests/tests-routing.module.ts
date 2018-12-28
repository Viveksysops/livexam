import { Routes } from '@angular/router';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DefaultComponent } from './default/default.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { InstructionComponent } from './instruction/instruction.component';
import { InvitesComponent } from './invites/invites.component';
import { HeaderComponent } from './_common/header/header.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full',
    },
    {
        path: '',
        component:HeaderComponent,
        children: [
            {
                path: 'default',
                component: DefaultComponent,
                data: {
                    title: 'Tests'
                }
            },
            {
                path: 'add',
                component: AddComponent,
                data: {
                    title: 'Add Test'
                }
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                data: {
                    title: 'Edit Test'
                }
            },
            {
                path: 'addquestions/:id',
                component: AddQuestionsComponent,
                data: {
                    title: 'Add Questions'
                }
            },
            {
                path: 'instruction',
                component: InstructionComponent,
                data: {
                    title: 'Test Instructions'
                }
            },
            {
                path: 'invites',
                component: InvitesComponent,
                data: {
                    title: 'Test invitess'
                }
            }

        ]
    }
];

