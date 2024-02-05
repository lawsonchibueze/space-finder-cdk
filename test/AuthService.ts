import { Amplify, Auth } from "aws-amplify";
import { type CognitoUser } from "@aws-amplify/auth";

const awsRegion = "us-east-1";

Amplify.configure({
  Auth: {
    region: awsRegion,
    userPoolId: "us-east-1_Oa8sv4uFO",
    userPoolWebClientId: "2r7hsqireniial61fm0s70pb3v",
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(userName: string, password: string) {
    const result = (await Auth.signIn(userName, password)) as CognitoUser;
    return result;
  }
}
