import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private _player1Points: number = 0;
  private _player2Points: number = 0;
  private _player1Score: string = '';
  private _player2Score: string = '';
  private _finalScore: string = '';
  private _player1Name: string;
  private _player2Name: string;
  private _scoringNames: string[] = 
    [
      'Love',     // 0 points
      'Fifteen',  // 1 point
      'Thirty',   // 2 points
      'Forty'     // 3 points
    ];

  constructor(player1Name: string, player2Name: string) {
    this._player1Name = player1Name;
    this._player2Name = player2Name;
  }

  private _findLeadingPlayer(): string {
    if (this._player1Points > this._player2Points) {
      return this._player1Name;
    }
    return this._player2Name
  }

  getScore(): string {
    const leadingPlayer: string = this._findLeadingPlayer();

    //if conditions
    const playerPointsAreLessThan4 = this._player1Points < 4 && this._player2Points < 4;
    const thereIsNoDeuce = !(this._player1Points + this._player2Points === 6);
    const playerHasAdvantage = (this._player1Points - this._player2Points) * (this._player1Points - this._player2Points) === 1;
    
    if (playerPointsAreLessThan4 && thereIsNoDeuce) {
      this._player1Score = this._scoringNames[this._player1Points];
      this._player2Score = this._scoringNames[this._player2Points];
      if (this._player1Points != this._player2Points){
        this._finalScore = this._player1Score + '-' + this._player2Score;
        return this._finalScore;
      }
      this._finalScore = this._player1Score + '-All';
      return this._finalScore;
    } else {
      if (this._player1Points === this._player2Points) {
        this._finalScore = 'Deuce'
        return this._finalScore;
      }
      if (playerHasAdvantage) {
        this._finalScore = 'Advantage ' + leadingPlayer;
        return this._finalScore;
      }
      this._finalScore = 'Win for ' + leadingPlayer;
      return this._finalScore;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') {
      this._player1Points += 1;
      return;
    }
    this._player2Points +=1 ;
  }
}
