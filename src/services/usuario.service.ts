import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/usuarios'; // URL del backend que proporciona la API REST para usuarios

  constructor(private http: HttpClient, private router: Router) { }

  // Método para crear un nuevo usuario en el backend
  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/registro`, usuario);
  }

  // Método para autenticar un usuario
  autenticarUsuario(nick: string, password: string): Observable<Usuario> {
    const params = new HttpParams().set('nick', nick).set('contraseña', password);
    return this.http.post<Usuario>(`${this.apiUrl}/autenticar`, params);
  }

  // Método que envía un código aleatorio a la cuenta de correo de un usuario que haya olvidado su contraseña
  enviarCodigoVerificacion(nick: string): Observable<HttpResponse<any>> {
    const param = new HttpParams().set('nick', nick);
    return this.http.post(`${this.apiUrl}/enviar-codigo`, param, { observe: 'response' });
  }

  // Método que comprueba que el nick introducido no exista aún en la base de datos
  validarNick(nick: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/validarNick/${nick}`);
  }
  
  cerrarSesion(nick: string): Observable<void> {
    const params = new HttpParams().set('nick', nick);
    return this.http.post<void>(`${this.apiUrl}/cerrar-sesion`, params);
  }

  // Método para obtener todos los usuarios desde el backend
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/lista`);
  }

  // Método para obtener un usuario por su ID
  obtenerUsuarioPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  //Método para obtener el código de recuperación de contraseña
  obtenerCodigoVerificacion(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/obtener-codigo`);
  } 

  // Método para eliminar un usuario por su ID
  eliminarUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para modificar un usuario por su ID
  modificarUsuario(id: string, usuarioModificado: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuarioModificado);
  }

}
