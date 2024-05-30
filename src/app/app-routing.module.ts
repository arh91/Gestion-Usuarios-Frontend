import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroProductoComponent } from './registro-producto/registro-producto.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { SesionIniciadaComponent } from './sesion-iniciada/sesion-iniciada.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';


const routes: Routes = [
  { path: '', component: RegistroUsuarioComponent },
  { path: 'registro-producto', component: RegistroProductoComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'sesion-iniciada', component: SesionIniciadaComponent },
  { path: 'lista-usuarios', component: ListaUsuariosComponent },
  { path: 'datos-usuario', component: DatosUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
