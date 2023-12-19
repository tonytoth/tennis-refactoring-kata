import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private player1Points: number = 0;
  private player2Points: number = 0;
  private player1Score: string = '';
  private player2Score: string = '';
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

  private populatePlayerScores(): void {
    this.player1Score = this.scoringNames[this.player1Points];
    this.player2Score = this.scoringNames[this.player2Points];
  }

  private findLeadingPlayer(): string {
    if (this.player1Points > this.player2Points) {
      return this.player1Name;
    }
    return this.player2Name;
  }

  private isDeuce(player1Points: number, player2Points: number): boolean {
    if (player1Points === player2Points) {
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

  private getNormalScore(): string {
    this.populatePlayerScores();
    if (!this.isDeuce(this.player1Points, this.player2Points)){
      this.finalScore = this.player1Score + '-' + this.player2Score;
      return this.finalScore;
    }
    this.finalScore = this.player1Score + '-All';
    return this.finalScore;
  }

  private getAdvantageOrWin(player1Points: number, player2Points: number): string {
    const leadingPlayer: string = this.findLeadingPlayer();
    const playerHasAdvantage: boolean = (player1Points - player2Points) * (player1Points - player2Points) === 1;
    if (playerHasAdvantage) {
      this.finalScore = 'Advantage ' + leadingPlayer;
      return this.finalScore;
    }
    this.finalScore = 'Win for ' + leadingPlayer;
    return this.finalScore;
  }

  getScore(): string {    
    if (this.isNormalScore(this.player1Points, this.player2Points)) {
      return this.getNormalScore();
    }
    if (this.isDeuce(this.player1Points, this.player2Points)) {
      return 'Deuce';
    }
    return this.getAdvantageOrWin(this.player1Points, this.player2Points);
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') {
      this.player1Points += 1;
      return;
    }
    this.player2Points +=1 ;
  }
}
