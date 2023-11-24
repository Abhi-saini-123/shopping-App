import { Component, OnInit } from '@angular/core';
import { AuthSrvice } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopping-App';
  // loadfeature = 'recipe';

  constructor(private authService: AuthSrvice){}

  ngOnInit(): void {
    this.authService.autoLognin();
  }

  }
