import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("lawson", "Okezie@February28");

  console.log(loginResult);
}

testAuth();
