import User from "$models/User";
import { test, assert } from "vitest";
import { camelCase, mapKeys, snakeCase } from "lodash";

test('snake case model keys with ldash', () => {
  const user = new User()
  user.passwordConfirm = "skjeli"
  mapKeys(user, (value, key) => camelCase(key))
  console.log(user)
})
