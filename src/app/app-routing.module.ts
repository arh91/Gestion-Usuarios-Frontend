import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { SesionIniciadaComponent } from './sesion-iniciada/sesion-iniciada.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { ModificarDatosUsuarioComponent } from './modificar-datos-usuario/modificar-datos-usuario.component';
import { PantallaInicialComponent } from './pantalla-inicial/pantalla-inicial.component';


const routes: Routes = [
  { path: '', component: PantallaInicialComponent },
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'sesion-iniciada', component: SesionIniciadaComponent },
  { path: 'lista-usuarios', component: ListaUsuariosComponent },
  { path: 'datos-usuario/:nick', component: DatosUsuarioComponent },
  { path: 'modificar-datos-usuario', component: ModificarDatosUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
