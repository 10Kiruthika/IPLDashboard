import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'

class TeamMatches extends Component {
  state = {
    bannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    matchStats: {},
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

    const recentMatches = data.recent_matches.map(each => ({
      id: each.id,
      competingTeamLogo: each.competing_team_logo,
      competingTeam: each.competing_team,
      matchStatus: each.match_status,
      result: each.result,
    }))
    const matchStats = {
      Won: 0,
      Lost: 0,
      Drawn: 0,
    }
    recentMatches.forEach(each => {
      const status = each.matchStatus.toLowerCase()
      if (status.includes('won')) {
        matchStats.Won += 1
      } else if (status.includes('lost')) {
        matchStats.Lost += 1
      } else {
        matchStats.Drawn += 1
      }
    })
    this.setState({
      bannerUrl,
      latestMatchDetails,
      recentMatches,
      matchStats,
      isLoad: false,
    })
  }

  clickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {
      bannerUrl,
      latestMatchDetails,
      recentMatches,
      isLoad,
      matchStats,
    } = this.state
    const data = [
      {
        name: 'Won',
        value: matchStats.Won,
      },
      {
        name: 'Lost',
        value: matchStats.Lost,
      },
      {
        name: 'Drawn',
        value: matchStats.Drawn,
      },
    ]

    return (
      <div>
        {isLoad ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="bg_container2">
            <div>
              <img className="banner_img" src={bannerUrl} alt="team banner" />
            </div>

            <div className="second_container">
              <p className="heading_para">Latest Matches</p>
              <LatestMatch details={latestMatchDetails} />
            </div>

            <ul className="unorder_minicont">
              {recentMatches.map(each => (
                <MatchCard details={each} key={each.id} />
              ))}
            </ul>

            <h2 className="chart_title">Match Statistics</h2>

            <PieChart width={1000} height={300}>
              <Pie
                cx="50%"
                cy="50%"
                data={data}
                startAngle={0}
                endAngle={360}
                innerRadius="40%"
                outerRadius="70%"
                dataKey="value"
              >
                <Cell name="Won" fill="#fecba6" />
                <Cell name="Lost" fill="#b3d23f" />
                <Cell name="Drawn" fill="#a44c9e" />
              </Pie>
              <Legend
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>

            <button
              className="back_button"
              onClick={this.clickBack}
              type="button"
            >
              Back
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
