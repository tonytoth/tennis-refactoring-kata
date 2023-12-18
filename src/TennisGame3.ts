import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private player1Points: number = 0;
  private player2Points: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    let score: string;
    const scoringNames: string[] = 
    [
      'Love',     // 0 points
      'Fifteen',  // 1 point
      'Thirty',   // 2 points
      'Forty'     // 3 points
    ];
    if (this.player1Points < 4 && this.player2Points < 4 && !(this.player1Points + this.player2Points === 6)) {
      score = scoringNames[this.player1Points];
      return (this.player1Points === this.player2Points) ? score + '-All' : score + '-' + scoringNames[this.player2Points];
    } else {
      if (this.player1Points === this.player2Points)
        return 'Deuce';
      score = this.player1Points > this.player2Points ? this.player1Name : this.player2Name;
      return (((this.player1Points - this.player2Points) * (this.player1Points - this.player2Points)) === 1) ? 'Advantage ' + score : 'Win for ' + score;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.player1Points += 1;
    else
      this.player2Points += 1;
  }
}
