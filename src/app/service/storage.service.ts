import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  tasks: any = [];

  getTasklist() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
      return this.tasks;
    } else {
      return this.tasks;
    }
  }

  addTask(objTask: any) {
    const oTask = {
      task: objTask.task,
      priority: objTask.priority,
      status: objTask. status
    };
    this.tasks.unshift(oTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTask(idx: number) {
    return this.tasks.find((currentValue: any, index: number) => index === idx);
  }

  editTask(idx: number, objTask: any) {
    const task = this.tasks.find((currentValue: any, index: number) => index === idx);
    task.task = objTask.task;
    task.priority = objTask.priority;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  delTask(idx: number) {
    this.tasks = this.tasks.filter((currentValue: any, index: number) => index !== idx);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  taskStatus(idx: number, status: string) {
    const task = this.tasks.find((currentValue: any, index: number) => index === idx);
    task.status = (status === 'pending') ? 'done' : 'pending';
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
