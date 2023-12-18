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
    let player1Score: string;
    let player2Score: string;

    const scoringNames: string[] = 
    [
      'Love',     // 0 points
      'Fifteen',  // 1 point
      'Thirty',   // 2 points
      'Forty'     // 3 points
    ];

    const playerPointsAreLessThan4 = this.player1Points < 4 && this.player2Points < 4;
    const thereIsNoDeuce = !(this.player1Points + this.player2Points === 6);
    if (playerPointsAreLessThan4 && thereIsNoDeuce) {
      player1Score = scoringNames[this.player1Points];
      player2Score = scoringNames[this.player2Points];
      return (this.player1Points === this.player2Points) ? player1Score + '-All' : player1Score + '-' + player2Score;
    } else {
      if (this.player1Points === this.player2Points)
        return 'Deuce';
      const leadingPlayer = this.player1Points > this.player2Points ? this.player1Name : this.player2Name;
      return (((this.player1Points - this.player2Points) * (this.player1Points - this.player2Points)) === 1) ? 'Advantage ' + leadingPlayer : 'Win for ' + leadingPlayer;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.player1Points += 1;
    else
      this.player2Points += 1;
  }
}
