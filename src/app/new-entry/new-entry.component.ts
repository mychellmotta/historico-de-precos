import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent implements OnInit {
  param: number;
  constructor(private route: ActivatedRoute) {
      this.param = +this.route.snapshot.paramMap.get('param')!;
   }

  ngOnInit(): void {
  }

}
