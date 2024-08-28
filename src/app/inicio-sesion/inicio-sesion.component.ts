import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';
import { InactivityService } from '../../services/inactivity.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  nick: string = '';
  password: string = '';
  loginForm: FormGroup; 
  passwordFieldType: string = "password";

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private router: Router, private inactivityService: InactivityService) {
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    // Crear el formulario en el método ngOnInit()
    this.loginForm = this.formBuilder.group({
      nick: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    this.nick = this.loginForm.get('nick')?.value;
    this.password = this.loginForm.get('password')?.value;

    if (this.loginForm.invalid) {
      alert('Por favor, rellene todos los campos.');
      this.marcarTodosLosCamposComoTocados();
      return;
    }
    this.usuarioService.autenticarUsuario(this.nick, this.password).subscribe(
      usuario => {
        if (usuario) {
          localStorage.setItem('nickUsuario', usuario.nick);
          this.inactivityService.startMonitoring(); // La app inicia el monitoreo de inactividad
          this.router.navigate(['/sesion-iniciada']);
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error => {
        if (error.status === 401) {
          // Si el backend devuelve 401, mostramos "Credenciales incorrectas"
          alert('Credenciales incorrectas');
        } else {
          // Para otros tipos de errores, mostramos el mensaje genérico
          alert('Error al iniciar sesión');
        }
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
