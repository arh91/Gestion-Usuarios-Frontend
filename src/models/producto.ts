export class Producto {
    nombre: string;
    descripcion: string;
    categoria: string
    marca: string;
    precio: number;
  
    constructor() {
      // Inicializa las propiedades por defecto si es necesario
      this.nombre = '';
      this.descripcion = '';
      this.categoria = '';
      this.marca = '';
      this.precio = 0;
    }
  }