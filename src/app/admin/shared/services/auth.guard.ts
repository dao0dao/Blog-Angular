import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuar implements CanActivate {

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | Observable<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            return true
        } else {
            this.authService.logout()
            this.router.navigate(['/admin', 'login'], {
                queryParams: {
                    loginAgain: true
                }
            })
        }
    }

    constructor(private authService: AuthService, private router: Router) { }
}