import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "SpaceStack-0e1593465e19";

handler(
  {
    httpMethod: "POST",
    body: JSON.stringify({
      location: "Mexico",
      name: "Okezie",
    }),
  } as any,
  {} as any
).then((result) => {
  console.log(result);
});
