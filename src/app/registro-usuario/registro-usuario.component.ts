import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario();
  registroForm: FormGroup; 
  passwordFieldType: string = "password";

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.registroForm = new FormGroup({});
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
      nick: ['', Validators.required],
      password: ['', Validators.required],
      mail: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  registrarUsuario(): void{
    console.log("MÉTODO PARA REGISTRAR USUARIO");
    // Verificamos que no quede ningún campo vacío
    if (this.registroForm.invalid) {
      alert('Por favor, rellene todos los campos.');
      this.marcarTodosLosCamposComoTocados();
      return;
    }    

    this.usuario.nick = this.registroForm.get('nick')?.value;
    this.usuario.password = this.registroForm.get('password')?.value;
    this.usuario.mail = this.registroForm.get('mail')?.value;
    this.usuario.telefono = this.registroForm.get('telefono')?.value;
    this.usuario.conectado = false;

    if(this.comprobarLongitudCadena(this.usuario.nick)){
      alert("El nick no debe contener más de 50 caracteres");
      return;
    }
    console.log(this.usuario);
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      (response) => {
        // Maneja la respuesta del servidor
        console.log('Usuario registrado:', response);
        alert("Usuario registrado correctamente");
        // Limpia el formulario después de registrar el usuario
        this.registroForm.reset();
        this.usuario = new Usuario();
      },
      (error) => {
        // Maneja errores de la solicitud
        console.error('Error al registrar usuario:', error);
        alert("Error al registrar usuario");
      }
    );
  }

  cambiarVisibilidadContrasenha(): void {
    console.log("Método cambiar tipo de dato");
    this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    this.cdRef.detectChanges(); // Forzar la detección de cambios
    console.log(this.passwordFieldType);
  }


  marcarTodosLosCamposComoTocados(): void {
    Object.keys(this.registroForm.controls).forEach(field => {
      const control = this.registroForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }


  comprobarLongitudCadena(cadena: string): boolean {
    if (cadena.length > 50) {
      return true; 
    } else {
      return false; 
    }
  }
  
}

