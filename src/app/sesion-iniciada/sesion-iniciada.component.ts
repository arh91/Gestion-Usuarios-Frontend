import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { InactivityService } from '../../services/inactivity.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-sesion-iniciada',
  templateUrl: './sesion-iniciada.component.html',
  styleUrl: './sesion-iniciada.component.css'
})
export class SesionIniciadaComponent {
  usuario: Usuario | undefined;
  nick: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router, private inactivityService: InactivityService) {}

  ngOnInit() {
    // Recuperar el nick del almacenamiento local
    this.nick = localStorage.getItem('nickUsuario');
    if (this.nick) {
      this.usuarioService.obtenerUsuarioPorId(this.nick).subscribe(usuarioData => {
        this.usuario = new Usuario(
          usuarioData.nick,
          usuarioData.password,
          usuarioData.mail,
          usuarioData.telefono,
          new Date(usuarioData.fechaRegistro), // Convertir fechaRegistro a Date
          usuarioData.conectado
        );
      });
    }
  }


  get estadoUsuario(): string {
    return this.usuario?.conectado ? 'Conectado' : 'No conectado';
  }


  formatearFecha(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  }


  confirmarEliminacion() {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");

    if (confirmacion) {
      this.eliminarCuenta();
    }
  }


  eliminarCuenta() {
    const nickUsuario = localStorage.getItem('nickUsuario');
    if (nickUsuario) {
      this.usuarioService.eliminarUsuario(nickUsuario).subscribe(
        response => {
          alert('Tu cuenta ha sido eliminada exitosamente.');
          localStorage.removeItem('nickUsuario');
          this.router.navigate(['/inicio-sesion']); // Redirige a la página de inicio de sesión
        },
        error => {
          alert('Ocurrió un error al eliminar tu cuenta. Por favor, inténtalo de nuevo.');
        }
      );
    }
  }

  cerrarSesion() {
    this.ngOnInit();
    console.log(this.nick);
    if (this.nick) {
      this.usuarioService.cerrarSesion(this.nick).subscribe(() => {
        localStorage.removeItem('nickUsuario');
        this.inactivityService.stopMonitoring(); //La app detiene el monitoreo de inactividad
        this.router.navigate(['/inicio-sesion']);
      });
    }
  }

  mostrarListaUsuarios(){
    this.router.navigate(['/lista-usuarios']);
  }

}
