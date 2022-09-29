import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClaimComponent } from './admin-claim.component';

describe('AdminClaimComponent', () => {
  let component: AdminClaimComponent;
  let fixture: ComponentFixture<AdminClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
