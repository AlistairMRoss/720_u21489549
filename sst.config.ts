import { SSTConfig } from "sst"
import { ApiStack } from "./stacks/ApiStack"
import { CognitoStack } from "./stacks/CognitoStack"
import { DynamoDBStack } from "./stacks/DynamoDBStack"

export default {
  config(input) {
    return {
      name: "u21489549-720",
      region: "us-east-1",
      profile: input.stage === "prod" ? "cos720-prod" : "cos720-dev"
    };
  },
  stacks(app) {
    app.stack(CognitoStack)
    app.stack(DynamoDBStack)
    app.stack(ApiStack)
  }
} satisfies SSTConfig;
