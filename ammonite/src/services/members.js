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

    update(username, data){
        return http.put(`/members/${username}`, data);
    }

    delete(username) {
        return http.delete(`/members/${username}`);
    }

    login(data) {
        return http.post("/login", data);
    }
}

export default new memberDateService();