import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css']
})
export class GlobalErrorComponent implements OnInit {
 ErrorID :number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.ErrorID = +this.route.snapshot.paramMap.get('id');
  }

}
