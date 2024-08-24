import { Component, OnInit } from '@angular/core';
import { InactivityService } from '../services/inactivity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'usuarios-productos-app';

  constructor(private inactivityService: InactivityService, private router: Router) {
  }

  ngOnInit() {
    this.checkUserSession();
  }

  checkUserSession() {
    const nickUsuario = localStorage.getItem('nickUsuario');
    const usuarioDesconectado = localStorage.getItem('usuarioInactivo');

    if (nickUsuario) {
      this.inactivityService.startMonitoring(); // Inicia el monitoreo solo si hay un usuario conectado
    } else {
      this.inactivityService.stopMonitoring(); // Detiene el monitoreo si no hay usuarios conectados
    }

    if (usuarioDesconectado) {
      // Limpiar el flag de inactividad
      localStorage.removeItem('usuarioInactivo');
      
      // Redirigir al inicio de sesión
      this.router.navigate(['/inicio-sesion']);
    }
  }
}
