import React from "react";

import { HelpCenterContent } from "./help-center-content";

export default function HelpCenterPage() {
  return (
    <>
      {/* <div className="max-w-screen-lg mx-auto p-6 w-full mb-10 pt-10">
        <div className="text-center mb-6 xl:mb-12 pt-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold pb-1 mb-4 bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent">
            Support & Legal
          </h1>
          <p className="text-large text-default-600 max-w-2xl mx-auto">Get help and access legal information</p>
        </div>
      </div> */}

      <div className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-900 w-full">
        <HelpCenterContent />
      </div>
    </>
  );
}
