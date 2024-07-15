import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  loginForm: FormGroup; 
  passwordFieldType: string = "password";

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private router: Router) {
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    // Crear el formulario en el método ngOnInit()
    this.loginForm = this.formBuilder.group({
      nick: ['', Validators.required],
      password: ['', Validators.required]
    });
    /* this.usuario.nick = this.loginForm.get('nick')?.value;
    this.usuario.password = this.loginForm.get('password')?.value; */
  }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      alert('Por favor, rellene todos los campos.');
      this.marcarTodosLosCamposComoTocados();
      return;
    }
    this.usuarioService.autenticarUsuario(this.loginForm.value).subscribe(
      (response) => {
        // Maneja la respuesta del servidor
        console.log('Usuario autenticado:', response);
        alert("Inicio de sesión exitoso");
        localStorage.setItem('nickUsuario', this.loginForm.get('nick')?.value); //Guardamos el nick en almacenamiento local
        this.router.navigate(['/sesion-iniciada']); // Redirige a la página principal u otra página de tu aplicación
      },
      (error) => {
        // Maneja errores de la solicitud
        console.error('Error al iniciar sesión:', error);
        alert("Usuario o contraseña incorrectos");
      }
    );
  }

  cambiarVisibilidadContrasenha(): void {
    console.log("Método cambiar tipo de dato");
    this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    this.cdRef.detectChanges(); // Forzar la detección de cambios
    console.log(this.passwordFieldType);
  }

  marcarTodosLosCamposComoTocados(): void {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
