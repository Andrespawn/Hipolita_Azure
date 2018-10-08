import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiaMasterComponent } from './guia-master.component';

describe('GuiaMasterComponent', () => {
  let component: GuiaMasterComponent;
  let fixture: ComponentFixture<GuiaMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuiaMasterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
