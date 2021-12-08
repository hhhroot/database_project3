import { Component } from "react";

class Vacine extends Component {
  render(){
    return(
      <div style={{border: "1px solid black", width:"450px", padding: "15px", marginBottom: "40px"}}>
            <div style={{width: "430px", fontSize: "20px", fontWeight:"700"}}>{this.props.name}</div>
            <table>
              <tr>
                <td style={{width: "120px"}} className="bold">플랫폼</td>
                <td>{this.props.flatform}</td>
              </tr>
              <tr>
                <td className="bold">접종 횟수(간격)</td>
                <td>{this.props.count}</td>
              </tr>
              <tr>
                <td className="bold">보관</td>
                <td>{this.props.keep}</td>
              </tr>
              <tr>
                <td className="bold">백신명</td>
                <td>{this.props.v_name}</td>
              </tr>
              <tr>
                <td className="bold">연령</td>
                <td>{this.props.age}</td>
              </tr>
              <tr>
                <td className="bold">구성</td>
                <td>{this.props.config}</td>
              </tr>
              <tr>
                <td className="bold">접종량 및 방법</td>
                <td>{this.props.way}</td>
              </tr>
              <tr>
                <td className="bold">유통</td>
                <td>{this.props.cycle}</td>
              </tr>
              <tr>
                <td className="bold">개봉 후 저장</td>
                <td>{this.props.save}</td>
              </tr>
            </table>
          </div>
    )
  }
}

class VacineInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [
        {
          name: "화이자 및 바이오엔텍",
          count: "2회, 21일",
          keep: "-90℃∼-60℃(6개월)",
          flatform: "mRNA 백신(핵산백신)",
          v_name: "코미나티주",
          age: "12세 이상",
          config: "다회 투여용 바이알",
          way: "희석된 백신 0.3㎖, 근육주사",
          cycle: "-90℃∼-60℃(6개월)2∼8℃(31일)",
          save: "희석 후 실온 (2℃∼25℃) 6시간",
        },
        {
          name: "모더나",
          count: "2회, 28일",
          keep: "-25℃∼-15℃(7개월)",
          flatform: "mRNA 백신(핵산백신)",
          v_name: "모더나코비드-19백신주",
          age: "18세 이상",
          config: "다회 투여용 바이알",
          way: "0.5㎖, 근육주사",
          cycle: "2~8℃(30일)",
          save: "실온 6시간",
        },
        {
          name: "아스트라제네카",
          count: "2회, 8-12주(*허가는 4-12주)",
          keep: "2∼8℃(6개월)",
          flatform: "바이러스 벡터 백신",
          v_name: "한국아스트라제네카코비드-19백신",
          age: "18세 이상",
          config: "다회 투여용 바이알",
          way: "0.5㎖, 근육주사",
          cycle: "2℃∼8℃(6개월)",
          save: "실온(30℃이하) 6시간",
        },
        {
          name: "얀센, 존슨앤존슨",
          count: "1회",
          keep: "-25℃∼-15℃(24개월)",
          flatform: "바이러스 벡터 백신",
          v_name: "코비드19백신얀센주",
          age: "18세 이상",
          config: "다회 투여용 바이알",
          way: "0.5㎖ 근육주사",
          cycle: "2℃∼8℃(3개월)",
          save: "2∼8℃ 6시간 실온(25℃이하) 3시간",
        }
      ]
    }
  }

  render(){
    return(
      <div>
        <h2 className="page_title">백신 정보</h2>
        <div className="main_container" style={{display: "flex", flexWrap: "wrap", marginTop: "0"}}>
          {this.state.data.map((vacine) => <Vacine
                                            name={vacine.name}
                                            count={vacine.count}
                                            keep={vacine.keep}
                                            flatform={vacine.flatform}
                                            v_name={vacine.v_name}
                                            age={vacine.age}
                                            config={vacine.config}
                                            way={vacine.way}
                                            cycle={vacine.cycle}
                                            save={vacine.save}
                                            />)}
        </div>
      </div>
    )
  }
}

export default VacineInfo;
