import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionIniciadaComponent } from './sesion-iniciada.component';

describe('SesionIniciadaComponent', () => {
  let component: SesionIniciadaComponent;
  let fixture: ComponentFixture<SesionIniciadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SesionIniciadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SesionIniciadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
