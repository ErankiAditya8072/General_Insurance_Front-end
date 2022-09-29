import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyclaimComponent } from './myclaim.component';

describe('MyclaimComponent', () => {
  let component: MyclaimComponent;
  let fixture: ComponentFixture<MyclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyclaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
