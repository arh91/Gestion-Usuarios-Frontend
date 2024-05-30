import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  usuario: Usuario = new Usuario();
  registroForm: FormGroup; 
  passwordFieldType: string = "password";

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.registroForm = new FormGroup({});
  }

  ngOnInit(): void {
    // Crear el formulario en el método ngOnInit()
    this.registroForm = this.formBuilder.group({
      nick: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    if (this.registroForm.invalid) {
      alert('Por favor, rellene todos los campos.');
      this.marcarTodosLosCamposComoTocados();
      return;
    }
  }

  cambiarVisibilidadContrasenha(): void {
    console.log("Método cambiar tipo de dato");
    this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    this.cdRef.detectChanges(); // Forzar la detección de cambios
    console.log(this.passwordFieldType);
  }

  marcarTodosLosCamposComoTocados(): void {
    Object.keys(this.registroForm.controls).forEach(field => {
      const control = this.registroForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
