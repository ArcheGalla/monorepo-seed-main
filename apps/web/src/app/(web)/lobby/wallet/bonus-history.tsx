"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card, CardHeader, CardBody } from "@heroui/card";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

interface BonusRecord {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: "Claimed" | "Pending" | "Expired";
}

export const BonusHistory = () => {
  const [selectedDateRange, setSelectedDateRange] =
    React.useState("Last 30 days");
  const [selectedType, setSelectedType] = React.useState("All Types");

  const bonusHistory: BonusRecord[] = [
    {
      id: "1",
      date: "April 15, 2025",
      type: "Daily Login Bonus",
      amount: "500 GC",
      status: "Claimed",
    },
    {
      id: "2",
      date: "April 14, 2025",
      type: "Referral Bonus",
      amount: "1,000 GC",
      status: "Claimed",
    },
    {
      id: "3",
      date: "April 13, 2025",
      type: "Level Up Reward",
      amount: "5 SC",
      status: "Claimed",
    },
    {
      id: "4",
      date: "April 12, 2025",
      type: "Weekly Bonus",
      amount: "2,500 GC",
      status: "Claimed",
    },
    {
      id: "5",
      date: "April 11, 2025",
      type: "Special Promotion",
      amount: "1,000 VB",
      status: "Claimed",
    },
    {
      id: "6",
      date: "April 10, 2025",
      type: "Daily Login Bonus",
      amount: "500 GC",
      status: "Claimed",
    },
  ];

  const dateRanges = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "This year",
    "All time",
  ];

  const bonusTypes = [
    "All Types",
    "Daily Login Bonus",
    "Weekly Bonus",
    "Referral Bonus",
    "Level Up Reward",
    "Special Promotion",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Claimed":
        return "success";
      case "Pending":
        return "warning";
      case "Expired":
        return "danger";
      default:
        return "default";
    }
  };

  const getAmountColor = (amount: string) => {
    if (amount.includes("SC")) return "text-success";
    if (amount.includes("VB")) return "text-magenta";

    return "text-amber";
  };

  return (
    <Card className="border border-magenta/30 bg-gradient-to-r from-plumDark via-plum to-plumDark shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-secondary/30">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-vegas-magenta rounded-full" />
          <h2 className="text-xl font-semibold bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent">
            My Bonus Claim History
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="min-w-[150px] bg-plumDark border border-secondary"
                color="secondary"
                endContent={<Icon icon="lucide:chevron-down" width={16} />}
                variant="flat"
              >
                {selectedDateRange}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Date range selection"
              className="bg-midnight border border-midnight"
              onAction={(key) => setSelectedDateRange(dateRanges[Number(key)])}
            >
              {dateRanges.map((range, index) => (
                <DropdownItem
                  key={index}
                  className="text-vegas-platinum hover:bg-vegas-plum/30"
                >
                  {range}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                className="min-w-[150px] bg-plumDark border border-secondary"
                color="secondary"
                endContent={<Icon icon="lucide:chevron-down" width={16} />}
                variant="flat"
              >
                {selectedType}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Bonus type selection"
              className="bg-midnight border border-midnight"
              onAction={(key) => setSelectedType(bonusTypes[Number(key)])}
            >
              {bonusTypes.map((type, index) => (
                <DropdownItem
                  key={index}
                  className="text-vegas-platinum hover:bg-vegas-plum/30"
                >
                  {type}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
      <CardBody>
        <Table
          removeWrapper
          aria-label="Bonus claim history table"
          classNames={{
            th: "bg-plumDark",
            td: "border-b border-plumDark text-[#e5e7eb]",
            tr: "hover:bg-secondary/10",
          }}
        >
          <TableHeader>
            <TableColumn>DATE</TableColumn>
            <TableColumn>BONUS TYPE</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {bonusHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon
                      className="text-magenta"
                      icon={
                        record.type.includes("Login")
                          ? "lucide:calendar-check"
                          : record.type.includes("Referral")
                            ? "lucide:users"
                            : record.type.includes("Level")
                              ? "lucide:trophy"
                              : record.type.includes("Weekly")
                                ? "lucide:calendar-days"
                                : "lucide:gift"
                      }
                      width={16}
                    />
                    {record.type}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`font-semibold ${getAmountColor(record.amount)}`}
                  >
                    {record.amount}
                  </span>
                </TableCell>
                <TableCell>
                  <Chip
                    classNames={{
                      base:
                        record.status === "Claimed"
                          ? "bg-emerald text-white"
                          : record.status === "Pending"
                            ? "border border-amber/30"
                            : "border border-magenta/30",
                      content: "font-medium",
                    }}
                    color={getStatusColor(record.status) as any}
                    size="sm"
                    variant={record.status === "Claimed" ? "solid" : "flat"}
                  >
                    <div className="flex items-center gap-1">
                      {record.status === "Claimed" && (
                        <Icon icon="lucide:check-circle" width={14} />
                      )}
                      {record.status === "Pending" && (
                        <Icon icon="lucide:clock" width={14} />
                      )}
                      {record.status === "Expired" && (
                        <Icon icon="lucide:x-circle" width={14} />
                      )}
                      {record.status}
                    </div>
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};
