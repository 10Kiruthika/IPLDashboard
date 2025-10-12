import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

class TeamCard extends Component {
  render() {
    const {details} = this.props
    const {id, name, teamImageUrl} = details
    return (
      <Link to={`/team-matches/${id}`} className="link_style">
        <li className="list_container">
          <img className="image_style" src={teamImageUrl} alt={name} />
          <p className="team_name">{name}</p>
        </li>
      </Link>
    )
  }
}
export default TeamCard
