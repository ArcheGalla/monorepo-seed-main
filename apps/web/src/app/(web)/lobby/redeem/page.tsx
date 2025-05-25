import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";

export default function RedeemPage() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4 w-full mb-10 pt-4 md:pt-14">
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold pb-1 text-center mb-3">
            Redeem
          </h1>

          <p className="text-sm text-default-600 max-w-2xl mx-auto mb-3">
            Sweepstakes Coins can be redeemed for real cash prizes or gift
            cards. Sweepstakes Coins must be played at least once before they
            can be redeemed (SC 1.00 for $1 USD).
          </p>

          <div className="bg-content2 rounded-large p-3 mb-10">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="">Sweepstakes Coins Balance</div>
                <div className="">SC 0.90</div>
              </div>
              <div className="flex justify-between">
                <div className="">Unplayed</div>
                <div className="">SC 0.90</div>
              </div>
              <div className="flex justify-between">
                <div className="">Redeemable</div>
                <div className="text-green-500 font-medium">SC 0.00</div>
              </div>
            </div>
          </div>

          <div className="bg-content2 rounded-large p-3 mb-8 flex flex-col gap-3">
            <div className="-mt-10 mx-auto">
              <Icon height="64" icon="noto:bank" width="64" />
            </div>

            <h2 className="font-medium text-lg">Cash Prize</h2>
            <p>Redeemable to you bank account.</p>

            <div className="flex flex-col">
              <p className="font-medium text-green-500">
                Win minimum of SC 50 to redeem.
              </p>
              <p className="font-medium text-green-500">Keep Playing!</p>
            </div>

            <Button isDisabled className="text-base font-normal bg-btnPrimary">
              Insufficient SC
            </Button>
          </div>

          <h3 className="text-lg font-bold text-left mb-3">
            Pending Redemptions
          </h3>

          <div className="bg-content2 rounded-large p-3 mb-3  text-center">
            <p>You have no pending redemptions</p>
          </div>
        </div>
      </div>
    </>
  );
}
