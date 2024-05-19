import { StackContext, Api, Table, Cognito, StaticSite, use } from 'sst/constructs'
import { DynamoDBStack } from './DynamoDBStack.js'
import { CognitoStack } from './CognitoStack.js'
const API_VERSION = 'v1'
export function ApiStack({ stack, app }: StackContext) {
  const { courseTable, studentCourses } = use(DynamoDBStack)
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
        bind: [courseTable, studentCourses],
        timeout: 60,
        environment: {
          UserPoolClientId: auth.userPoolClientId,
          UserPoolId: auth.userPoolId,
          courseTableTableName: courseTable.tableName,
          studentCoursesTableName: studentCourses.tableName
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
  api.attachPermissionsToRoute('PUT /v1/admin/user/createUser', ['cognito-idp:AdminCreateUser'])
  api.attachPermissionsToRoute('DELETE /v1/admin/user/{userId}/deleteUser', ['cognito-idp:AdminDeleteUser'])
  api.attachPermissionsToRoute('GET /v1/admin/user/getUsers', ['cognito-idp:ListUsers'])
  api.attachPermissionsToRoute('GET /v1/admin/user/getGroups', ['cognito-idp:ListGroups'])
  api.attachPermissionsToRoute('PATCH /v1/admin/user/{userId}/addUserToGroup', ['cognito-idp:AdminAddUserToGroup'])
  api.attachPermissionsToRoute('PUT /v1/admin/user/createGroup', ['cognito-idp:CreateGroup'])
  api.attachPermissionsToRoute('GET /v1/user/getRole', ['cognito-idp:*'])
  api.attachPermissions([courseTable, studentCourses])

  stack.addOutputs({
    ApiEndpoint: api.url
  });

  return { api }
}
