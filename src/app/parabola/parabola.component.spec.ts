import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParabolaComponent } from './parabola.component';

describe('ParabolaComponent', () => {
  let component: ParabolaComponent;
  let fixture: ComponentFixture<ParabolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParabolaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParabolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
