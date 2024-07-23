import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  usuario: Usuario | undefined;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const nick = this.route.snapshot.paramMap.get('nick');
    if (nick) {
      this.usuarioService.obtenerUsuarioPorId(nick).subscribe(usuarioData => {
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

}
