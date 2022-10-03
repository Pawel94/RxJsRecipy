import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  possibleColors = [
    // 'darksalmon',
    // 'hotpink',
    // 'lightskyblue',
    // 'goldenrod',
    // 'peachpuff',
    // 'mediumspringgreen',
    // 'cornflowerblue',
    'blanchedalmond',
    // 'lightslategrey',
  ];
  constructor() {}
  @HostBinding('style.backgroundColor') color!: string;
  @HostBinding('style.color') colorStyle!: string;
  @HostListener('mouseenter') newColor() {
    this.color = 'blanchedalmond';
    this.colorStyle = 'darksalmon';
  }
  @HostListener('mouseleave') newColorLeave() {
    this.color = 'white';
    this.colorStyle = 'black';
  }
}
