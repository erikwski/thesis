import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStore } from './store/global.store';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class LogoutComponent implements OnInit{
  protected router = inject(Router);
  protected store = inject(GlobalStore);

  ngOnInit(): void {
      this.store.logout();
      this.router.navigate(["/"])
  }
}



