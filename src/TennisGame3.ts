import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private player1Points: number = 0;
  private player2Points: number = 0;
  private finalScore: string = '';
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
    const isDeuce = player1Points === player2Points && this.player1Points >= 3;
    if (isDeuce) {
      return true;
    }
    return false;
  }

  private isNormalScore(player1Points: number, player2Points: number): boolean {
    const playerPointsLessThan4: boolean = player1Points < 4 && player2Points < 4;
    const thereIsNoDeuce: boolean = !(player1Points + player2Points === 6);
    if (playerPointsLessThan4 && thereIsNoDeuce) {
      return true;
    }
    return false;
  }

  private getNormalScore(player1Score: string, player2Score: string): string {
    if (player1Score != player2Score){
      this.finalScore = `${player1Score}-${player2Score}`;
      return this.finalScore;
    }
    this.finalScore = player1Score + '-All';
    return this.finalScore;
  }

  private isAdvantage(player1Points: number, player2Points: number): boolean {
    const pointDifference = Math.abs(player1Points - player2Points);
    if (pointDifference === 1) {
      return true;
    }
    return false;
  }

  private getAdvantage(leadingPlayer: string): string {
    this.finalScore = `Advantage ${leadingPlayer}`;
    return this.finalScore;
  }

  getScore(): string {    
    if (this.isNormalScore(this.player1Points, this.player2Points)) {
      return this.getNormalScore(this.getPlayerScore(this.player1Points), this.getPlayerScore(this.player2Points));
    }
    if (this.isDeuce(this.player1Points, this.player2Points)) {
      return 'Deuce';
    }
    if (this.isAdvantage(this.player1Points, this.player2Points)) {
      return this.getAdvantage(this.findLeadingPlayer(this.player1Points, this.player2Points))
    }
    this.finalScore = `Win for ${this.findLeadingPlayer(this.player1Points, this.player2Points)}`;
    return this.finalScore;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.player1Points += 1;
      return;
    }
    this.player2Points +=1 ;
  }
}
