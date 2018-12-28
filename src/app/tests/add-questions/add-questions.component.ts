import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from "lodash";

import { HttpService } from '../../_shared/services/http/http.service';
import { ToastService } from '../../_shared/services/toast/toast.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  id: any
  test: any
  questions = []
  subjects: Array<any>
  topics: Array<any>
  selectedSubject: any
  selectedTopic: any
  questionsRemaning: any
  questionsAdded = []
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private toast: ToastService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.http.get(`testlibrary/${this.id}`).subscribe(
        data => {
          this.test = data['docs']
          this.questionsAdded = this.test.questions
          this.questionsRemaning = this.test['noOfQuestions'] - this.test['questions'].length
        },
        err => {
          this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
        }
      )

      this.http.get('subject/getAll').subscribe(
        data => {
          this.subjects = data['docs']
        },
        err => {
          this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
        }
      )
    })
  }

  subjectChanged() {
    this.http.get(`topic/${this.selectedSubject}`).subscribe(
      data => {
        this.topics = data['docs']
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
      }
    )
  }

  loadQuestion() {
    this.http.get(`question/${this.selectedSubject}/${this.selectedTopic}`).subscribe(
      data => {
      this.questions=[]
        data['docs'].forEach(element => {
          if (!this.questionsAdded.find(e => e.question._id == element._id)) {
            this.questions.push({
              rightMarks: element.question.rightMarks,
              wrongMarks: element.question.wrongMarks,
              question: element
            })
          }
        });
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
      }
    )
  }

  addQuestion(item) {
    if (this.questionsRemaning > 0) {
      this.questionsAdded = [...this.questionsAdded, item]
      this.questions.splice(this.questions.indexOf(item), 1)
      this.questionsRemaning--
    } else {
      alert("To add more questions remove some")
    }
  }

  removeQuestion(item) {
    this.questionsAdded.splice(this.questionsAdded.indexOf(item), 1)
    this.questions = [...this.questions, item]
    this.questionsRemaning++
  }

  addSelectedQuestions() {
    this.http.put(`testlibrary/addquestions/${this.id}`, { questions: this.questionsAdded }).subscribe(
      data => {
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
        this.router.navigate(['/tests']);
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
      }
    )
  }
}
