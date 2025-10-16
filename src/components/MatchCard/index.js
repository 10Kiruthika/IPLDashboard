import './index.css'
import {Component} from 'react'

class MatchCard extends Component {
  render() {
    const {details} = this.props
    const {competingTeam, competingTeamLogo, matchStatus, result} = details
    const checkcolor = matchStatus === 'Won' ? 'green' : 'red'
    return (
      <li className="mini_list_cont">
        <img
          className="mini_img"
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
        />
        <p className="team_head">{competingTeam}</p>
        <p className="team_para">{result}</p>
        <p className={`win_style ${checkcolor}`}>{matchStatus}</p>
      </li>
    )
  }
}
export default MatchCard
