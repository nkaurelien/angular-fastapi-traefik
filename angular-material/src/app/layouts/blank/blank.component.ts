import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: [],
  imports: [RouterOutlet, MaterialModule, CommonModule],
})
export class BlankComponent {
  private htmlElement!: HTMLHtmlElement;

  constructor() {
    this.htmlElement = document.querySelector('html')!;
  }
}
