import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCodigoComponent } from './solicitar-codigo.component';

describe('SolicitarCodigoComponent', () => {
  let component: SolicitarCodigoComponent;
  let fixture: ComponentFixture<SolicitarCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitarCodigoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
