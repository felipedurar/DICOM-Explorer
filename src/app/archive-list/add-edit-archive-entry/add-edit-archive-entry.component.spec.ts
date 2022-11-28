import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditArchiveEntryComponent } from './add-edit-archive-entry.component';

describe('AddEditArchiveEntryComponent', () => {
  let component: AddEditArchiveEntryComponent;
  let fixture: ComponentFixture<AddEditArchiveEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditArchiveEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditArchiveEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
