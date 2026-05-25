import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-grid-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Released</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        @for (game of games; track game.id) {
          <tr (click)="goToDetail(game.id)">
            <td>{{ game.name }}</td>
            <td>{{ game.released }}</td>
            <td>{{ game.rating }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      tr {
        cursor: pointer;
      }
      tr:hover {
        background: #eee;
      }
    `,
  ],
})
export class GridGameComponent {
  @Input() games: Game[] = [];

  constructor(private router: Router) {}

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }
}
