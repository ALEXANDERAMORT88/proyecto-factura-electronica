import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-register-page',
  standalone: true, 
  imports: [NgClass],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  //Controlamos que la sección de Compras
  buttonHideBuys = signal(true);

  // Controlamos si el formulario se muestra o no
  buttonHideForm = signal(false);

  //Método para mostrar la sección de compras
  showBuys() {
    this.buttonHideBuys.set(true);
  }

  // Método para ocultar la sección de cmopras
  hideBuys() {
    this.buttonHideBuys.set(false);
  }
  
  // Método para mostrar el formulario.
  showFrom() {
    this.buttonHideForm.set(true);
    this.hideBuys();
  }
  // Método para ocultar el formulario.
  hideForm() {
    this.buttonHideForm.set(false); 
    this.showBuys()
  }

  // Propiedad para el formulario reactivo 
  registerForm!: FormGroup;
  submitted = false; // Controlamos el estado del envío del formulario.

  // Utilizamos la función "inject" con la cúal podemos obtener y propocionar un servicio.
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.registerForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      numeroCelular: ['', Validators.required],
      emailUsuario: ['', Validators.required],
      confirmacionEmail: ['', Validators.required],
      passwordIngreso: ['', Validators.required],
      confirmacionPassword: ['', Validators.required]
    });
  }

  // Getter Para acceder facimente a los campos del formulario
  get f() { return this.registerForm.controls}

  // Método para el envio del formulario
  onSubmit() {
    this.submitted = true;

    // Se detiene aquí si el formulario se inválido
    if (this.registerForm.invalid) {
      return
    }
    // Validar que los emails conincidan 
    if (this.f['emailUsuario'].value !== this.f ['confirmacionEmail'].value) {
      this.f['confirmacionEmail'].setErrors({'emailMismatch': true});
      return
    }

    // Vlaidar que las contraseñas coincidan 
    if (this.f['passwordIngreso'].value !== this.f['confirmacionPassword'].value) {
      this.f['confirmacionPassword'].setErrors({'passwordMismatch': true});
    }

    // si todo es valido, aquí creamos la lógica de envio de datos.
    console.log("Formulario valido, datos enviados: ", this.registerForm.value);
  }
}
