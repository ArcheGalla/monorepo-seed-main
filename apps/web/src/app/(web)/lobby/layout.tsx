import { MobileMenu } from "@/components/lobby/mobile-menu";
import { Sidebar } from "@/components/lobby/sidebar";
import { CurrencyNav } from "@/components/lobby/currency-nav";
import { getDecodedUserJWT } from "@/utils/cookies/jwt";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const decodedUserJWT = await getDecodedUserJWT();

  // if (!decodedUserJWT) {
  //   redirect("/");
  // }

  return (
    <>
      {/* <UserSet user={decodedUserJWT as unknown as IUser} /> */}
      <div className="relative flex flex-col min-h-screen w-full">
        <CurrencyNav />
        <div className="min-h-screen">
          {/* Desktop Layout */}
          <div className="flex">
            {/* Sidebar - Hidden on mobile */}
            <div className="hidden md:block w-72 min-h-screen ">
              <Sidebar />
            </div>
            <div className="flex-1 relative flex-col flex-grow flex items-center justify-center w-full pb-10 h-full overflow-auto">
              {children}
            </div>
            {/* Mobile Bottom Menu - Visible only on mobile */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </>
  );
}
