import { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { infoUser } from "../actions/members";

class Nav extends Component{
  constructor(props){
    super(props);
    this.getName = this.getName.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      name : "",
    }
  }
  
  getName(){
    this.props
      .infoUser()
      .then((data) => {
        this.setState(
          {
            name: data["name"],
          })
      })
      .catch((e) => {
          console.log(e);
      });
  }

  logout(){
    sessionStorage.removeItem("token")
    window.location.href = '/';
  }

  render(){
    return(
      <header>
        <nav className="nav">
          <Link className="nav_title" to="/">AMMONITE</Link>
            <div className="nav_bar" style={{marginLeft: "200px"}}>
              <Link className="info navs" to="/reserve">백신 예약하기</Link>
              <Link className="info navs" to="/vacine">백신 정보</Link>
              <Link className="info navs" to="/transition">추이현황</Link>
            </div>
            {
              this.state.name != "" ? 
              (
                <div className="nav_bar">
                  <div className="signup navs">안녕하세요. {this.state.name}님!</div>
                  <button className="signup navs" onClick={this.logout} id="logout_btn">로그아웃</button>
                  <Link className="info navs" to="/info">내정보</Link>
                </div>
              ) :
              (
                <div className="nav_bar">
                  {this.getName()}
                  <Link className="signup navs" to="/signup">회원가입</Link>
                  <Link className="login navs" to="/login">로그인</Link>
                </div>
              )
            }
        </nav>
      </header>
    )
  }
}

export default connect(null, {infoUser})(Nav);