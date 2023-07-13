import { ApplicationRecord } from "./ApplicationRecord";
import { Model, Attr, HasOne } from "spraypaint";
import type { Referral } from "./Referral";

@Model()
export class User extends ApplicationRecord {

  static jsonapiType = "users";

  @Attr username        :string
  @Attr phone           :string
  @Attr email           :string
  @Attr password?        :string
  @Attr passwordConfirmation? :string
  @Attr wechatOpenId?   :string

  @HasOne("referral") referral? :Referral

}
