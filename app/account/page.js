import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(" ")[0];

  return (
    <div>
      <h1>Welcome, {firstName}</h1>
    </div>
  );
}
