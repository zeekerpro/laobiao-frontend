import Dexie  from "dexie";

export const db = new Dexie("laobiao");

db.version(1).stores({
  users: "++id, name, age, email, password",
});


