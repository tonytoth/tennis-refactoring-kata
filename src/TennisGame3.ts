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

  findLeadingPlayer(): string {
    if (this.player1Points > this.player2Points) {
      return this.player1Name;
    }
    return this.player2Name
  }

  getScore(): string {
    let player1Score: string;
    let player2Score: string;
    let finalScore: string;
    const leadingPlayer: string = this.findLeadingPlayer();

    const scoringNames: string[] = 
    [
      'Love',     // 0 points
      'Fifteen',  // 1 point
      'Thirty',   // 2 points
      'Forty'     // 3 points
    ];

    //if conditions
    const playerPointsAreLessThan4 = this.player1Points < 4 && this.player2Points < 4;
    const thereIsNoDeuce = !(this.player1Points + this.player2Points === 6);
    const playerHasAdvantage = (this.player1Points - this.player2Points) * (this.player1Points - this.player2Points) === 1;
    
    if (playerPointsAreLessThan4 && thereIsNoDeuce) {
      player1Score = scoringNames[this.player1Points];
      player2Score = scoringNames[this.player2Points];
      if (this.player1Points != this.player2Points){
        finalScore = player1Score + '-' + player2Score;
        return finalScore;
      }
      finalScore = player1Score + '-All';
      return finalScore;
    } else {
      if (this.player1Points === this.player2Points) {
        finalScore = 'Deuce'
        return finalScore;
      }
      if (playerHasAdvantage) {
        finalScore = 'Advantage ' + leadingPlayer;
        return finalScore;
      }
      finalScore = 'Win for ' + leadingPlayer;
      return finalScore;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') {
      this.player1Points += 1;
      return;
    }
    this.player2Points +=1 ;
  }
}
