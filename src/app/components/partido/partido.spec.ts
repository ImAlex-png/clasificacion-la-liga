import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Partido } from './partido';

describe('Partido', () => {
  let component: Partido;
  let fixture: ComponentFixture<Partido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Partido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Partido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
