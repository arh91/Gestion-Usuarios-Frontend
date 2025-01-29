import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaRecuperadaComponent } from './cuenta-recuperada.component';

describe('CuentaRecuperadaComponent', () => {
  let component: CuentaRecuperadaComponent;
  let fixture: ComponentFixture<CuentaRecuperadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuentaRecuperadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuentaRecuperadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
