import { auth } from "@/auth";

export default async function Tes() {
  const session = await auth();
  if (!session) {
    return <p>Not authenticated</p>;
  } else {
    return (
      <>
        <p>
          <strong>Id:</strong> {session.user._id}
        </p>
        <p>
          <strong>Fullname:</strong> {session.user.fullname}
        </p>
        <p>
          <strong>Roles:</strong> {session.user.roles.join(", ")}
        </p>
      </>
    );
  }
}
