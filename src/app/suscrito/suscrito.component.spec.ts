import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscritoComponent } from './suscrito.component';

describe('SuscritoComponent', () => {
  let component: SuscritoComponent;
  let fixture: ComponentFixture<SuscritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscritoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuscritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
