import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[test]'
})
export class TestDirective {

  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set test(cond: boolean) {
    if (!cond
    //&& !this.hasView
    )
    {
      this.viewContainer.createEmbeddedView(this.templateRef);
      //this.hasView = true;
    } else if (cond
    //&& this.hasView
    )
    {
      this.viewContainer.clear();
      //this.hasView = false;
    }
  }
}
