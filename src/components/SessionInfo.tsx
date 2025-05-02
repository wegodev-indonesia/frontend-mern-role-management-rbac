import { auth } from "@/auth";

export default async function Tes() {
  const session = await auth();
  if (!session) {
    return <p>Not authenticated</p>;
  } else {
    return (
      <>
        <p>Authenticated :</p>
        <p>Id: {session.user._id}</p>
        <p>Fullname: {session.user.fullname}</p>
        <p>Roles: {session.user.roles.join(", ")}</p>
        <p>Access Token: {session.user.accessToken}</p>
      </>
    );
  }
}
