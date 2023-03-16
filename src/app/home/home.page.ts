import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IonReorderGroup } from '@ionic/angular';
import { ModaldialogComponent } from '../modaldialog/modaldialog.component';
import { StorageService } from '../service/storage.service';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    private db: StorageService,
    private datePipe: DatePipe
  ) { }
  tasks: any = [];

  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;

  ngOnInit() {
    this.tasks = this.db.getTasklist();
    console.log(this.tasks);
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: ModaldialogComponent
    });
    return await modal.present();
  }

  async updateTask(id: number) {
    const modal = await this.modalController.create({
      component: ModaldialogComponent,
      componentProps: {
        taskId: id
      }
    });
    const slidingItem = document.getElementById('slidingItem') as any;
    slidingItem.closeOpened();
    return await modal.present();
  }

  removeTask(id: number) {
    this.db.delTask(id);
    this.removeToast();
    this.tasks = this.db.getTasklist();
  }

  async removeToast() {
    const toast = await this.toastController.create({
      message: 'Task removed',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  changeStatus(id: number, status: string) {
    this.db.taskStatus(id, status);
  }
  reorderList(ev: any) {
    ev.detail.complete();
  }

  change(event) {
    console.log(event);
  }

  dateFormat(date, format) {
    return this.datePipe.transform(date, format);
  }

}