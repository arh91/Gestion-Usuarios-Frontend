import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrl: './registro-producto.component.css'
})
export class RegistroProductoComponent implements OnInit {
  producto: Producto = new Producto();
  registroForm: FormGroup = new FormGroup({}); 

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder) {
  }

  /*constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      marca: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }*/

  ngOnInit(): void {
    // Crear el formulario en el método ngOnInit()
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  registrarProducto(): void{
    // Verificamos que no quede ningún campo vacío
    if (!this.producto.nombre || !this.producto.descripcion || !this.producto.categoria || !this.producto.marca || !this.producto.precio) {
      alert("Por favor, rellene todos los campos.");
      return; 
    }
    if(this.comprobarLongitudCadenaDescripcion(this.producto.descripcion)){
      alert("La descripción no debe contener más de 200 caracteres");
      return;
    }
    this.productoService.registrarProducto(this.producto).subscribe(
      (response) => {
        // Maneja la respuesta del servidor
        console.log('Producto registrado:', response);
        alert("Producto registrado correctamente");
        // Limpia el formulario después de registrar el producto
        this.producto = new Producto();
      },
      (error) => {
        // Maneja errores de la solicitud
        console.error('Error al registrar producto:', error);
        alert("Error al registrar producto");
      }
    );
  }


  comprobarLongitudCadena(cadena: string): boolean {
    if (cadena.length > 50) {
      return true; 
    } else {
      return false; 
    }
  }
  

  comprobarLongitudCadenaDescripcion(cadena: string): boolean {
    if (cadena.length > 200) {
      return true; 
    } else {
      return false; 
    }
  }
  
}

