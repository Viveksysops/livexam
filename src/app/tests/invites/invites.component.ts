import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { HttpService } from '../../_shared/services/http/http.service';
import { ToastService } from '../../_shared/services/toast/toast.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss']
})
export class InvitesComponent implements OnInit {
  todayDate: Date = new Date()
  today: any
  list: Array<any>
  testList: Array<any>
  invitesForm = this.fb.group(
    {
      testLibraryId: [''],
      email: [''],
      expiry: [Date]
    }
  )
  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private toast: ToastService,

  ) {
    this.today = this.todayDate.getFullYear() + '-' + (this.todayDate.getMonth() + 1) + '-' + this.todayDate.getDate()
  }

  ngOnInit() {
    this.http.get('testLibrary/published').subscribe(
      data => {
        console.log(data['docs'])
        this.testList = data['docs']
      },
      err => {
        console.log('err', err)
      }
    )

    this.getInvitesList()
  }

  getInvitesList() {
    this.http.get('testInvite').subscribe(
      data => {
        this.list = data['docs'].map(item => {
          item.expiry = new Date(item.expiry)
          return item;
        })
      },
      err => {
        console.log('err', err)
      }
    )
  }

  submit() {
    console.log('instructionForm', this.invitesForm.value)
    this.http.post('testInvite', this.invitesForm.value).subscribe(
      data => {
        this.getInvitesList()
        this.invitesForm.setValue({
          testLibraryId: '',
          email: '',
          expiry: Date
        })
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
      },
      err => {
        console.log('err', err);
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err.error['message'])
      }
    )
  }
  delete(id) {
    this.http.delete(`testInvite/${id}`).subscribe(
      data => {
        this.getInvitesList()
      },
      err => {
        console.log('err', err)
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err.error['message'])
      }
    )
  }
}
