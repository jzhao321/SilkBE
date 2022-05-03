import Express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import "./datastore/db"; // Initalizes the datastore
import RawFindings from "./datastore/RawFindings";
import GroupedFindings from "./datastore/GroupedFindings";
import { Sequelize } from "sequelize-typescript";
import seq from "./datastore/db";

const main = async () => {
  const typeDefs = gql`
    type Query {
      groupedFindings(start: Int, end: Int): [GroupedFinding]
      totalGroupedFindings: Int
      rawFindings(grouped_finding_id: Int!): [RawFinding]
      groupedBySeverity: [SeverityData]
    }

    type GroupedFinding {
      id: Int
      grouping_type: String
      grouping_key: String
      severity: String
      grouped_finding_created: String
      sla: String
      description: String
      security_analyst: String
      owner: String
      workflow: String
      status: String
      progress: Float
    }

    type RawFinding {
      id: Int
      source_security_tool_name: String
      source_security_tool_id: String
      source_collbartion_tool_name: String
      source_collbartion_tool_id: String
      severity: String
      finding_created: String
      ticket_created: String
      description: String
      asset: String
      status: String
      remediation_url: String
      remediation_text: String
      grouped_finding_id: Int
    }

    type SeverityData {
      groupName: String
      count: Int
    }
  `;

  const resolvers = {
    Query: {
      groupedFindings: async (parent, args) => {
        const { start, end } = args;
        let promise;
        if (typeof start !== "undefined" && typeof end !== "undefined") {
          promise = GroupedFindings.findAll({
            offset: args.start,
            limit: args.end - args.start,
          });
        } else {
          promise = GroupedFindings.findAll();
        }
        const [result] = await Promise.all([
          promise,
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }),
        ]);

        return result;
      },
      totalGroupedFindings: async () => {
        const [result] = await Promise.all([
          GroupedFindings.count(),
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }),
        ]);
        return result;
      },
      rawFindings: async (parent, args) => {
        console.log(args);

        if (!args.grouped_finding_id) {
          return [];
        }

        const [result] = await Promise.all([
          RawFindings.findAll({
            where: {
              grouped_finding_id: args.grouped_finding_id,
            },
          }),
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }),
        ]);

        return result;
      },

      groupedBySeverity: async () => {
        const [result] = await Promise.all([
          GroupedFindings.findAll({
            //@ts-ignore
            attributes: [
              [seq.fn("COUNT", seq.col("severity")), "count"],
              "severity",
            ],
            group: "severity",
          }),
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }),
        ]);
        return result.map((instance) => {
          return {
            groupName: instance.severity,
            count: instance.getDataValue("count"),
          };
        });
      },
    },
  };

  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = Express();

  await graphqlServer.start();

  graphqlServer.applyMiddleware({
    app,
  });

  app.listen(8080, () => {
    console.log(`App listening on port 8080 at ${graphqlServer.graphqlPath}`);
  });
};

main();
