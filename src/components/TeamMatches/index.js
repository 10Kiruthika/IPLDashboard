import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'

class TeamMatches extends Component {
  state = {
    bannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    isLoad: true,
  }
  componentDidMount() {
    this.callSpecificTeam()
  }
  callSpecificTeam = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const bannerUrl = data.team_banner_url

    const latestMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      manoftheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }

    const recentMatches = data.recent_matches.map(each => {
      return {
        id: each.id,
        competingTeamLogo: each.competing_team_logo,
        competingTeam: each.competing_team,
        matchStatus: each.match_status,
        result: each.result,
      }
    })
    this.setState({
      bannerUrl: bannerUrl,
      latestMatchDetails: latestMatchDetails,
      recentMatches: recentMatches,
      isLoad: false,
    })
  }
  render() {
    const {bannerUrl, latestMatchDetails, recentMatches, isLoad} = this.state
    return (
      <div>
      {
        isLoad ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="bg_container2" >
            <div>
              <img className="banner_img" src={bannerUrl} alt="team banner" />
            </div>

            <div className="second_container">
              <p>Latest Matches</p>
              <LatestMatch details={latestMatchDetails} />
            </div>

            <ul className="unorder_minicont">
              {recentMatches.map(each => (
                <MatchCard details={each} key={each.id} />
              ))}
            </ul>
          </div>
        )
      }
      </div>      
    )
  }
}
export default TeamMatches
