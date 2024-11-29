import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeadComponent } from './manage-lead.component';

describe('ManageLeadComponent', () => {
  let component: ManageLeadComponent;
  let fixture: ComponentFixture<ManageLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageLeadComponent]
    });
    fixture = TestBed.createComponent(ManageLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
