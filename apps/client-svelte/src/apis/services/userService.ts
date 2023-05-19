import BaseService from "../BaseService";

class UserService extends BaseService {

  async signin(user: any) {
    return this.post("/signin", {user});
  }

  async signout() {
    return this.post("/signout");
  }

  async signup(data: any) {
    return this.post("/signup", data);
  }

  async update(data: any) {
    return this.put("/user", data);
  }

  async show(id: string) {
    return this.get(`/user/${id}`);
  }

  async destroy(id: string) {
    return this.delete(`/user/${id}`);
  }

  async me(){
    return this.get(`/me`);
  }

}

export default new UserService();
