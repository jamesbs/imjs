import { procedure } from "../trpc";

export const userList = procedure.query(async () => {
  return [{ id: "qq", name: "Serena" }];
});
