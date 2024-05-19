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
      // user
      'PUT /v1/admin/user/createUser': 'packages/functions/src/admin/users/createUser.handler',
      'DELETE /v1/admin/user/{userId}/deleteUser': 'packages/functions/src/admin/users/deleteUser.handler',
      'GET /v1/admin/user/getUsers': 'packages/functions/src/admin/users/getUsers.handler',
      'GET /v1/admin/user/getGroups': 'packages/functions/src/admin/users/getGroups.handler',
      'PUT /v1/admin/user/createGroup': 'packages/functions/src/admin/users/createGroup.handler',
      'PATCH /v1/admin/user/{userId}/addUserToGroup': 'packages/functions/src/admin/users/addUserToGroup.handler',
      'GET /v1/user/getRole': 'packages/functions/src/admin/adminCheck.handler',
    },
  });

  auth.attachPermissionsForAuthUsers(stack, [api]);
  api.attachPermissionsToRoute('PUT /v1/admin/user/createUser', ['cognito-idp:*']);
  api.attachPermissionsToRoute('DELETE /v1/admin/user/{userId}/deleteUser', ['cognito-idp:*']);
  api.attachPermissionsToRoute('GET /v1/admin/user/getUsers', ['cognito-idp:*']);
  api.attachPermissionsToRoute('GET /v1/admin/user/getGroups', ['cognito-idp:*']);
  api.attachPermissionsToRoute('PUT /v1/admin/user/createGroup', ['cognito-idp:*']);
  api.attachPermissionsToRoute('PATCH /v1/admin/user/{userId}/addUserToGroup', ['cognito-idp:*']);
  api.attachPermissionsToRoute('GET /v1/user/getRole', ['cognito-idp:*']);
  api.attachPermissions([subjectsTable])

  stack.addOutputs({
    ApiEndpoint: api.url
  });

  return { api }
}
