import { ApplicationRecord } from "./ApplicationRecord";
import { Model, Attr } from "spraypaint";

@Model()
export class Referral extends ApplicationRecord {

  @Attr code :string

}

