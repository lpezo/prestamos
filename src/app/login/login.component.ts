import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { ApiService } from '../api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from '../shared/user.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ownerForm: FormGroup;
  hide = true;
  constructor(
    //private apiService: ApiService,
    private authenticate: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ownerForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl(null, [Validators.required])
    });

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  login(ownerFormValue) {
    if (this.ownerForm.valid) {
      let w_correo = ownerFormValue.correo;
      let w_clave = ownerFormValue.clave;
      
      //this.apiService.login(w_correo, w_clave).subscribe((data: any)=>{
      this.authenticate.login(w_correo, w_clave).subscribe((data: User)=>{
        if (data == null){
          this.toastr.error("No se pudo ingresar al sistema, revise su usuario o clave", "Error");
          //localStorage.removeItem('currentuser');
        }
        else {
          //let curuser = { 'correo': data.correo, 'id': data.id, 'nombres': data.nombres, 'apellidos': data.apellidos};
          //localStorage.setItem('currentuser', JSON.stringify(data));
          this.router.navigate(['/']);
        }
      })
    }
  }

}
