import httpClient from "$apis/httpClient";
import { plainToInstance, Type } from "class-transformer";
import BaseModel from "./BaseModel";
import User from "./User";

export default class Referral extends BaseModel {

  code :string

  @Type(() => User)
  referred?: User

  @Type(() => User)
  referrer: User

  get isUsed(){ return !!this.referred  }

  static async create(){
    const ret = await httpClient.post(`/referrals`);
    if(ret.isSuccess){ ret.data = plainToInstance(Referral, ret.data); }
    return ret;
  }

  static async index(){
    const ret = await httpClient.get(`/referrals`);
    if(ret.isSuccess){ ret.data = plainToInstance(Referral, ret.data); }
    return ret;
  }

}

