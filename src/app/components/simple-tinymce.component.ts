import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
declare let tinymce: any;

@Component({
  selector: 'simple-tiny',
  template: `<div><textarea id="{{elementId}}"></textarea></div>`
})
export class SimpleTinymceComponent implements AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      toolbar: 'newdocument | undo redo | styleselect | bold italic | link image',
      menu: {},
      plugins : ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      theme: 'modern',
      branding: false,
      setup   : editor => {
        this.editor = editor;
        editor.on('change', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
