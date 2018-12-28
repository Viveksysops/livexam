import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '../../_shared/services/http/http.service'
import { ToastService } from '../../_shared/services/toast/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  subjectArray: any;
  subject: any;
  correctOption: any;
  options: FormArray
  subjectName: any;
  topicsArray: any = [];
  select: boolean = false;
  richTextEditor: any = false;
  topic: any;
  topicName: any;
  questionId: any;
  questionData: FormGroup = this.fb.group({
    questionText: ['', Validators.required],
    subject: ['', Validators.required],
    topic: [''],
    type: ['', Validators.required],
    diffLevel: ['', Validators.required],
    rightMarks: ['', Validators.required],
    wrongMarks: ['', Validators.required],
    options: this.fb.array([])
  });
  constructor(private fb: FormBuilder,
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService) {

  }
  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.questionId = data.id;
      this.http.get(`question/${this.questionId}`).subscribe(
        data => {
          console.log(data['docs'])
          this.subjectName = data['docs'].question.subjectId.name
          this.topicName = data['docs'].question.topicId.name
          this.subject = data['docs'].question.subjectId._id
          this.topic = data['docs'].question.topicId._id
          let subject = this.subjectName
          let topic = this.topicName
          let arr = []
          let { diffLevel, questionText, rightMarks, wrongMarks, type, options } = data['docs'].question
          let option = <FormArray>this.questionData.controls.options;
          options.forEach(element => {
            let { option: opt, isCorrect } = element
            arr.push({
              option: opt,
              isCorrect
            })
            option.push(this.fb.group({
              option: opt,
              isCorrect
            }))
          });
          this.questionData.setValue({ subject, topic, diffLevel, questionText, rightMarks, wrongMarks, type, options: arr })
        },
        err => {
          console.log('err', err)
        }
      )
    })
  }

  createOption(): FormGroup {
    return this.fb.group({
      option: '',
      isCorrect: false
    });
  }
  /***Add options dynamically***/
  addOption(): void {
    this.options = this.questionData.get('options') as FormArray;
    this.options.push(this.createOption());
  }

  /***Remove options dynamically***/
  removeOption(i): void {
    this.options = this.questionData.get('options') as FormArray;
    this.options.removeAt(i);
  }

  /***Get matching subjects from Database***/
  subjectFieldChange(ev) {
    this.subject = undefined
    this.http.get(`subject/getAll/${ev}`).subscribe((data: any) => {
      this.subjectArray = data.docs;
    })
  }

  valueChanged(t) {
    let opt = t.option
    this.questionData.get('options').value.forEach(element => {
      if (opt !== element.option && element.isCorrect == true) {
        element.isCorrect = false;
      }
    });
  }
  /***After submitting the form***/
  onSubmit(form) {

    if (this.subject !== undefined && this.topic !== undefined) {
      let subjectId = this.subject
      let topicId = this.topic;
      let { type, diffLevel, tags, questionText, rightMarks, wrongMarks, options, solution } = form.value;
      let obj = {
        question:
          { type, diffLevel, subjectId, tags, topicId, questionText, rightMarks, wrongMarks, options, solution }
      }
      this.http.put(`question/${this.questionId}`, obj).subscribe((message) => {
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, 'Updated')
        this.router.navigate(['/questions/default', { subjectId: this.subject, topicId: this.topic }])

      })
    } else if (this.subject !== undefined && this.topic === undefined) {
      this.http.get(`topic${this.topicName}/${this.subject}`).subscribe(data => {
        if (data['docs'].length === 0) {
          let obj = {
            topName: this.topicName,
            subjectId: this.subject
          }
          this.http.post(`topic/save/`, obj).subscribe(data => {
            this.topic = data['docs']._id
            let subjectId = this.subject;
            let topicId = this.topic;

            let { type, diffLevel, tags, questionText, rightMarks, wrongMarks, options, solution } = form.value;
            let obj = {
              question:
                { type, diffLevel, subjectId, tags, topicId, questionText, rightMarks, wrongMarks, options, solution }
            }
            this.http.put(`question/${this.questionId}`, obj).subscribe((message) => {
              this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, 'Updated')
              this.router.navigate(['/questions/default', { subjectId: this.subject, topicId: this.topic }])
              this.topic = undefined;
              this.subject = undefined

            })
          })
        }
      })
    }
    else {
      this.http.get(`subject/${this.topicName}`).subscribe(data => {
        if (data['docs'].length === 0) {
          this.http.post(`subject/save/${this.subjectName}`).subscribe(data => {
            this.subject = data['docs']._id
            let obj = {
              topName: this.topicName,
              subjectId: this.subject
            }
            this.http.post(`topic/save/`, obj).subscribe(data => {
              this.topic = data['docs']._id
              let subjectId = this.subject;
              let topicId = this.topic;

              let { type, diffLevel, tags, questionText, rightMarks, wrongMarks, options, solution } = form.value;
              let obj = {
                question:
                  { type, diffLevel, subjectId, tags, topicId, questionText, rightMarks, wrongMarks, options, solution }
              }
              this.http.put(`question/${this.questionId}`, obj).subscribe((message) => {
                this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, 'Updated')
                this.router.navigate(['/questions/default', { subjectId: this.subject, topicId: this.topic }])
                this.subject = undefined
                this.topic = undefined

              })
            })
          })
        }
      })
    }
  }

  setSubject(subject) {
    this.subject = subject._id
    this.subjectName = subject.name
    this.subjectArray = [];
  }

  toggleRichTextEditor() {
    this.richTextEditor = !this.richTextEditor
  }

  topicFeildChange(topic) {
    if (topic !== '' && this.subject !== undefined) {
      let subject_id = this.subject
      this.http.get(`topic/getAll/${topic}/${subject_id}`).subscribe((data: any) => {
        this.topicsArray = data.docs;
      })
    }
  }

  setTopic(subject) {
    this.topic = subject._id
    this.topicName = subject.name
    this.topicsArray = [];
  }

}
