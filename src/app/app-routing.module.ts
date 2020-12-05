import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SolicitarComponent } from './solicitar/solicitar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';
//import { AppComponent } from './app.component';
import { AsociarComponent } from './asociar/asociar.component';
import { EstadoComponent } from './estado/estado.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { DesembolsoComponent } from './desembolso/desembolso.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'solicitar', component: SolicitarComponent},
  { path: 'registrar', component: RegistrarComponent},
  { path: 'login', component: LoginComponent},
  { path: 'asociar', component: AsociarComponent},
  //{ path: 'component', component: AppComponent},
  { path: 'estado', component: EstadoComponent },
  { path: 'pendiente', component: PendientesComponent },
  { path: 'desembolso', component: DesembolsoComponent},
  { path: 'admin', component: AdminComponent},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
