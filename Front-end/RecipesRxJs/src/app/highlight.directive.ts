import {
  animate,
  AnimationBuilder,
  AnimationMetadata,
  style,
} from '@angular/animations';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  possibleColors = [];
  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  @HostListener('mouseenter') newColor() {
    this.playAnimation(this.getFadeOutAnimation());
  }
  @HostListener('mouseleave') newColorLeave() {
    this.playAnimation(this.getFadeInAnimation());
  }

  private playAnimation(animationMetaData: AnimationMetadata[]): void {
    const animation = this.builder.build(animationMetaData);
    const player = animation.create(this.el.nativeElement);
    player.play();
  }

  private getFadeInAnimation(): AnimationMetadata[] {
    return [
      animate('400ms ease-in', style({ opacity: 1, transform: 'scale(1)' })),
    ];
  }
  private getFadeOutAnimation(): AnimationMetadata[] {
    return [
      animate(
        '400ms ease-in',
        style({ opacity: 0.5, transform: 'scale(1.06)', cursor: 'pointer' })
      ),
    ];
  }
}
