import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { rejects } from 'assert';
import { promises } from 'dns';
import { Observable } from 'rxjs';

interface UsuarioValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}

  noMoreno(control: FormControl): UsuarioValidate {
    if (control.value?.toLowerCase() === 'moreno') {
      return {
        noMoreno: true,
      };
    }

    return null;
  }

  coincidenciaPass(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1control = formGroup.controls[pass1Name];
      const pass2control = formGroup.controls[pass2Name];

      if (pass1control.value === pass2control.value) {
        pass2control.setErrors(null);
      } else {
        pass2control.setErrors({ noEsIgual: true });
      }
    };
  }

  existeUsuario(control: FormControl): Promise<UsuarioValidate> | Observable<UsuarioValidate> {
    
    if (!control.value) {
      return Promise.resolve(null)
    }
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if (control.value === 'pancha') {
          resolve({errorNombre: true})
        } else {
          resolve(null)
        }
      }, 3500);
      
    })
  }
}
