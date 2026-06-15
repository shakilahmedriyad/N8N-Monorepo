import "server-only";
import getSession from "./get-session";

export default async function getUser() {
  try {
    const session = await getSession();
    if (session?.user) return session.user;
    return null;
  } catch (error) {
    return null;
  }
}
