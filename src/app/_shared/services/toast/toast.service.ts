import { Injectable } from '@angular/core';
import { ToastaService, ToastOptions } from 'ngx-toasta';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastaService: ToastaService,
  ) {
  }

  TOAST_TYPES = {
    ERROR: 'Error',
    SUCCESS: 'Success',
    WAIT: 'Wait',
    INFO: 'Info',
    WARNING: 'Warning'
  }

  addToast(title, msg) {
    var toastOptions: ToastOptions = {
      title,
      msg,
      showClose: true,
      timeout: 5000,
      theme: 'bootstrap',
    };
    // Add see all possible types in one shot
    switch (title) {
      case this.TOAST_TYPES.ERROR: this.toastaService.error(toastOptions);
        break;
      case this.TOAST_TYPES.SUCCESS: this.toastaService.success(toastOptions);
        break;
      case this.TOAST_TYPES.WAIT: this.toastaService.wait(toastOptions);
        break;
      case this.TOAST_TYPES.INFO: this.toastaService.info(toastOptions);
        break;
      case this.TOAST_TYPES.WARNING: this.toastaService.warning(toastOptions);
        break;

    }
  }

}
