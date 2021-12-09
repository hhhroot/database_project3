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

  // 예약변경
  reserveUpdate(reserve_id, datas) {
    return http.put(`/reserve/${reserve_id}`, datas);
  }

  getHospitalVacine(h_id, date) {
    return http.get(`/reserve/hospital/vacine?h_id=${h_id}&date=${date}`);
  }

  cancleReserve(reserve_id) {
    return http.delete(`/reserve/${reserve_id}`);
  }
}

export default new reserveDataService();