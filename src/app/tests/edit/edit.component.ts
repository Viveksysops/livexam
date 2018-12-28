import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { HttpService } from "./../../_shared/services/http/http.service";
import { ToastService } from 'src/app/_shared/services/toast/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  instructions: any
  testId: any
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
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      this.testId = params['id']
      this.http.get(`testlibrary/${this.testId}`).subscribe(
        data => {
          console.log('data', data)
          let { name, description, instructionId: { _id }, marks, noOfQuestions, passingScore, duration } = data['docs']

          this.testForm.setValue({ name, description, instructionId: _id, marks, noOfQuestions, passingScore, duration })
        },
        err => {
          console.log('err', err)
        }
      )
    })
  }

 
  submit() {
    console.log('this.testForm.value', this.testForm.value)
    this.http.put(`testlibrary/${this.testId}`, this.testForm.value).subscribe(
      data => {
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
        this.router.navigate(['/tests/default']);
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
        console.log('err', err)
      }
    )
  }
}