import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Post } from './interfaces'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AuthService } from '../admin/shared/services/auth.service'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })

export class PostService {

    create(post: Post): Observable<Post> {
        return this.http.post<Post>(`${environment.firebaseDatabaseURL}/posts.json`, post)
    }

    fetchPosts(): Observable<Post[]> {
        return this.http.get(`${environment.firebaseDatabaseURL}/posts.json`)
            .pipe(
                map(
                    (response: { [key: string]: Post }) => {
                        if (response !== null) {
                            return Object.keys(response)
                                .map(key => ({
                                    id: key,
                                    title: response[key].title,
                                    author: response[key].author,
                                    text: response[key].text,
                                    date: new Date(response[key].date)
                                }))
                        } else {
                            return null
                        }
                    }
                )
            )
    }

    fetchPostById(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.firebaseDatabaseURL}/posts/${id}.json`)
    }

    patchPost(id: string, post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.firebaseDatabaseURL}/posts/${id}.json`, post)
    }

    deletePost(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.firebaseDatabaseURL}/posts/${id}.json`)
    }

    constructor(private http: HttpClient, private authService: AuthService) { }
}