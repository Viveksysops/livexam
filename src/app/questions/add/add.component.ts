import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'

import { HttpService } from '../../_shared/services/http/http.service';
import { ToastService } from '../../_shared/services/toast/toast.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
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
  checked: Boolean = false
  questionData: FormGroup = this.fb.group({
    questionText: ['', Validators.required],
    subject: ['', Validators.required],
    topic: [''],
    type: ['', Validators.required],
    diffLevel: ['', Validators.required],
    rightMarks: ['', Validators.required],
    wrongMarks: ['', Validators.required],
    options: this.fb.array([this.createOption()])
  });
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private toast: ToastService) {

  }
  ngOnInit() {
  }

  createOption(): FormGroup {
    return this.fb.group({
      option: '',
      isCorrect: false
    });
  }
  valueChanged(t) {
    let opt = t.option
    this.questionData.get('options').value.forEach(element => {
      if (opt !== element.option && element.isCorrect == true) {
        element.isCorrect = false;
      }
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
    this.httpService.get(`subject/getAll/${ev}`).subscribe((data: any) => {
      this.subjectArray = data.docs;
    })
  }

  /***After submitting the form***/
  onSubmit(form) {

    if (this.subject !== undefined && this.topic !== undefined) {
      console.log(form.value.topic)
      let subjectId = this.subject
      let topicId = this.topic;
      let { type, diffLevel, tags, questionText, rightMarks, wrongMarks, options, solution } = form.value;
      let obj = {
        question:
          { type, diffLevel, subjectId, tags, topicId, questionText, rightMarks, wrongMarks, options, solution }
      }
      this.httpService.post('question/save', obj).subscribe((data) => {
        console.log(data)
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
        this.questionData.reset();

      })
    } else if (this.subject !== undefined && this.topic === undefined) {
      this.httpService.get(`topic${this.topicName}/${this.subject}`).subscribe(data => {
        if (data['docs'].length === 0) {
          let obj = {
            topName: this.topicName,
            subjectId: this.subject
          }
          this.httpService.post(`topic/save/`, obj).subscribe(data => {
            this.topic = data['docs']._id
            let subjectId = this.subject;
            let topicId = this.topic;

            let { type, diffLevel, tags, questionText, rightMarks, wrongMarks, options, solution } = form.value;
            let obj = {
              question:
                { type, diffLevel, subjectId, tags, topicId, questionText, rightMarks, wrongMarks, options, solution }
            }
            this.httpService.post('question/save', obj).subscribe((data) => {
              this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
              this.topic = undefined;
              this.subject = undefined
              this.questionData.reset();
            })
          })
        }
      })
    } else {
      this.httpService.get(`subject/${this.topicName}`).subscribe(data => {
        if (data['docs'].length === 0) {
          this.httpService.post(`subject/save/${this.subjectName}`).subscribe(data => {
            this.subject = data['docs']._id
            let obj = {
              topName: this.topicName,
              subjectId: this.subject
            }
            this.httpService.post(`topic/save/`, obj).subscribe(data => {
              this.topic = data['docs']._id
              let subjectId = this.subject;
              let topicId = this.topic;

              let { type, diffLevel, tags, questionText, rightMarks, wrongMarks, options, solution } = form.value;
              let obj = {
                question:
                  { type, diffLevel, subjectId, tags, topicId, questionText, rightMarks, wrongMarks, options, solution }
              }
              this.httpService.post('question/save', obj).subscribe((data) => {
                this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
                this.subject = undefined
                this.topic = undefined
                this.questionData.reset();

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
      this.httpService.get(`topic/getAll/${topic}/${subject_id}`).subscribe((data: any) => {
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