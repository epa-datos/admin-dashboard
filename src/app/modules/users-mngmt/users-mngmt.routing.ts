import { Routes } from '@angular/router';
import { InviteUserComponent } from './pages/invite-user/invite-user.component';
import { UsersComponent } from './pages/users/users.component';

export const UsersMngmtRoutes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'invite-user', component: InviteUserComponent },
];
