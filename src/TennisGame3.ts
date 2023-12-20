import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private player1Points: number = 0;
  private player2Points: number = 0;
  private player1Name: string;
  private player2Name: string;

  private scoringNames: string[] = 
    [
      'Love',     // 0 points
      'Fifteen',  // 1 point
      'Thirty',   // 2 points
      'Forty'     // 3 points
    ];

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  private getPlayerScore(playerPoints: number): string {
    return this.scoringNames[playerPoints];
  }

  private findLeadingPlayer(player1Points: number, player2Points: number): string {
    if (player1Points > player2Points) {
      return this.player1Name;
    }
    return this.player2Name;
  }

  private isDeuce(player1Points: number, player2Points: number): boolean {
    return player1Points === player2Points && player1Points >= 3;
  }

  private isNormalScore(player1Points: number, player2Points: number): boolean {
    const playerPointsLessThan4: boolean = player1Points < 4 && player2Points < 4;
    const thereIsNoDeuce: boolean = player1Points + player2Points != 6;
    return playerPointsLessThan4 && thereIsNoDeuce;
  }

  private getNormalScore(player1Score: string, player2Score: string): string {
    if (player1Score != player2Score){
      return `${player1Score}-${player2Score}`;
    }
    return `${player1Score}-All`;
  }

  private isAdvantage(player1Points: number, player2Points: number): boolean {
    const pointDifference: number = Math.abs(player1Points - player2Points);
    return pointDifference === 1;
  }

  private getAdvantage(leadingPlayer: string): string {
    return `Advantage ${leadingPlayer}`;
  }

  private isWin(player1Points: number, player2Points: number): boolean {
    const pointDifference: number = Math.abs(player1Points - player2Points);
    return pointDifference >= 2;
  }

  private getWin(leadingPlayer: string): string {
    return `Win for ${leadingPlayer}`;
  }

  getScore(): string {    
    if (this.isNormalScore(this.player1Points, this.player2Points)) {
      return this.getNormalScore(this.getPlayerScore(this.player1Points), this.getPlayerScore(this.player2Points));
    }
    if (this.isDeuce(this.player1Points, this.player2Points)) {
      return 'Deuce';
    }
    if (this.isAdvantage(this.player1Points, this.player2Points)) {
      return this.getAdvantage(this.findLeadingPlayer(this.player1Points, this.player2Points));
    }
    if (this.isWin(this.player1Points, this.player2Points)) {
      return this.getWin(this.findLeadingPlayer(this.player1Points, this.player2Points))
    }
    return 'Invalid scoring state';
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.player1Points += 1;
      return;
    }
    if (playerName === this.player2Name) {
      this.player2Points += 1;
      return;
    }
  }
}
