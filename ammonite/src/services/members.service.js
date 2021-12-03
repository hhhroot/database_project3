import http from "../http-common";

class memberDateService {
    getAll() {
        return http.get("/members");
    }

    get() {
        return http.get("/info");
    }

    create(data) {
        return http.post("/members", data);
    }

    update(data){
        return http.put(`/members`, data);
    }

    delete() {
        return http.delete(`/members`);
    }

    login(data) {
        return http.post("/login", data);
    }

    auth(data) {
        return http.post("/auth", data);
    }
}

export default new memberDateService();