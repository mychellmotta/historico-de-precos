import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() year?: number;
  github: string;
  constructor() {
    // this.year = new Date().getFullYear();
    this.github = "https://github.com/mychellmotta/historico-de-precos";
  }

  ngOnInit(): void {}
}
