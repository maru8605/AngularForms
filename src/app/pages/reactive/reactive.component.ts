import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  get nombreNoValido() {
    return (
      this.forma.get('nombre').invalid &&
      this.forma.get('nombre').untouched 
      
    );
  }

  get apellidoNoValido() {
    return (
      this.forma.get('apellido').invalid &&
      this.forma.get('apellido').untouched 
      
    );
  }
  get correoNoValido() {
    return (
      this.forma.get('correo').invalid &&
      this.forma.get('correo').untouched 
      
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]], //segundo argumentos son los validadores sincronos
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  guardar() {
    console.log(this.forma);
    

    // if (this.forma.invalid) {
    //   Object.values(this.forma.controls).forEach((control) => {
    //     control.markAsTouched();
    //   });
    // }
  }
}
