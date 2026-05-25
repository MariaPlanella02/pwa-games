import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="cards">
      @for (game of games; track game.id) {
        <mat-card (click)="goToDetail(game.id)">
          <img mat-card-image [src]="game.background_image" />
          <mat-card-title>{{ game.name }}</mat-card-title>
        </mat-card>
      }
    </div>
  `,
  styles: [
    `
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }
    `,
  ],
})
export class CardGameComponent {
  @Input() games: Game[] = [];

  constructor(private router: Router) {}

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }
}
