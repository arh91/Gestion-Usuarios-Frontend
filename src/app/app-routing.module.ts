import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { SesionIniciadaComponent } from './sesion-iniciada/sesion-iniciada.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { ModificarDatosUsuarioComponent } from './modificar-datos-usuario/modificar-datos-usuario.component';
import { PantallaInicialComponent } from './pantalla-inicial/pantalla-inicial.component';
import { SolicitarCodigoComponent } from './solicitar-codigo/solicitar-codigo.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CuentaRecuperadaComponent } from './cuenta-recuperada/cuenta-recuperada.component';


const routes: Routes = [
  { path: '', component: PantallaInicialComponent },
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'sesion-iniciada', component: SesionIniciadaComponent },
  { path: 'lista-usuarios', component: ListaUsuariosComponent },
  { path: 'datos-usuario/:nick', component: DatosUsuarioComponent },
  { path: 'modificar-datos-usuario', component: ModificarDatosUsuarioComponent },
  { path: 'solicitar-codigo', component: SolicitarCodigoComponent },
  { path: 'actualizar-contraseña', component: UpdatePasswordComponent },
  { path: 'cuenta-recuperada', component: CuentaRecuperadaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
