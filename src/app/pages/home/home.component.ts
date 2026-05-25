import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { CardGameComponent } from '../../shared/card-game/card-game.component';
import { GridGameComponent } from '../../shared/grid-game/grid-game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CardGameComponent,
    GridGameComponent,
  ],
  template: `
    <div class="toolbar">
      <button mat-icon-button (click)="view = 'cards'">
        <mat-icon>grid_view</mat-icon>
      </button>

      <button mat-icon-button (click)="view = 'table'">
        <mat-icon>table_rows</mat-icon>
      </button>
    </div>

    @if (loading) {
      <mat-spinner></mat-spinner>
    } @else {
      @if (view === 'cards') {
        <app-card-game [games]="games"></app-card-game>
      } @else {
        <app-grid-game [games]="games"></app-grid-game>
      }
    }
  `,
  styles: [
    `
      .toolbar {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  private gameService = inject(GameService);

  games: Game[] = [];
  loading = true;
  view: 'cards' | 'table' = 'cards';

  ngOnInit() {
    this.gameService.getGames().subscribe((res) => {
      this.games = res.results;
      this.loading = false;
    });
  }
}
