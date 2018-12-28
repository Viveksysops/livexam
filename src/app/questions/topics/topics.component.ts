import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HttpService } from '../../_shared/services/http/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  topicsArray: any;
  subjectArray: any;
  topicData: FormGroup = this.fb.group(
    {
      topicName: ['', Validators.required],
      subjectId: ['', Validators.required]

    }
  )

  constructor(private http: HttpService, private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.http.get('topic/').subscribe(data => {
      console.log(data['docs'])
      this.topicsArray = data['docs']
    })
    this.http.get('subject/getAll/').subscribe(data => {
      console.log(data['docs'])
      this.subjectArray = data['docs']
    })
  }

  delete(topic) {
    console.log(topic)
    let _id = topic._id
    this.http.delete(`topic/delete/${_id}`).subscribe(data => {
      this.http.get('topic').subscribe(data => {
        console.log(data)
        this.topicsArray = data['docs']
      })
    })
  }

  submit(formData) {
    let obj = {
      topName: formData.value.topicName,
      subjectId: formData.value.subjectId
    }
    this.http.post('topic/save/', obj).subscribe(data => {
      this.http.get('topic').subscribe(data => {
        console.log(data['docs'])
        this.topicsArray = data['docs']
        this.topicData.reset()
      })
    })
  }
}
