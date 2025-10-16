import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard/index'

class Home extends Component {
  state = {initialList: [], isLoad: true}

  componentDidMount() {
    this.getIplTeams()
  }

  getIplTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({initialList: updatedData, isLoad: false})
  }

  render() {
    const {initialList, isLoad} = this.state
    return (
      <div>
        {isLoad ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <Link to="/" className="link1_style">
            <div className="bg_container">
              <div className="head_cont">
                <img
                  className="logo_img"
                  src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                  alt="ipl logo"
                />
                <h1 className="heading">IPL Dashboard</h1>
              </div>
              <div>
                <ul className="unorder_list">
                  {initialList.map(each => (
                    <TeamCard details={each} key={each.id} />
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        )}
      </div>
    )
  }
}
export default Home
