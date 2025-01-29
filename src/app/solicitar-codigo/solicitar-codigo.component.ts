import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-solicitar-codigo',
  templateUrl: './solicitar-codigo.component.html',
  styleUrl: './solicitar-codigo.component.css'
})
export class SolicitarCodigoComponent {
  applyCodeForm: FormGroup;
  codigoIntroducido: string = '';
  codigoVerificacion: string | null = null;
  /* codeSent: boolean = false;
  usuario: Usuario = new Usuario(); */

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.applyCodeForm = new FormGroup({});
  }

  ngOnInit(): void {
    // Crear el formulario en el método ngOnInit()
    this.applyCodeForm = this.formBuilder.group({
      codigoIntroducido: ['', Validators.required]
    });
  }


  verificarCodigo() {
    if (this.applyCodeForm.invalid) {
      alert('Por favor, introduzca un código válido para continuar.');
      return;
    }

    this.codigoIntroducido = this.applyCodeForm.get('codigoIntroducido')?.value;
    this.usuarioService.obtenerCodigoVerificacion().subscribe({
      next: (codigo) => {
        this.codigoVerificacion = codigo; // Asigna el código recibido
        console.log('Código verificacion', this.codigoVerificacion);
        console.log('Código introducido', this.codigoIntroducido);
        if (String(this.codigoIntroducido).trim() === String(this.codigoVerificacion).trim()) { 
          this.router.navigate(['/actualizar-contraseña']);
        } else {
          alert('El código introducido no es correcto');
        }
      },
      error: (error) => {
        console.error('Error al obtener el código de verificación:', error);
      },
    });
    
  }

}
