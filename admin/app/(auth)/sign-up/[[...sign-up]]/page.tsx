import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignUp />;
    </div>
  );
}

After clicking "Donate Now," an error page appears, and the Donor Comments and card number details are cleared., In testing environments, live payment gateways like authorize.net are often not connected or fully configured, leading to errors during the transaction process.