import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { SidebarComponent } from './components/imported/sidebar/sidebar.component';
// import { NavbarComponent } from './components/imported/navbar/navbar.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        // HttpClientTestingModule,
        // TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent,
        // SidebarComponent,
        // NavbarComponent
      ],
    }).compileComponents();
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'bookly'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('bookly');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('bookly app is running!');
  // });
});
