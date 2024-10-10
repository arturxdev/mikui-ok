import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center h-screen flex-row items-center">
      <SignUp />
    </div>
  );
}
