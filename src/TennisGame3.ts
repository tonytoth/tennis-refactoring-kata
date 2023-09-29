import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private player2Score: number = 0;
  private player1Score: number = 0;
  private player1Name: string;
  private player2Name: string;

  private scoreDescription: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  private scoreIsEqual(): boolean {
    return this.player1Score === this.player2Score;
  }

  private isAdvantage(): boolean {
    return (((this.player1Score - this.player2Score) * (this.player1Score - this.player2Score)) === 1);
  }

  private getPlayerInTheLead(): string {
    return this.player1Score > this.player2Score ? this.player1Name : this.player2Name;
  }

  private displayScoreForFinalStage(): string {
    if (this.scoreIsEqual())
      return 'Deuce';

    if (this.isAdvantage()) {
      return 'Advantage ' + this.getPlayerInTheLead();
    }

    return 'Win for ' + this.getPlayerInTheLead();
  }

  private displayScoreForEarlyStage(): string {
    const player1ScoreDescription = this.scoreDescription[this.player1Score];

    if (this.scoreIsEqual()) {
      return player1ScoreDescription + '-All';
    }

    return player1ScoreDescription + '-' + this.scoreDescription[this.player2Score];  
  }

  private isFinalStageOfThePoint(): boolean {
    const playerHasLessThan3Points = (score: number) => score < 4;

    return !(
      playerHasLessThan3Points(this.player1Score) &&
      playerHasLessThan3Points(this.player2Score) &&
      !(this.player1Score + this.player2Score === 6)
    );
  }

  getScore(): string {
    if (this.isFinalStageOfThePoint()) {
      return this.displayScoreForFinalStage()
    }

    return this.displayScoreForEarlyStage()
  }

  wonPoint(playerName: string): void {
    const isPlayer1Name = playerName === this.player1Name;

    if (isPlayer1Name)
      this.player1Score += 1;
    else
      this.player2Score += 1;
  }
}
