import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-error-global',
  templateUrl: './error-global.component.html',
  styleUrls: ['./error-global.component.css']
})
export class ErrorGlobalComponent implements OnInit {
  ErrorID :number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.ErrorID = +this.route.snapshot.paramMap.get('id');
  }

}