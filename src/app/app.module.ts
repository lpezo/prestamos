import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule }  from '@angular/material/grid-list';
import { MatDialogModule }  from '@angular/material/dialog';
import { SolicitarComponent } from './solicitar/solicitar.component';
import { TerminosComponent } from './terminos/terminos.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { AsociarComponent } from './asociar/asociar.component';
import { EstadoComponent } from './estado/estado.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { DesembolsoComponent } from './desembolso/desembolso.component';
import { AdminComponent } from './admin/admin.component';
import { PassarelaComponent } from './passarela/passarela.component';

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatGridListModule,
  MatDialogModule,
  MatTableModule,
  MatDatepickerModule,
  MatMomentDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SolicitarComponent,
    TerminosComponent,
    RegistrarComponent,
    LoginComponent,
    DialogConfirmComponent,
    AsociarComponent,
    EstadoComponent,
    PendientesComponent,
    DesembolsoComponent,
    AdminComponent,
    PassarelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-left'
    }),
    materialModules
  ],
  exports: [materialModules],
  bootstrap: [AppComponent],
  entryComponents: [TerminosComponent]
})
export class AppModule { }
