import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

import { HttpService } from "./../../_shared/services/http/http.service";
import { ToastService } from 'src/app/_shared/services/toast/toast.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  instructions: any
  testForm = this.fb.group(
    {
      name: [''],
      description: [''],
      instructionId: [''],
      duration: [''],
      noOfQuestions: [''],
      marks: [''],
      passingScore: [''],
    }
  )
  formIncomplete: boolean = true

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,

  ) { }

  ngOnInit() {
    this.http.get('instructions').subscribe(
      data => {
        this.instructions = data['docs']
      },
      err => {
        console.log('err', err)
      }
    )
  }

  submit() {
    this.http.post('testlibrary', this.testForm.value).subscribe(
      data => {
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
        this.router.navigate(['/tests/default']);
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
      }
    )
  }
}
