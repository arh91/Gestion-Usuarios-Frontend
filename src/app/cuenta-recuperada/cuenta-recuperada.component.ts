import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { InactivityService } from '../../services/inactivity.service';

@Component({
  selector: 'app-cuenta-recuperada',
  templateUrl: './cuenta-recuperada.component.html',
  styleUrl: './cuenta-recuperada.component.css'
})
export class CuentaRecuperadaComponent {
  nick: string | null = null;
  password: string | null = null;

    constructor(private usuarioService: UsuarioService, private router: Router, private inactivityService: InactivityService) {
    } 

  ngOnInit(){
    this.nick = localStorage.getItem('nickUsuario');
    this.password = localStorage.getItem('pwdUsuario');
  }

  accederCuenta(): void {
    let nickString: string = this.nick ?? "nick";
    let passwordString: string = this.password ?? "password";
    this.usuarioService.autenticarUsuario(nickString, passwordString).subscribe(
      usuario => {
        if (usuario) {
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
}
