import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import { ChosenHeroStore } from '../services/chosen-hero-store.service';
import { EmitService } from '../services/EmitService';

@Component({
  selector: 'simple-tiny',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class SimpleTinymceComponent implements AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<string>();

  editor;

  constructor(
    private stor: ChosenHeroStore,
    private stream: EmitService
  ) {}

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      //toolbar : 'newdocument | undo redo | styleselect | bold italic | link image',
      //menu    : {},
      plugins : ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      theme   : 'modern',
      branding: false,
      setup   : editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
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
