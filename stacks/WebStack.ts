import { StackContext, StaticSite, use } from 'sst/constructs'
import { ApiStack } from './ApiStack.js'
import { CognitoStack } from './CognitoStack.js'

export function WebStack ({stack, app}: StackContext) {
  const { auth } = use(CognitoStack)
  const { api } = use(ApiStack)
  const site = new StaticSite(stack, "Frontend", {
    path: "packages/web",
    buildCommand: "yarn build",
    errorPage: "redirect_to_index_page",
    buildOutput: "dist",
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_REGION: app.region,
      VITE_APP_USER_POOL_ID: auth.userPoolId,
      VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    }
  })
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}