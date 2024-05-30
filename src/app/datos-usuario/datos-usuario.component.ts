import { Component, OnInit } from '@angular/core';
import { UsuarioSinPassword } from '../../models/usuario-sin-password';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrl: './datos-usuario.component.css'
})
export class DatosUsuarioComponent implements OnInit{

  usuario: UsuarioSinPassword | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const nick = this.route.snapshot.paramMap.get('nick');
    if (nick) {
      this.usuarioService.obtenerUsuarioPorId(nick).subscribe(
        (data: UsuarioSinPassword) => {
          this.usuario = data;
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    }
  }

}
