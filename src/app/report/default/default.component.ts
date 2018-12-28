import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../_shared/services/http/http.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  report:Array<any>

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.http.get('report').subscribe(
      data => {
        this.report = data['docs']
        console.log('this.report', this.report)
      },
      err => {
        console.log('err', err)
      }
    )
  }

}
