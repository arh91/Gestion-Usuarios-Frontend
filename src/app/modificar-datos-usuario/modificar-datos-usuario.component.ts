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
  nickUsuario: string = localStorage.getItem('nickUsuario') || '';
  passwordFieldType: string = "password";
  IntroducePassword: boolean = false;
  newPassword: boolean = false;
  newPasswordTwo: boolean = false;
  btnOk: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    /*this.modificarForm = this.formBuilder.group({
      password: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });*/

    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    //const nick = this.route.snapshot.paramMap.get('nick')!;
    if (this.nickUsuario) {
      this.usuarioService.obtenerUsuarioPorId(this.nickUsuario).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      // Inicializar el formulario con los datos del usuario
      this.modificarForm = this.formBuilder.group({
        password: ['', Validators.required],
        mail: [usuario.mail, Validators.required],
        telefono: [usuario.telefono, Validators.required]
      });
      });
    }
  }
  

  modificarUsuario(): void {
    if (this.modificarForm.invalid) {
      return;
    }

    // Verificamos que la contraseña introducida cumpla con los requisitos establecidos
    if (!this.validarPassword(this.modificarForm.value.password)) {
      alert('Contraseña no válida.')
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

    // Permitir que el usuario deje la contraseña en blanco si no quiere cambiarla
    const newPassword = this.modificarForm.value.password || this.usuario.password;

    const confirmacion = confirm('¿Está seguro de que desea modificar sus datos?');
    if (confirmacion) {
      
       /*  password: this.modificarForm.value.password;
        mail: this.modificarForm.value.mail;
        telefono: this.modificarForm.value.telefono; 

        let passwordString: string = "";
        let mailString: string = "";
        let telefonoNumber: number = 0;*/

        //let nickUsuario: string = localStorage.getItem('nickUsuario') || '';

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
    this.mostrarMensaje();
    this.mostrarBoton();
  }
  
  mostrarMensaje(){
    this.IntroducePassword = true;
  }

  mostrarBoton(){
    this.btnOk = true;
  }


  /*autenticarPassword(nick: string, password: string): boolean {

  }*/


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
