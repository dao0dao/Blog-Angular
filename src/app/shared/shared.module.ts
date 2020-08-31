import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'align': [] }],
        [{ 'color': [] }],
        ['link', 'image']
    ]
}

@NgModule({
    imports: [HttpClientModule, QuillModule.forRoot({modules})],
    exports: [HttpClientModule, QuillModule]

})

export class SharedModule { }