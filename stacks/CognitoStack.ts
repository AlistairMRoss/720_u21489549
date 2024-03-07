import { StackContext, Cognito} from 'sst/constructs'

export function CognitoStack ({ stack, app }: StackContext) {
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  })
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });
  return { auth }
}