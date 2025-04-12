import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <div className="p-10 bg-white shadow-sm">
          <h2 className="text-2xl font-medium mb-4 text-gray-500">Home</h2>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
