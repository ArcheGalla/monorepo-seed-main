"use client";

import { Tabs, Tab } from "@heroui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

export default function TransactionHistoryPage() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-6 w-full mb-10 pt-4 md:pt-14">
        <div className="text-center mb-6 xl:mb-8 max-w-screen-sm mx-auto">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold pb-1 mb-4">
            Transaction History
          </h1>

          <Tabs>
            <Tab title="My Purchases">
              <p className="text-sm mb-3">
                The last 6 months of history is available to view below.
              </p>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Transaction</TableColumn>
                  <TableColumn>Amount</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell className="w-4/5">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs">
                          Credit Card -{" "}
                          <span className="text-danger">Failed</span>
                        </div>
                        <div className="text-xs">
                          GC 10,000,000 + FREE SC 30.00
                        </div>
                        <div className="text-xs text-default-400">
                          May 05, 2025 1:47pm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>$10.00</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>
                      {" "}
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs">
                          Credit Card -{" "}
                          <span className="text-danger">Failed</span>
                        </div>
                        <div className="text-xs">
                          GC 10,000,000 + FREE SC 30.00
                        </div>
                        <div className="text-xs text-default-400">
                          May 05, 2025 1:47pm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>$10.00</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>
                      {" "}
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs">
                          Credit Card -{" "}
                          <span className="text-green-500">Success</span>
                        </div>
                        <div className="text-xs">
                          GC 10,000,000 + FREE SC 30.00
                        </div>
                        <div className="text-xs text-default-400">
                          May 05, 2025 1:47pm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>$10.00</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>
                      {" "}
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs">
                          Credit Card -{" "}
                          <span className="text-danger">Failed</span>
                        </div>
                        <div className="text-xs">
                          GC 10,000,000 + FREE SC 30.00
                        </div>
                        <div className="text-xs text-default-400">
                          May 05, 2025 1:47pm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>$10.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Tab>
            <Tab title="My Redemptions">
              <p className="text-sm mb-3">
                The last 6 months of history is available to view below.
              </p>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Transaction</TableColumn>
                  <TableColumn>Amount</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell className="w-4/5">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs">
                          Credit Card -{" "}
                          <span className="text-danger">Failed</span>
                        </div>
                        <div className="text-xs">
                          GC 10,000,000 + FREE SC 30.00
                        </div>
                        <div className="text-xs text-default-400">
                          May 05, 2025 1:47pm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>$10.00</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>
                      {" "}
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs">
                          Credit Card -{" "}
                          <span className="text-danger">Failed</span>
                        </div>
                        <div className="text-xs">
                          GC 10,000,000 + FREE SC 30.00
                        </div>
                        <div className="text-xs text-default-400">
                          May 05, 2025 1:47pm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>$10.00</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>
                      {" "}
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs">
                          Credit Card -{" "}
                          <span className="text-green-500">Success</span>
                        </div>
                        <div className="text-xs">
                          GC 10,000,000 + FREE SC 30.00
                        </div>
                        <div className="text-xs text-default-400">
                          May 05, 2025 1:47pm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>$10.00</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>
                      {" "}
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs">
                          Credit Card -{" "}
                          <span className="text-danger">Failed</span>
                        </div>
                        <div className="text-xs">
                          GC 10,000,000 + FREE SC 30.00
                        </div>
                        <div className="text-xs text-default-400">
                          May 05, 2025 1:47pm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>$10.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
