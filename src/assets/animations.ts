import { trigger, state, style, transition, animate} from '@angular/animations'
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast'

export const Animations = {
  rotateIcon: trigger('rotateIcon', [
    state('false', style({
      transform: 'rotate(0deg)',
      // marginTop: '-12px'
    })),
    state('true', style({
      transform: 'rotate(180deg)',
      // marginTop: '-12px'
    })),
    transition('* <=> *', animate('200ms ease-in-out'))
  ]),
  toggleDropdown: trigger('toggleDropdown', [
    state('false', style({
      height: '0'
    })),
    state('true', style({
      height: '150px',
    })),
    transition('* <=> *', animate('200ms ease-in-out'))
  ]),
  toggleUserDropdown: trigger('toggleUserDropdown', [
    state('false', style({
      height: '0'
    })),
    state('true', style({
      height: '150px',
      bottom: '81px'
    })),
    transition('* <=> *', animate('200ms ease-in-out'))
  ]),
  toggleLanguageSelector: trigger('toggleLanguageSelector', [
    state('false', style({
      height: '0'
    })),
    state('true', style({
      height: '200px',
    })),
    transition('* <=> *', animate('200ms ease-in-out'))
  ]),
}