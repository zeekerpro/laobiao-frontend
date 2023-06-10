import httpClient from "$apis/httpClient";
import { plainToInstance } from "class-transformer";
import BaseModel from "./BaseModel";

export default class Referral extends BaseModel {

  code :string

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

