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
      'DELETE /v1/admin/user/{userId}/deleteUser': 'packages/functions/src/admin/users/deleteUser.handler',
      'GET /v1/admin/user/getUsers': 'packages/functions/src/admin/users/getUsers.handler',
      'GET /v1/admin/user/getGroups': 'packages/functions/src/admin/users/getGroups.handler',
      'PATCH /v1/admin/user/{userId}/addUserToGroup': 'packages/functions/src/admin/users/addUserToGroup.handler',
      'GET /v1/user/getRole': 'packages/functions/src/admin/adminCheck.handler',
      'GET /v1/student/getProfile': 'packages/functions/src/student/getMyProfile.handler',

      // courses
      'GET /v1/courses': 'packages/functions/src/course/getCourses.handler',
      'POST /v1/courses/apply': 'packages/functions/src/student/applyForCourse.handler',
      'GET /v1/student/myCourses': 'packages/functions/src/student/getMyCourse.handler',
      'POST /v1/admin/addCourse' : 'packages/functions/src/admin/course/addCourse.handler',
      'DELETE /v1/admin/{courseId}/delete': 'packages/functions/src/admin/course/deleteCourse.handler',
      'PUT /v1/admin/updateCourse': 'packages/functions/src/admin/course/updateCourse.handler',
      'POST /v1/admin/courseApplications' : 'packages/functions/src/admin/course/courseApplications.handler'
    },
  });

  auth.attachPermissionsForAuthUsers(stack, [api]);
  api.attachPermissionsToRoute('DELETE /v1/admin/user/{userId}/deleteUser', ['cognito-idp:AdminDeleteUser'])
  api.attachPermissionsToRoute('GET /v1/admin/user/getUsers', ['cognito-idp:ListUsers'])
  api.attachPermissionsToRoute('GET /v1/admin/user/getGroups', ['cognito-idp:ListGroups'])
  api.attachPermissionsToRoute('PATCH /v1/admin/user/{userId}/addUserToGroup', ['cognito-idp:AdminAddUserToGroup'])
  api.attachPermissionsToRoute('GET /v1/student/getProfile', ['cognito-idp:GetUser'])
  api.attachPermissionsToRoute('GET /v1/user/getRole', ['cognito-idp:*'])
  api.attachPermissions([courseTable, studentCourses])
  stack.addOutputs({
    ApiEndpoint: api.url
  });

  return { api }
}
