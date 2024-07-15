import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion-iniciada',
  templateUrl: './sesion-iniciada.component.html',
  styleUrl: './sesion-iniciada.component.css'
})
export class SesionIniciadaComponent {
  nick: string | null = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    // Recuperar el nick del almacenamiento local
    this.nick = localStorage.getItem('nickUsuario');
  }

  cerrarSesion() {
    localStorage.removeItem('nickUsuario');
    this.router.navigate(['/inicio-sesion']);
  }
}
