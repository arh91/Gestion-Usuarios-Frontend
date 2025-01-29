import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';
import { InactivityService } from '../../services/inactivity.service';
import { HttpErrorResponse } from '@angular/common/http';


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

  solicitarCodigo(event: Event): void{
    event.preventDefault();
    const nickControl = this.loginForm.get('nick');

    if (nickControl?.value) {
      // Si el campo 'nick' tiene un valor, redirige al usuario
      console.log('Nick introducido:', nickControl.value);
    } else {
      // Si el campo 'nick' está vacío, muestra un mensaje de error
      alert('Por favor, rellena el campo Nickname antes de continuar.');
      return;
    }
    this.nick = this.loginForm.get('nick')?.value;

    this.usuarioService.validarNick(this.nick).subscribe(exists => {
      if (exists) {
        localStorage.setItem('nickUsuario', this.nick);
        this.router.navigate(['/solicitar-codigo']);
        this.usuarioService.enviarCodigoVerificacion(this.nick).subscribe(
          (response) => {
            if (response.status === 201) {
              alert('Se ha enviado un mail con un código secreto a tu cuenta de correo.');
            }
          },
          (error: HttpErrorResponse) => {
            // Manejo de errores
            // Maneja el caso en que Angular interpreta una respuesta status 201 como un error
            if (error.status === 201) {
              alert('Se ha enviado un mail con un código secreto a tu cuenta de correo.');
            } else {
              console.error('Error al enviar código:', error);
              alert('Error al enviar código');
            }
          }
        );
      } else {
        alert ("Error: el nick introducido no existe en la base de datos.");
      }
    }, error => {
      // Manejar errores de validación de nick
      console.error('Error al validar nick:', error);
    });
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
