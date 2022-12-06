import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'historico-de-precos';
  year: number;
  constructor() {
    this.year = new Date().getFullYear();
  }
}
