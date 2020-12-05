import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassarelaComponent } from './passarela.component';

describe('PassarelaComponent', () => {
  let component: PassarelaComponent;
  let fixture: ComponentFixture<PassarelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassarelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassarelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
