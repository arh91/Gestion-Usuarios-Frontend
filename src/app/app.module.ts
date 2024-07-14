import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistroProductoComponent } from './registro-producto/registro-producto.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { UsuarioService } from '../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { SesionIniciadaComponent } from './sesion-iniciada/sesion-iniciada.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroProductoComponent,
    RegistroUsuarioComponent,
    InicioSesionComponent,
    SesionIniciadaComponent,
    ListaUsuariosComponent,
    DatosUsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
