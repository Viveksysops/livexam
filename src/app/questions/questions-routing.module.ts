import { Routes } from '@angular/router';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './_common/header/header.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TopicsComponent } from './topics/topics.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: 'add',
                component: AddComponent,
                data: {
                    title: 'Add Question'
                }
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                data: {
                    title: 'Edit Question'
                }
            },
            {
                path: 'default',
                component: DefaultComponent,
                data: {
                    title: 'Questions'
                }
            },
            {
                path: 'topics',
                component: TopicsComponent,
                data: {
                    title: 'Topics Info'
                }
            },
            {
                path: 'subjects',
                component: SubjectsComponent,
                data: {
                    title: 'Subjects Info'
                }
            }

        ]
    }
];

