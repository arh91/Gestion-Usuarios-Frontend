import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit{
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  verDatosUsuario(nick: string): void {
    this.router.navigate(['/datos-usuario', nick]);
  }

}
