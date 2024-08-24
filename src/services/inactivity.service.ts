import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service'; // Asegúrate de importar tu servicio de usuario

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private timeoutId: any;
  private readonly inactivityTimeLimit = 3 * 60 * 1000; // 3 minutos

  constructor(private router: Router, private usuarioService: UsuarioService) {
  }


  /**
   * Inicia el monitoreo de inactividad del usuario.
   * Resetea el temporizador cada vez que detecta actividad del usuario (movimiento de ratón, pulsaciones de teclado, etc.).
   * Si no se detecta actividad durante el tiempo definido (inactivityTimeLimit), se cierra la sesión del usuario.
   */
  startMonitoring() {
    this.resetTimer();
    window.addEventListener('mousemove', this.resetTimer.bind(this));
    window.addEventListener('mousedown', this.resetTimer.bind(this));
    window.addEventListener('keypress', this.resetTimer.bind(this));
    window.addEventListener('touchstart', this.resetTimer.bind(this));
    window.addEventListener('scroll', this.resetTimer.bind(this));
  }


  /**
   * Detiene el monitoreo de inactividad del usuario.
   * Elimina todos los event listeners que monitorizan la actividad del usuario y detiene el temporizador de inactividad.
   */
  stopMonitoring() {
    this.clearTimeout();
    window.removeEventListener('mousemove', this.resetTimer.bind(this));
    window.removeEventListener('mousedown', this.resetTimer.bind(this));
    window.removeEventListener('keypress', this.resetTimer.bind(this));
    window.removeEventListener('touchstart', this.resetTimer.bind(this));
    window.removeEventListener('scroll', this.resetTimer.bind(this));
  }

  /*startMonitoring() {
    this.resetTimer();

    ['click', 'mousemove', 'keydown', 'scroll'].forEach(event => {
      document.addEventListener(event, () => this.resetTimer());
    });
  }*/


  /**
   * Resetea el temporizador de inactividad.
   * Se llama cada vez que se detecta actividad del usuario. Si no se detecta actividad dentro del tiempo límite, se cierra la sesión.
   */
  private resetTimer() {
    this.clearTimeout();
    this.timeoutId = setTimeout(() => this.logoutUser(), this.inactivityTimeLimit);
  }
  
  /*resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.logout(), this.timeoutDuration);
  }*/


    /**
   * Limpia el temporizador de inactividad si está activo.
   * Se asegura de que no haya temporizadores pendientes antes de configurar uno nuevo o cuando se detiene el monitoreo.
   */
  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }


  /**
   * Cierra la sesión del usuario y redirige a la página de inicio de sesión.
   * Se llama automáticamente si el usuario permanece inactivo durante el tiempo definido (inactivityTimeLimit).
   */
  private logoutUser() {
    // Lógica para cerrar sesión
    localStorage.removeItem('nickUsuario');
    this.stopMonitoring();
    localStorage.setItem('usuarioInactivo', 'true');  // Marcar el usuario como desconectado por inactividad en localStorage
    this.router.navigate(['/inicio-sesion']); // Redirige a la página de inicio de sesión
    alert('Has sido desconectado por inactividad.');
  }


  logout() {
    this.usuarioService.cerrarSesionInactiva(); // Llama al método de cerrar sesión en tu servicio de usuario
    this.router.navigate(['/inicio-sesion']); // Redirige a la página de inicio de sesión
    alert('Sesión cerrada por inactividad.');
  }
}
