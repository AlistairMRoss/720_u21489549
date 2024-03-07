import { StackContext, Api, Table, Cognito, StaticSite, use } from 'sst/constructs'
import { DynamoDBStack } from './DynamoDBStack.js'
import { CognitoStack } from './CognitoStack.js'
import * as iam from 'aws-cdk-lib/aws-iam'
const API_VERSION = 'v1'
export function ApiStack({ stack, app }: StackContext) {
  const { subjectsTable } = use(DynamoDBStack)
  const { auth } = use(CognitoStack)
  const api = new Api(stack, "Api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: 'jwt',
      function: {
        bind: [subjectsTable],
        timeout: 60,
        environment: {
          UserPoolClientId: auth.userPoolClientId,
          UserPoolId: auth.userPoolId,
          subjectsTableName: subjectsTable.tableName,
        },
      },
    },
    routes: {

    },
  });
  api.attachPermissions([subjectsTable])
  api.attachPermissions([
    new iam.PolicyStatement({
      actions: ['iot:*'],
      effect: iam.Effect.ALLOW,
      resources: ['*']
    })
  ])
  stack.addOutputs({
    ApiEndpoint: api.url
  });

  return { api }
}
