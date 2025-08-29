import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-register-page',
  standalone: true, 
  imports: [],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  buttonHideBuys =signal(true);
  // Controlamos si el formulario se muestra o no
  buttonHideForm = signal(false);

  showBuys() {
    this.buttonHideBuys.set(true);
  }

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
}
