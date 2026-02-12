import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  maximizedPanel: string | null = null;

  toggleMaximize(panelName: string) {
    if (this.maximizedPanel === panelName) {
      this.maximizedPanel = null; // Minimize if already open
    } else {
      this.maximizedPanel = panelName; // Maximize clicked panel
    }
  }

}
