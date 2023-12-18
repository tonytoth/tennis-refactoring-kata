import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private player1: number = 0;
  private player2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    let s: string;
    if (this.player1 < 4 && this.player2 < 4 && !(this.player1 + this.player2 === 6)) {
      const p: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];
      s = p[this.player1];
      return (this.player1 === this.player2) ? s + '-All' : s + '-' + p[this.player2];
    } else {
      if (this.player1 === this.player2)
        return 'Deuce';
      s = this.player1 > this.player2 ? this.player1Name : this.player2Name;
      return (((this.player1 - this.player2) * (this.player1 - this.player2)) === 1) ? 'Advantage ' + s : 'Win for ' + s;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.player1 += 1;
    else
      this.player2 += 1;
  }
}
