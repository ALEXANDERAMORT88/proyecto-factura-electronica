import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-register-page',
  standalone: true, 
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
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
  showForm() {
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

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmacionEmail: ['',[Validators.required, Validators.email]],
      passwordIngreso: ['', [Validators.required, Validators.minLength(6)]],
      confirmacionPassword: ['', Validators.required]
    });
  }


  // ngOnInit() {
  //   if (this.registerForm.invalid) {
  //     this.registerForm.markAllAsTouched() // Marca todos los campos como tocados.
  //     return;
  //   }
  //   console.log("Formulario válido ✅", this.registerForm.value);
  // }

  // // Getter Para acceder facimente a los campos del formulario
  get f() { return this.registerForm.controls }

  // // Método para el envio del formulario
  onSubmit() {
    this.submitted = true;

    // Se detiene aquí si el formulario se inválido
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if (this.f['email'].value !== this.f['confirmacionEmail'].value) {
      this.f['confirmacionEmail'].setErrors({ emailMismatch: true });
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.f['passwordIngreso'].value !== this.f['confirmacionPassword'].value) {
      this.f['confirmacionPassword'].setErrors({ passwordMismatch: true });
      return;
    }
    // si todo es valido, aquí creamos la lógica de envio de datos.
    console.log("Formulario valido, datos enviados: ", this.registerForm.value);
  }
}
