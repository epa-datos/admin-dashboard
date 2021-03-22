import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPswComponent } from './set-psw.component';

describe('SetPswComponent', () => {
  let component: SetPswComponent;
  let fixture: ComponentFixture<SetPswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
