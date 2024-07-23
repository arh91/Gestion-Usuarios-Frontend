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

/* interface Usuario {
  nick: string;
  mail: string;
  fechaRegistro: string;
  estado: string;
}


@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrl: './datos-usuario.component.css'
})
export class DatosUsuarioComponent implements OnInit {
  nickUsuario = "";
  usuario: Usuario | undefined;
  mailUsuario = "";
  registroUsuario = "";
  estadoUsuario = "";


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nickUsuario = params.get('id'); // Obtener el ID de la URL
      this.getUserDetails(this.nickUsuario); // Obtener detalles del cliente
    });
  }


  getUserDetails(id: string): void {
    this.http.get<Usuario>(`http://localhost:3000/api/clientes/${id}`).subscribe(data => {
      this.usuario = data; // Almacenar detalles del cliente
      this.mailUsuario = this.usuario.mail;
      this.registroUsuario = this.usuario.fechaRegistro;
      this.estadoUsuario = this.usuario.estado;
    }, error => {
      console.error('Error al obtener detalles del cliente:', error);
    });
    
  }

}
 */