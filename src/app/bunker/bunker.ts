import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bunker',
  imports: [CommonModule],
  templateUrl: './bunker.html',
  styleUrl: './bunker.scss',
})
export class Bunker {

  date = new Date();

}
