import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { HttpService } from "./../../_shared/services/http/http.service";
import { ToastService } from '../../_shared/services/toast/toast.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  testList: any;
  constructor(
    private http: HttpService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.setTestLibrary()
  }

  setTestLibrary() {
    this.http.get('testlibrary').subscribe(
      data => {
        this.testList = data['docs'];
      },
      err => {
        console.log('err', err)
      }
    )
  }

  delete(id) {
    this.http.delete(`testlibrary/${id}`).subscribe(
      data => {
          this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message']);
          this.setTestLibrary()
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
      }
    )
  }
  publishTest(id) {
    this.http.get(`testlibrary/publish/${id}`).subscribe(
      data => {
        if (data['status'] != 'error') {
          this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message']);
          this.setTestLibrary()
        } else {
          this.toast.addToast(this.toast.TOAST_TYPES.ERROR, data['message']);
        }
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message']);
      }
    )
  }

}


