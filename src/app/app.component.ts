import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [InputTextModule, ButtonModule, DialogModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  protected router = inject(Router)
  protected loginService = inject(LoginService)
  codDipendente = "";
  visibile = true;
  
  ngOnInit(): void {
      if(localStorage.getItem("user")){
        this.router.navigate(['magazzino']);
        this.visibile = false;
      }
  }

  login() {
    this.loginService.login(this.codDipendente)
    this.router.navigate(["magazzino"])
    this.visibile = false;
  }
}
