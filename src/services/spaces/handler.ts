import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpaces";
import { deleteSpace } from "./DeleteSpaces";

import { JsonError, MissingFieldError } from "../shared/Validator";

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = getSpaces(event, ddbClient);
        return getResponse;
        break;
      case "POST":
        const postResponse = postSpaces(event, ddbClient);
        return postResponse;
      default:
        break;
      case "PUT":
        const putResponse = await updateSpace(event, ddbClient);
        return putResponse;
      case "Delete":
        const deleteResponse = await deleteSpace(event, ddbClient);
        return deleteResponse;

        break;
    }
  } catch (error) {
    console.error(error);
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }

    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    return {
      statusCode: 500,
      body: error.message,
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  return response;
}
export { handler };
