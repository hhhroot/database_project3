import http from "../http-common";

class reserveDataService{
  // 조건에 맞는 병원 list 가져오기
  getHospital(datas) {
    return http.post("/reserve/hospital", datas);
  }
  
  // 예약 정보 가져오기
  getReserve(first, second) {
    return http.get(`/reserve?first=${first}&second=${second}`);
  }

  // 예약하기
  reserve(datas) {
    return http.post("/reserve", datas);
  }

  getHospitalVacine(h_id, date) {
    return http.get(`/reserve/hospital/vacine?h_id=${h_id}&date=${date}`);
  }
}

export default new reserveDataService();