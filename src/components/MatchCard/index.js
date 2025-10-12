import './index.css'
import {Component} from 'react'

class MatchCard extends Component {
  render() {
    const {details} = this.props
    const {id, competingTeam, competingTeamLogo, matchStatus, result} = details
    const checkcolor = matchStatus === 'Won' ? 'green' : 'red'
    const competing_team = competingTeam
    return (
      <li className="mini_list_cont">
        <img
          className="mini_img"
          src={competingTeamLogo}
          alt={`competing team ${competing_team}`}
        />
        <p className="team_head">{competingTeam}</p>
        <p className="team_para">{result}</p>
        <p className={`win_style ${checkcolor}`}>{matchStatus}</p>
      </li>
    )
  }
}
export default MatchCard
