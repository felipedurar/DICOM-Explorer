import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import InstanceModel from '../models/instance.model';
import SerieModel from '../models/serie.model';
import StudyModel from '../models/study.model';
import { ArchiveStoreService } from '../services/archive-store.service';
import { InstanceService } from '../services/instance.service';
import { SerieService } from '../services/serie.service';
import { StudyService } from '../services/study.service';
import { WADOService } from '../services/wado.service';

@Component({
  selector: 'app-study-view',
  templateUrl: './study-view.component.html',
  styleUrls: ['./study-view.component.css']
})
export class StudyViewComponent implements OnInit {

  public loading = true;

  public study: StudyModel | null = null;
  public series: SerieModel[] = [];

  public currentSerie: SerieModel | null = null;
  public cSerie: number = 0;
  public cInstance: number = 0;
  public cFrame: number = 1;

  public currentImageUrl: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private archiveStoreService: ArchiveStoreService,
    private studyService: StudyService, private serieService: SerieService, private instanceService: InstanceService, private wadoService: WADOService) { }

  ngOnInit(): void {
    const archiveId = this.route.snapshot.queryParams["archiveId"];
    if (!archiveId)
      this.router.navigate(['/archive-list']);
    this.archiveStoreService.currentArchive.next(this.archiveStoreService.pacsArchives.value.filter(x => x.ID == archiveId)[0])

    const studyInstanceUID = this.route.snapshot.queryParams["studyInstanceUID"];
    if (!studyInstanceUID)
      this.router.navigate(['/archive-list']);

    this.loadStudy(studyInstanceUID);

    setTimeout(() => {
      document.getElementById('viewport')?.addEventListener('wheel', this.mouseWheel.bind(this));
    }, 1000);
  }

  loadStudy(studyInstanceUID: string) {
    this.studyService.getStudy(studyInstanceUID).subscribe((result: any) => {

      if (result.length == 0) {
        // err
      }

      this.study = new StudyModel(result[0]);
      this.loading = false;
      this.loadSeries(studyInstanceUID);
    });

  }

  loadSeries(studyInstanceUID: string) {
    this.serieService.listSeries(studyInstanceUID).subscribe((resultSeries: any) => {
      resultSeries.forEach((cSerie: any) => {
        const serieInst = new SerieModel(cSerie);
        
        this.instanceService.listInstancesPaged(studyInstanceUID, serieInst.SeriesInstanceUID, 0, 5).subscribe((resultInstances: any) => {
          if (resultInstances.length > 0) {
            const cInstance = new InstanceModel(resultInstances[0]);
            serieInst.ImagePreviewURL = this.wadoService.genWadoFrameURL(studyInstanceUID, serieInst.SeriesInstanceUID, cInstance.SOPInstanceUID, 1);
          }
        });
        this.series.push(serieInst);
      });

      this.loadSerie(0);
    });
  }

  loadSerie(index: number) {
    this.currentSerie = this.series[index];
    
    this.instanceService.listInstances(this.study?.StudyInstanceUID as string, this.currentSerie.SeriesInstanceUID).subscribe((resultInstances: any) => {
      for (let cInstanceMetaData of resultInstances) {
        const cInstance = new InstanceModel(cInstanceMetaData);
        this.currentSerie?.instances.push(cInstance);
      }

      this.currentSerie?.instances.sort((a, b) => a.InstanceNumber - b.InstanceNumber);

      this.cInstance = 0;
      this.cFrame = 1;
      this.updateImgUrl();
    });

  }

  instanceChange(value: string) {
    //console.log(value);
    this.cFrame = 1;
    this.cInstance = parseInt(value);
    this.updateImgUrl();
  }

  frameChange(value: string) {
    this.cFrame = parseInt(value);
    this.updateImgUrl();
  }

  updateImgUrl() {
    this.currentImageUrl = this.wadoService.genWadoFrameURL(this.study?.StudyInstanceUID as string, this.currentSerie?.SeriesInstanceUID as string, 
      this.currentSerie?.instances[this.cInstance].SOPInstanceUID as string, this.cFrame);
  }

  mouseWheel(ev: WheelEvent) {
    if (!!this.currentSerie) {
      if (!!this.currentSerie.instances[this.cInstance]) {
        if (this.currentSerie.instances[this.cInstance].NumberOfFrames == -1) {
          if (ev.deltaY > 0 && this.cInstance < this.currentSerie.instances.length - 1) this.cInstance++;
          if (ev.deltaY < 0 && this.cInstance > 0) this.cInstance--;
          this.updateImgUrl();
        } else {
          if (ev.deltaY > 0 && this.cFrame < this.currentSerie.instances[this.cInstance].NumberOfFrames) this.cFrame++;
          if (ev.deltaY < 0 && this.cFrame > 1) this.cFrame--;
          this.updateImgUrl();
        }
      }
    }
  }

  back() {
    this.router.navigate(['/study-list'], { queryParams: { archiveId: this.archiveStoreService.currentArchive.value?.ID } });
  }

}
