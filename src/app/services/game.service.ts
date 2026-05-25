import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);

  private apiKey = '9bc8d1b4a5b841c1999efa1fe3793140';
  private baseUrl = 'https://api.rawg.io/api';

  getGames(): Observable<{ results: Game[] }> {
    return this.http.get<{ results: Game[] }>(
      `${this.baseUrl}/games?key=${this.apiKey}`,
    );
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(
      `${this.baseUrl}/games/${id}?key=${this.apiKey}`,
    );
  }
}
