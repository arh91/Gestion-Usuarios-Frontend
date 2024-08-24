import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { InactivityService } from '../../services/inactivity.service';

@Component({
  selector: 'app-sesion-iniciada',
  templateUrl: './sesion-iniciada.component.html',
  styleUrl: './sesion-iniciada.component.css'
})
export class SesionIniciadaComponent {
  
  nick: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router, private inactivityService: InactivityService) {}

  ngOnInit() {
    // Recuperar el nick del almacenamiento local
    this.nick = localStorage.getItem('nickUsuario');
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
