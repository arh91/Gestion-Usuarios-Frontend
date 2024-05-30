import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8082/productos'; // URL del backend que proporciona la API REST para productos

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo producto en el backend
  registrarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/registro`, producto);
  }

  // Método para obtener todos los productos desde el backend
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/lista`);
  }

  // Método para obtener un producto por su ID
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Método para eliminar un producto por su ID
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para modificar un producto por su ID
  modificarProducto(id: number, productoModificado: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, productoModificado);
  }

}
