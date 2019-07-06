import { Directive, ElementRef, HostListener, Input  } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms'

@Directive({
  selector: '[appNumber]',
  providers:[{ provide: NG_VALIDATORS, useExisting: NumberDirective, multi: true }]
})
export class NumberDirective {
  private regex: RegExp = new RegExp(/[0-9]/g);
  // Allow key codes for special events. Reflect :
  private specialKeys: Array<number> = [46, 8, 9, 27, 13, 110, 190, 35, 36, 37, 39];
  // Backspace, tab, end, home

  @Input() MinDigit: number;
  @Input() MaxDigit: number;
  @Input() MinRange: number;
  @Input() MaxRange: number;
  
  constructor(private el: ElementRef) {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        let e = <KeyboardEvent>event;
debugger;
        if ((
        (this.specialKeys.indexOf(event.which) > -1) ||
        // to allow backspace, enter, escape, arrows  
        (e.which == 65 && e.ctrlKey == true) ||
        // Allow: Ctrl+C        
        (e.which == 67 && e.ctrlKey == true) ||
        // Allow: Ctrl+X
        (e.which == 88 && e.ctrlKey == true) || 
        
        (e.which == 96 && e.ctrlKey == true)  || 

        (e.which == 48 && e.ctrlKey == true))) {
        return;
        } else if (// to allow numbers  
        (e.which <= 57) ||
        // to allow numpad number  
        (event.which <= 105)) { }
        else {
            event.preventDefault();
          }
          
            let current: string = this.el.nativeElement.value;

            let next: string = current.concat(event.key);
            if ((next && !String(next).match(this.regex)) ||
            (this.MaxDigit && next.length > this.MaxDigit) ||
            (this.MinRange && +next < this.MinRange) ||
            (this.MaxRange && +next >= this.MaxRange)) {
            event.preventDefault();
            }

    }

    validate(control: AbstractControl): { [key: string]: any } {    
      return Validators.minLength(this.MinDigit)(control) 
    }

}
