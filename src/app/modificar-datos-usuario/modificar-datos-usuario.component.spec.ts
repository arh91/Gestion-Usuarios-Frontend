import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDatosUsuarioComponent } from './modificar-datos-usuario.component';

describe('ModificarDatosUsuarioComponent', () => {
  let component: ModificarDatosUsuarioComponent;
  let fixture: ComponentFixture<ModificarDatosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarDatosUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarDatosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
