import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MdMenuModule, MdCardModule, MdIconModule, MdButtonModule, MdSelectModule } from '@angular/material';

describe('AppComponent', () => {
 
 let fixture: ComponentFixture<AppComponent>;
 let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MdMenuModule, 
        MdCardModule,
        MdIconModule,
        MdButtonModule,
        MdSelectModule
      ],
      declarations: [
        AppComponent,
        MenuComponent,      
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should have a title', async(() => {
    expect(app.title).toEqual('Vienna CityBikes');
  }));
});
