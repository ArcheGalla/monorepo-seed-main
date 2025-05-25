import { ContactForm } from "./contact-form";

export default function SupportPage() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-6 w-full mb-10 pt-10">
        <div className="text-center mb-6 xl:mb-8 pt-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Support & Legal
          </h1>
          <p className="text-sm sm:text-base text-default-600 max-w-2xl mx-auto">
            Get help and access legal information
          </p>
        </div>

        <div
          // className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full"
          className="grid grid-cols-1 gap-8 h-full max-w-screen-sm mx-auto"
        >
          <ContactForm />
          {/* <div className="lg:col-span-1 flex flex-col">
            <LegalLinks />
          </div> */}
        </div>
      </div>
    </>
  );
}
