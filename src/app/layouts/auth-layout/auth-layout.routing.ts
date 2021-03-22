import { Routes } from '@angular/router';
import { CreateAccessComponent } from 'src/app/modules/auth/pages/create-access/create-access.component';
import { LoginComponent } from 'src/app/modules/auth/pages/login/login.component';
import { ForgotPswComponent } from 'src/app/modules/auth/pages/forgot-psw/forgot-psw.component';
import { ResetPswComponent } from 'src/app/modules/auth/pages/reset-psw/reset-psw.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'create-access', component: CreateAccessComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPswComponent },
    { path: 'reset-password', component: ResetPswComponent },
];
