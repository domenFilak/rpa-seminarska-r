import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersItemListComponent } from './all-orders-item-list.component';

describe('AllOrdersItemListComponent', () => {
  let component: AllOrdersItemListComponent;
  let fixture: ComponentFixture<AllOrdersItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllOrdersItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllOrdersItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
