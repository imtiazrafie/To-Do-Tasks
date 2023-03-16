import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-modaldialog',
  templateUrl: './modaldialog.component.html',
  styleUrls: ['./modaldialog.component.scss'],
})
export class ModaldialogComponent implements OnInit {
  @Input() taskId: number;
  pgTitle: string;
  otask: any;
  public taskForm: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    public toastController: ToastController,
    private fb: FormBuilder,
    private db: StorageService
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      priority: ['', Validators.required]
    });

    if (this.taskId > -1) {
      this.otask = this.db.getTask(this.taskId);
      this.pgTitle = 'Edit';
      this.taskForm.get('task').setValue(this.otask.task);
      this.taskForm.get('priority').setValue(this.otask.priority);
    } else {
      this.pgTitle = 'Add';
    }
  }

  submitForm(objFrm: any): void {
    const objTask = {
      task: objFrm.task,
      priority: objFrm.priority,
      status: (this.taskId > -1) ? this.otask.status : 'pending'
    };
    (this.taskId > -1) ? this.db.editTask(this.taskId, objTask) : this.db.addTask(objTask);
    this.dismiss();
    this.saveToast();
  }

  async saveToast() {
    const toast = await this.toastController.create({
      message: (this.taskId > -1) ? 'Task updated' : 'Task added',
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
