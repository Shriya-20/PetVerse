import jwt from "jsonwebtoken";

// key to generate and decode jwt token for creating sessions
const SECRET_KEY = process.env.SESSION_SECRET_KEY;

export async function GET(req) {
  const token = req.cookies.get("token");
  console.log(token);

  if (!token) {
    console.log("Error in getting token");
    return new Response("Not authenticated", { status: 401 });
  }
  console.log("secret key");
  console.log(SECRET_KEY);
  try {
    console.log("trying to do something");
    const userData = jwt.verify(token.value, SECRET_KEY);
    console.log("Session succuessfully created");
    console.log(userData);

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    console.log("error in creating session");
    return new Response("invalid token", { status: 401 });
  }
}
