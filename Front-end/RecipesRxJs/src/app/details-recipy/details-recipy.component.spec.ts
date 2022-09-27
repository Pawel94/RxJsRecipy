import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecipyComponent } from './details-recipy.component';

describe('DetailsRecipyComponent', () => {
  let component: DetailsRecipyComponent;
  let fixture: ComponentFixture<DetailsRecipyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRecipyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRecipyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
