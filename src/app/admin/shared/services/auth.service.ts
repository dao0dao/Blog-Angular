import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { User } from 'src/app/shared/interfaces'
import { environment } from 'src/environments/environment'
import { Observable, Subject, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { FbAuthResponse } from '../../../shared/interfaces'


@Injectable({ providedIn: 'root' })
export class AuthService {

    public errorMessage$: Subject<string> = new Subject<string>()

    get token(): string {
        const expDate = new Date(localStorage.getItem('fireBase-token-expDate'))
        if (new Date() > expDate) {
            this.logout
            return null
        }
        return localStorage.getItem('fireBase-token')
    }

    private setToken(response: FbAuthResponse | null) {
        if (response) {
            const expData = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000)
            localStorage.setItem('fireBase-token', response.idToken)
            localStorage.setItem('fireBase-token-expDate', expData.toString())
        } else {
            localStorage.clear()
        }
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            )
    }

    signUp(user: User): Observable<any> {
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user).pipe(
            catchError(this.handleError.bind(this))
        )
    }

    handleError(error: HttpErrorResponse) {
        const { message } = error.error.error
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                this.errorMessage$.next('Nieprawidłowy adres email.')
                break
            case 'INVALID_PASSWORD':
                this.errorMessage$.next('Nieprawidłowe hasło.')
                break
            case 'USER_DISABLED':
                this.errorMessage$.next('Użytkownik został zawieszony.')
                break
            case 'EMAIL_EXISTS':
                this.errorMessage$.next('Taki email już istnieje.')
                break
            case 'OPERATION_NOT_ALLOWED':
                this.errorMessage$.next('Rejestracja chwilowo wyłączona.')
                break
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                this.errorMessage$.next('Zbyt wiele prób podłączenia, spróbuj później.')
                break
        }
        return throwError(error)
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    constructor(private http: HttpClient) { }
}