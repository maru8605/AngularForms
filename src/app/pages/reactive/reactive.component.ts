import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarData();
    this.crearListener();
  }

  ngOnInit(): void {}

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return (
      this.forma.get('apellido').invalid && this.forma.get('apellido').touched
    );
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido() {
    return (
      this.forma.get('usuario').invalid && this.forma.get('usuario').touched
    );
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return pass1 === pass2 ? false : true;
  }

  get calleNoValido() {
    return (
      this.forma.get('direccion.calle').invalid &&
      this.forma.get('direccion.calle').touched
    );
  }

  get localidadNoValido() {
    return (
      this.forma.get('direccion.localidad').invalid &&
      this.forma.get('direccion.localidad').touched
    );
  }

  crearFormulario() {
    this.forma = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]], //segundo argumentos son los validadores sincronos
        apellido: [
          '',
          [
            Validators.required,
            this.validadores.noMoreno,
            Validators.minLength(3),
          ],
        ],
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        usuario: ['', , this.validadores.existeUsuario],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        direccion: this.fb.group({
          calle: ['', [Validators.required]],
          localidad: ['', [Validators.required]],
        }),
        pasatiempos: this.fb.array([]),
      },
      {
        Validators: this.validadores.coincidenciaPass('pass1', 'pass2'),
      }
    );
  }

  crearListener() {
    this.forma.valueChanges.subscribe(valor => {
      console.log(valor)
    })

    this.forma.statusChanges.subscribe(status => console.log({ status }))
    
    //si quisieramos obtener datos de un solo campo
    // this.forma.get('nombre').valueChanges.subscribe( console.log(valor))
  }

  cargarData() {
    //this.forma.setValue -> debemos cragar todo el objeto
    //this.forma.reset -> podemos cargar solo algunas propiedades del objeto y funciona igual
    this.forma.reset({
      nombre: 'Maru',
      apellido: 'Suarez',
      correo: 'maru@hotmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        calle: 'chañar 4867',
        localidad: 'Isidro Casanova',
      },
    });

    //si quiero cargar data predeterminada a la tabla
    // ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)))

    // Tambien se puede usar el setValue pero perdemos flexibilidad
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    // si quiero setear propiedades despues de resetear -> this.forma.reset({nombre:'maru', })
    this.forma.reset();
  }
}
