import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-modificar-datos-usuario',
  templateUrl: './modificar-datos-usuario.component.html',
  styleUrl: './modificar-datos-usuario.component.css'
})
export class ModificarDatosUsuarioComponent implements OnInit {
  usuario!: Usuario;
  modificarForm!: FormGroup;
  modificarFormTwo!: FormGroup;
  nickUsuario: string = localStorage.getItem('nickUsuario') || '';
  password: string = '';
  passwordFieldType: string = "password";
  IntroducePassword: boolean = false;
  oldPassword: boolean = false;
  newPassword: boolean = false;
  newPasswordTwo: boolean = false;
  btnOk: boolean = false;
  passwordsIguales: boolean = true;
  oldPwd: string = '';
  newPwd: string = '';
  oldMail: string = '';
  newMail: string = '';
  oldPhone: number = 0;
  newPhone: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      this.modificarForm = this.formBuilder.group({
        password: ['', Validators.required],
        newPassword: ['', Validators.required],
        newPasswordTwo: ['', Validators.required], 
        mail: ['', Validators.required],
        telefono: ['', Validators.required]
      });

    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    if (this.nickUsuario) {
      this.usuarioService.obtenerUsuarioPorId(this.nickUsuario).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      // Inicializar el formulario con los datos del usuario
      this.modificarForm = this.formBuilder.group({
        password: ['', Validators.required],
        newPassword: ['', Validators.required],
        newPasswordTwo: ['', Validators.required], 
        mail: [usuario.mail, Validators.required],
        telefono: [usuario.telefono, Validators.required]
      });
      console.log(usuario.mail);
      this.oldMail = this.modificarForm.value.mail;
      this.oldPhone = this.modificarForm.value.telefono;
      });
    }
  }
  

  modificarUsuario(): void {
    this.newMail=this.modificarForm.value.mail;
    this.newPhone=this.modificarForm.value.telefono;

    if (!this.modificarForm.value.mail.trim() || this.modificarForm.value.telefono == null) {
      alert('Por favor, rellene todos los datos');
      return;
    }  
    if (!this.validarCorreo(this.modificarForm.value.mail)) {
      alert('Sólamente puede registrar direcciones acabadas en @hotmail.com, @outlook.com, @gmail.com o @yahoo.com.')
      return;
    }
    if (!this.validarTelefono(this.modificarForm.value.telefono)) {
      alert('Número de teléfono no válido');
      return;
    }
    if(this.oldMail==this.newMail && this.oldPhone==this.newPhone){
      alert('No se ha modificado ningún dato');
      return;
    }

    // Permitir que el usuario deje la contraseña en blanco si no quiere cambiarla
    const newPassword = this.modificarForm.value.password || this.usuario.password;

    const confirmacion = confirm('¿Está seguro de que desea modificar sus datos?');
    if (confirmacion) {
        const usuarioModificado = {
          nick: this.usuario.nick,
          password: newPassword,
          mail: String(this.modificarForm.value.mail),
          telefono: Number(this.modificarForm.value.telefono),
          fechaRegistro: this.usuario.fechaRegistro,
          conectado: this.usuario.conectado
        };

        this.usuarioService.modificarUsuario(this.nickUsuario, usuarioModificado).subscribe(
          () => {
            alert('Datos modificados correctamente');
            this.router.navigate(['/sesion-iniciada']);
          },
          error => {
            alert('Hubo un error al modificar los datos');
          }
        );
      
    }
  }

  escribirNuevaContrasenha(): void{
    console.log(this.modificarForm.value.newPassword);
    if (!this.modificarForm.value.newPassword.trim()) {
      alert('Por favor, rellene la contraseña.');
      return;
    }
    if (!this.validarPassword(this.modificarForm.value.newPassword)) {
      alert('Contraseña no válida.');
      return;
    }
    this.newPwd=this.modificarForm.value.newPassword;
    if(this.oldPwd==this.newPwd) {
      alert('La contraseña que ha escrito es la misma que ya tenía antes.');
      return;
    }
    this.mostrarNewPasswordTwo();
  }

  repetirNuevaContrasenha(): void{
    const password = this.modificarForm.get('newPassword')?.value;
    const confirmPassword = this.modificarForm.get('newPasswordTwo')?.value;
    this.passwordsIguales = password === confirmPassword;

    if (!this.modificarForm.value.newPasswordTwo.trim()) {
      alert('Por favor, rellene la contraseña.');
      return;
    }
    if (!this.passwordsIguales) {
      alert('Las contraseñas no coinciden');
    } else {
      const newPassword = this.modificarForm.value.newPassword;

    const confirmacion = confirm('¿Está seguro de que desea modificar la contraseña?');
    if (confirmacion) {
        const usuarioModificado = {
          nick: this.usuario.nick,
          password: newPassword,
          mail: String(this.modificarForm.value.mail),
          telefono: Number(this.modificarForm.value.telefono),
          fechaRegistro: this.usuario.fechaRegistro,
          conectado: this.usuario.conectado
        };

        this.usuarioService.modificarUsuario(this.nickUsuario, usuarioModificado).subscribe(
          () => {
            alert('Contraseña modificada correctamente');
            this.router.navigate(['/sesion-iniciada']);
          },
          error => {
            alert('Hubo un error al modificar la contraseña');
          }
        );
    }}
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


  mostrarElementos(){
    this.IntroducePassword = true;
    this.btnOk = true;
    this.oldPassword = true;
  }
  

  mostrarNewPassword(){
    this.newPassword = true;
  }

  mostrarNewPasswordTwo(){
    this.newPasswordTwo = true;
  }


  autenticarPassword(): void {
    this.password = this.modificarForm.get('password')?.value;
    if (!this.modificarForm.value.password.trim()) {
      alert('Por favor, rellene la contraseña.');
      return;
    }
    this.usuarioService.autenticarUsuario(this.nickUsuario, this.password).subscribe(
      usuario => {
        if (usuario) {
          this.mostrarNewPassword();
          this.oldPwd=this.modificarForm.value.password;
        } else {
          alert('La contraseña no es correcta');
        }
      },
      error => {
        if (error.status === 401) {
          // Si el backend devuelve 401, mostramos "La contraseña no es correcta"
          alert('La contraseña no es correcta');
        } else {
          // Para otros tipos de errores, mostramos el mensaje genérico
          alert('Error al validar contraseña');
        }
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
    Object.keys(this.modificarForm.controls).forEach(field => {
      const control = this.modificarForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}
