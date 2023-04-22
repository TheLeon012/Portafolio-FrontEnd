import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const elements = this.el.nativeElement.querySelectorAll('li');
    const scrollTop = event.target.scrollingElement.scrollTop;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.offsetTop <= scrollTop && (element.offsetTop + element.clientHeight) > scrollTop) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    }
  }
}
