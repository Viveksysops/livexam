import { Routes } from '@angular/router';
import { CommonLayoutComponent } from './_ui/common-layout/common-layout.component';
import { AuthLayoutComponent } from './_ui/auth-layout/auth-layout.component';

// Layouts
export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'questions',
                loadChildren: './questions/questions.module#QuestionsModule'
            },
            {
                path: 'tests',
                loadChildren: './tests/tests.module#TestsModule'
            },
            {
                path: 'report',
                loadChildren: './report/report.module#ReportModule'
            },
            {
                path: 'customers',
                loadChildren: './customers/customers.module#CustomersModule'
            }
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './auth/auth.module#AuthModule'
            }
        ]
    },
    

];


