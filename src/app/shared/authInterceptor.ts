import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { AuthService } from '../admin/shared/services/auth.service'
import { catchError } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })

export class AuthInterceptor implements HttpInterceptor {

    private handleError() {
        this.authService.logout()
        this.router.navigate(['/admin', 'login'], {
            queryParams: {
                authFailed: true
            }
        })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            const cloneReq = req.clone({
                setParams: {
                    auth: this.authService.token
                }
            })
            return next.handle(cloneReq).pipe(
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 401) {
                        this.handleError()
                    }
                    return throwError(err)
                })
            )
        }
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                this.authService.logout();
                this.router.navigate(['/error'])
                return throwError(err);
            })
        )
    }

    constructor(private authService: AuthService, private router: Router) { }
}