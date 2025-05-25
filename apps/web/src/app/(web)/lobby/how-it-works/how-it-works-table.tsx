"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";

export const HowItWorksTable = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const offset = 95;

    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <Table
      aria-label="Game modes comparison"
      classNames={{
        wrapper: "bg-content1",
        th: "bg-content2 text-white",
      }}
    >
      <TableHeader>
        <TableColumn key="1">
          <span className="sr-only">Feature</span>
        </TableColumn>
        {/* <TableColumn key="2" className="text-amber relative flex items-center"> */}
        <TableColumn key="2" className="text-amber relative">
          GC Mode
          <Button
            disableRipple
            isIconOnly
            size="sm"
            onPress={() => scrollToSection("gc-faq")}
            // className="text-amber h-4 bg-transparent p-0 absolute right-0 top-0"
            className="text-amber h-4 bg-transparent p-0"
          >
            <Icon height="14" icon="lucide:arrow-down" width="14" />
          </Button>
        </TableColumn>
        <TableColumn key="3" className="text-green-500">
          SC Mode
          <Button
            disableRipple
            isIconOnly
            className="text-green-500 h-4 bg-transparent p-0"
            size="sm"
            onPress={() => scrollToSection("sc-faq")}
          >
            <Icon height="14" icon="lucide:arrow-down" width="14" />
          </Button>
        </TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Purpose</TableCell>
          <TableCell>Entertainment only</TableCell>
          <TableCell>Play for free and potentially win rewards</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>How to Get</TableCell>
          <TableCell>Purchase from store</TableCell>
          <TableCell>
            Free with GC bundles or through alternative methods
          </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Can be purchased?</TableCell>
          <TableCell>Yes</TableCell>
          <TableCell>No, never available for purchase</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Exchanged for real money?</TableCell>
          <TableCell>No</TableCell>
          <TableCell>No, but can be used for sweepstakes entries</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>Purchase required?</TableCell>
          <TableCell>Yes</TableCell>
          <TableCell>No purchase necessary</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
