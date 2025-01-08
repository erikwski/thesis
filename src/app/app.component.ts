import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [InputTextModule, ButtonModule, DialogModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  protected router = inject(Router)
  codDipendente = "";
  visibile = true;
  
  ngOnInit(): void {
      if(localStorage.getItem("user")){
        this.router.navigate(['magazzino']);
        this.visibile = false;
      }
  }

  login() {
    localStorage.setItem('user', this.codDipendente);
    this.router.navigate(["magazzino"])
    this.visibile = false;

  }
}
