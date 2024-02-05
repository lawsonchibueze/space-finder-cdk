import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  MethodOptions,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  spacesLambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "SpacesApi");

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "SpaceApiAuthorizer",
      {
        cognitoUserPools: [props.userPool],
        identitySource: "method.request.header.Authorization",
      }
    );

    authorizer._attachToApi(api);

    const spacesResource = api.root.addResource("spaces");

    const optionWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId,
      },
    };

    spacesResource.addMethod(
      "GET",
      props.spacesLambdaIntegration,
      optionWithAuth
    );
    spacesResource.addMethod(
      "POST",
      props.spacesLambdaIntegration,
      optionWithAuth
    );
    spacesResource.addMethod(
      "PUT",
      props.spacesLambdaIntegration,
      optionWithAuth
    );
    spacesResource.addMethod(
      "DELETE",
      props.spacesLambdaIntegration,
      optionWithAuth
    );
  }
}
