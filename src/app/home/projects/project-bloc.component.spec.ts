import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBlocComponent } from './project-bloc.component';

describe('ProjectBlocComponent', () => {
  let component: ProjectBlocComponent;
  let fixture: ComponentFixture<ProjectBlocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBlocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
