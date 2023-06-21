import httpClient from "$apis/httpClient";
import { plainToInstance } from "class-transformer";
import BaseModel from "./BaseModel";

export default class OpenaiAccount extends BaseModel {

  email: string

  static async create(account: OpenaiAccount){
    const ret = await httpClient.post(`/openai/accounts`, { account });
    if(ret.isSuccess){ ret.data = plainToInstance(OpenaiAccount, ret.data); }
    return ret;
  }

  static async index(){
    const ret = await httpClient.get(`/openai/accounts`);
    if(ret.isSuccess){ ret.data = plainToInstance(OpenaiAccount, ret.data); }
    return ret;
  }

}

