import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  nickExists: boolean = false;
  
  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.registroForm = new FormGroup({});
  }

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
    // Verificamos que la contraseña introducida cumpla con los requisitos establecidos
    if (!this.validarPassword(this.registroForm.value.password)) {
      alert('Contraseña incorrecta.')
      return;
    }  
    if (!this.validarCorreo(this.registroForm.value.mail)) {
      alert('Sólamente puede registrar direcciones acabadas en @hotmail.com, @outlook.com, @gmail.com o @yahoo.com.')
      return;
    }
    if (!this.validarTelefono(this.registroForm.value.telefono)) {
      alert('Número de teléfono no válido');
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
    this.usuarioService.validarNick(this.usuario.nick).subscribe(exists => {
      if (exists) {
        alert('El nick ya existe. Por favor, elige otro.');
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
    }, error => {
      // Manejar errores de validación de nick
      console.error('Error al validar nick:', error);
    });
  }


  validarPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }


  validarCorreo(email: string): boolean {
    const dominiosPermitidos = ['@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com'];
    return dominiosPermitidos.some(dominio => email.endsWith(dominio));
  }

  validarTelefono(telefono: number): boolean {
    const regex = /^[6789]\d{8}$/;
    const telefonoStr = telefono.toString();  // Convertir a cadena para aplicar la expresión regular
  
    return regex.test(telefonoStr);
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

