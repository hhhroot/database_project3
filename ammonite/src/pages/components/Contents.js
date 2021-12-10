import {useState, useEffect} from 'react'
import {Bar, Doughnut, Line} from "react-chartjs-2"

import Chart from 'chart.js/auto'
import axios from 'axios'


const Contents = () => {


    const [confirmedData, setConfirmedData] = useState({
        labels: ["12.3","12.4","12.5","12.6","12.7","12.8","12.9"],
        datasets: [
            {
                labels: "국내 누적 확진자",
                backgorundColor: "salmon",
                fill: true,
                data: [5352, 5126, 4324, 4954, 7174, 7102, 7022]

            },
        ]
    })


    


    
    useEffect(()=>{

        const fetchEvents = async () => {
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
            makeData(res.data)
        }
        const makeData = (items)=>{
           items. forEach(item => console.log(item))

        }

        fetchEvents();
    }, [])





    return (
        <section>
        <h2>국내 코로나 현황</h2>
        <div className="contents">
            <div>
                <Bar data={confirmedData} options={
                    { title:{ display: true, text:"누적확진자추이", fontsize: 16 }},
                    { legend: {display: true, position: "bootom"} }
                } />
            </div>


        </div>
      </section>
    )
}



export default Contents
