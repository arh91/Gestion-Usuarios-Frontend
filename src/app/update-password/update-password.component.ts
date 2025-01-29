import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  usuario!: Usuario;
  nickUsuario: string = localStorage.getItem('nickUsuario') || '';
  newPasswordForm: FormGroup;
  passwordFieldType: string = "password";
  pwdOne: string = '';
  pwdTwo: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private usuarioService: UsuarioService) {
      this.newPasswordForm = new FormGroup({});
    }
  
    ngOnInit(): void {
      // Crear el formulario en el método ngOnInit()
      this.newPasswordForm = this.formBuilder.group({
        pwdOne: ['', Validators.required],
        pwdTwo: ['', Validators.required]
      });
    }

    modificarContrasenha(): void {
      if (this.newPasswordForm.invalid) {
        alert('Error: Hay campos vacíos o sin rellenar.');
        return;
      }

      if (!this.validarPassword(this.newPasswordForm.value.pwdOne)) {
        alert('Formato de contraseña incorrecto.')
        return;
      }

      let one = this.newPasswordForm.value.pwdOne;
      let two = this.newPasswordForm.value.pwdTwo;
      console.log(one);
      console.log(two);

      if(one.trim() !== two.trim()){
        alert('Error: Las contraseñas introducidas no coinciden.');
        return;
      }

      if(String(this.newPasswordForm.value.pwdOne).trim === String(this.newPasswordForm.value.pwdTwo).trim){
        this.usuarioService.obtenerUsuarioPorId(this.nickUsuario).subscribe((usuario: Usuario) => {
          this.usuario = usuario;
        });
        const usuarioModificado = {
          nick: this.usuario.nick,
          password: this.newPasswordForm.value.pwdOne,
          mail: String(this.usuario.mail),
          telefono: Number(this.usuario.telefono),
          fechaRegistro: this.usuario.fechaRegistro,
          conectado: this.usuario.conectado
        };

        this.usuarioService.modificarUsuario(this.nickUsuario, usuarioModificado).subscribe(
          () => {
            localStorage.setItem('pwdUsuario', usuarioModificado.password);
            alert('Tu contraseña ha sido modificada');
            this.router.navigate(['/cuenta-recuperada']);
          },
          error => {
            alert('Hubo un error al modificar los datos');
          }
        );
      }else{
        alert('Error: Las contraseñas introducidas no coinciden.');
      }
    }

    validarPassword(password: string): boolean {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    }

    cambiarVisibilidadContrasenhaOne(): void {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
      this.cdRef.detectChanges(); // Forzar la detección de cambios
      console.log(this.passwordFieldType);
    }

    cambiarVisibilidadContrasenhaTwo(): void {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
      this.cdRef.detectChanges(); // Forzar la detección de cambios
      console.log(this.passwordFieldType);
    }
}
