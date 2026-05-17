import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginFacade } from '../facade/login.facade';
import { ButtonComponent, NotificationComponent } from '@org/ui-kit';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, NotificationComponent],
  providers: [LoginFacade],
  templateUrl: './login.view.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public facade = inject(LoginFacade);
}
