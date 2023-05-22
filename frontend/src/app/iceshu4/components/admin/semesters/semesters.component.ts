import {Component} from '@angular/core';
import {SemesterService} from "./semester.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-semesters',
  templateUrl: './semesters.component.html',
  styleUrls: ['./semesters.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SemestersComponent {
  semesters: any;
  addSemester = false;
  form: FormGroup;
  dateCurrent = new Date();

  constructor(private semesterService: SemesterService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.semesterService.getAll().subscribe((data) => {
      this.semesters = data;
    })
  }

  get f() {
    return this.form?.controls;
  }

  getNumberOfDays(end: any) {
    const date1 = new Date();
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }


  createSemester() {

    if (this.form.invalid) {
      return;
    }

    this.semesterService.save(this.form.value).subscribe((data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Semester Created'});
        this.ngOnInit();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Semester creation failed'});
      }
    )
    this.addSemester = false;
  }

  deleteSemester(id: any) {
    this.semesterService.delete(id).subscribe((data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Semester deleted'});
        this.ngOnInit();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Semester deletion failed'});
      }
    )
  }


  confirm(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this semester?',
      header: 'Delete Semester',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSemester(id);
      }
    });
  }
}
