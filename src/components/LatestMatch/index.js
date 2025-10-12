import './index.css'
import {Component} from 'react'

class LatestMatch extends Component {
  render() {
    const {details} = this.props
    const {
      id,
      competingTeam,
      competingTeamLogo,
      date,
      firstInnings,
      manoftheMatch,
      matchStatus,
      result,
      secondInnings,
      umpires,
      venue,
    } = details
    const competing_team = competingTeam

    return (
      <div className="latest_container">
        <div className="cont_1">
          <p className="team_ipl_name">{competingTeam}</p>
          <p>{date}</p>
          <p>{venue}</p>
          <p>{result}</p>
        </div>

        <div>
          <img
            className="team_img"
            src={competingTeamLogo}
            alt={`latest match ${competing_team}`}
          />
        </div>

        <div className="inning_cont">
          <p>First Innings</p>
          <p>{firstInnings}</p>
          <p>Second Innings</p>
          <p>{secondInnings}</p>
          <p>Man Of the Match</p>
          <p>{manoftheMatch}</p>
          <p>Umpires</p>
          <p>{umpires}</p>
        </div>
      </div>
    )
  }
}
export default LatestMatch
