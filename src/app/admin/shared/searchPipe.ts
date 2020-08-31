import { Pipe, PipeTransform } from "@angular/core"
import { Post } from '../../shared/interfaces'


@Pipe({
    name: 'searchPosts'
})

export class searchPipe implements PipeTransform {
    transform(posts: Post[], search = ''): Post[] {
        if (!search.trim()) {
            return posts
        } else {
            return posts.filter(post =>
                (post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || post.author.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            )
        }
    }
}