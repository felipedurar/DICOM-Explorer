import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DicomMetaData from '../models/dicom-meta-data';
import StudyModel from '../models/study.model';
import { ArchiveStoreService } from '../services/archive-store.service';
import { StudyService } from '../services/study.service';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.css']
})
export class StudyListComponent implements OnInit {

  public loading = true;
  

  public studies: StudyModel[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private studyService: StudyService, private archiveStoreService: ArchiveStoreService) { }

  ngOnInit(): void {
    const archiveId = this.route.snapshot.queryParams["archiveId"];
    if (!archiveId)
      this.router.navigate(['/archive-list']);
    this.archiveStoreService.currentArchive.next(this.archiveStoreService.pacsArchives.value.filter(x => x.ID == archiveId)[0])
    
    this.loadStudies();
  }

  loadStudies() {
    this.studyService.listStudies(0, 20).subscribe((result: any) => {
      console.log(result);

      result.forEach((cStudy: any) => {
        this.studies.push(new StudyModel(cStudy));
        
      });

      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  back() {
    this.router.navigate(['/archive-list']);
  }

  openStudy(cStudy: StudyModel) {
    this.router.navigate(['/study-view'], { queryParams: { archiveId: this.archiveStoreService.currentArchive.value?.ID, studyInstanceUID: cStudy.StudyInstanceUID } });
  }

}
