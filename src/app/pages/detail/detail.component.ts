import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule],
  template: `
    @if (game) {
      <div class="header">
        <h1>{{ game.name }}</h1>
        <button mat-button (click)="goBack()">Back</button>
      </div>

      <img [src]="game.background_image" class="hero" />

      <button mat-raised-button (click)="show = !show">Show all details</button>

      @if (show) {
        <mat-accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Details</mat-panel-title>
            </mat-expansion-panel-header>

            <p><strong>Released:</strong> {{ game.released }}</p>
            <p><strong>Rating:</strong> {{ game.rating }}</p>

            <p><strong>Genres:</strong></p>
            <ul>
              @for (g of game.genres; track g.name) {
                <li>{{ g.name }}</li>
              }
            </ul>

            <p><strong>Platforms:</strong></p>
            <ul>
              @for (p of game.platforms; track p.platform.name) {
                <li>{{ p.platform.name }}</li>
              }
            </ul>
          </mat-expansion-panel>
        </mat-accordion>
      }
    }
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .hero {
        width: 100%;
        border-radius: 8px;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);

  game!: Game;
  show = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.gameService.getGameById(id).subscribe((data) => {
      this.game = data;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
