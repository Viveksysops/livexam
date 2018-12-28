import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpService } from '../../_shared/services/http/http.service';
import { ToastService } from '../../_shared/services/toast/toast.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {
  editId: any
  instructionForm = this.fb.group(
    {
      name: [''],
      content: [''],
    }
  )
  list: Array<any> = []
  constructor(
    private http: HttpService,
    private toast: ToastService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.setList()
  }

  setList() {
    this.http.get('instructions').subscribe(
      data => {
        this.list = data['docs'];
      },
      err => {
        console.log('err', err)
      }
    )
  }
  edit(id) {
    this.http.get(`instructions/${id}`).subscribe(
      data => {
        let { _id, name, content } = data['docs']
        this.instructionForm.setValue({ name, content })
        this.editId = _id
      },
      err => {
        console.log('err', err)
      },
    )
  }

  cancel() {
    this.editId = null
    this.instructionForm.reset()
  }


  delete(id) {
    this.http.delete(`instructions/${id}`).subscribe(
      data => {
        if (data['status'] == 'success') {
          this.setList()
          this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
        } else {
          this.toast.addToast(this.toast.TOAST_TYPES.ERROR, data['message'])
        }
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
      }
    )
  }

  update() {
    this.http.put(`instructions/${this.editId}`, this.instructionForm.value).subscribe(
      data => {
        this.setList()
        this.instructionForm.setValue({ name: "", content: "" })
        this.editId = null
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, data['message'])
      },
      err => {
        console.log('err', err)
      }
    )
  }
  submit() {
    this.http.post('instructions', this.instructionForm.value).subscribe(
      data => {
        this.list.push(data['docs'])
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, 'Instruction set created successfully')
        this.instructionForm.reset()
      },
      err => {
        this.toast.addToast(this.toast.TOAST_TYPES.ERROR, err['message'])
      }
    )
  }
}
