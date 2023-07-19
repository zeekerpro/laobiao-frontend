import httpClient from "$apis/httpClient";
import { instanceToPlain, plainToInstance } from "class-transformer";
import BaseModel from "./BaseModel";
import lodash from "lodash";
const { mapKeys, snakeCase }  = lodash ;

export default class User extends BaseModel {

   username        :string
   phone           :string
   email           :string
   password        :string
   passwordConfirm :string
   wechatOpenId?   :string

  async signin() {
    const userParams = mapKeys(instanceToPlain(this), (value, key) => snakeCase(key))
    const ret = await httpClient.post("/signin", {user: userParams});
    if(ret.isSuccess){ ret.data = plainToInstance(User, ret.data); }
    return ret;
  }

  async signup() {
    const userParams = mapKeys(instanceToPlain(this), (value, key) => snakeCase(key))
    const ret = await httpClient.post("/signup", {user: userParams});
    if(ret.isSuccess){ ret.data = plainToInstance(User, ret.data); }
    return ret;
  }

  async signout() {
    const { appStorage } = await import("$utils/client/storage");
    appStorage.remove("token");
    const { db } = await import("$db");
    db.delete()
  }

   async update(user: any) {
    return httpClient.put(`/user/${user.id}`, {user: instanceToPlain(user)});
  }

  static async me(){
    const ret = await httpClient.get(`/me`);
    if(ret.isSuccess){ret.data = plainToInstance(User, ret.data); }
    return ret;
  }

}

