import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export  class EmitService{
  private stream = new Subject<string>();

  obs = this.stream.asObservable();

  push(s: string): void{
    this.stream.next(s);
  }
}
