import { PersonalInfo } from "./personal-info";

export default function MyAccountPage() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-6 w-full mb-10 pt-4 md:pt-14">
        <div className="text-center mb-6 xl:mb-8 max-w-screen-sm mx-auto">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold pb-1 mb-4">
            My Account
          </h1>
          <PersonalInfo />
        </div>
      </div>
    </>
  );
}
