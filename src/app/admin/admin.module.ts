import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboarPageComponent } from './dashboar-page/dashboar-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component'
import { AuthGuar } from './shared/services/auth.guard'
import { SharedModule } from '../shared/shared.module'
import { searchPipe } from './shared/searchPipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
import { ModalComponent } from './shared/components/modal/modal.component'
import { ModalService } from './shared/services/modalService';
import { SignupPageComponent } from './signup-page/signup-page.component'

const routes = [{
    path: '', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
        { path: 'login', component: LoginPageComponent },
        { path: 'sign_Up', component: SignupPageComponent },
        { path: 'dashboard', component: DashboarPageComponent, canActivate: [AuthGuar] },
        { path: 'create', component: CreatePageComponent, canActivate: [AuthGuar] },
        { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuar] }
    ]
}]

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboarPageComponent,
        CreatePageComponent,
        EditPageComponent,
        searchPipe,
        AlertComponent,
        ModalComponent,
        SignupPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuar,
        AlertService,
        ModalService
    ]
})

export class AdminModule { }