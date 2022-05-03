import { Sequelize } from "sequelize-typescript";
import GroupedFindings from "./GroupedFindings";
import RawFindings from "./RawFindings";

const seq = new Sequelize({
  dialect: "sqlite",
  storage: "./findings (1).db",
  models: [GroupedFindings, RawFindings],
});

const main = async () => {
  try {
    await seq.authenticate();
    console.log("Connection Successful");
  } catch (e) {
    console.error(e);
  }
};

main();

export default seq;
