import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveChooseModalComponent } from './archive-choose-modal.component';

describe('ArchiveChooseModalComponent', () => {
  let component: ArchiveChooseModalComponent;
  let fixture: ComponentFixture<ArchiveChooseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveChooseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveChooseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
