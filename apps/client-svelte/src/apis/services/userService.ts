import BaseService from "../BaseService";

class UserService extends BaseService {

  async signin(user: any) {
    return this.post("/signin", {user});
  }

  async signout() {
    return this.post("/signout");
  }

  async signup(user: any) {
    return this.post("/signup", {user});
  }

  async update(user: any) {
    return this.put(`/user/${user.id}`, {user});
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

  async createReferral(user :any){
    return this.post(`/{user.id}/referral`);
  }


}

export default new UserService();
