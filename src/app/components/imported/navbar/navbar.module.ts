import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';



@NgModule({
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  imports: [
    CommonModule
  ]
})
export class NavbarModule { }
