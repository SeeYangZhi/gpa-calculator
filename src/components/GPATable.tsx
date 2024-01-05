"use client";

import * as React from "react";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";

import type { Course } from "../types/course.types";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export function GPATable(props: {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  removeCourse: (id: string) => void;
}) {
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Course>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "course",
      header: () => <div className="text-center">Course</div>,
      cell: ({ row }) => (
        <div className="text-center capitalize">{row.getValue("course")}</div>
      )
    },
    {
      accessorKey: "credit",
      header: () => <div className="text-center">Credit</div>,
      cell: ({ row }) => (
        <div className="text-center lowercase">{row.getValue("credit")}</div>
      )
    },
    {
      accessorKey: "grade",
      header: () => <div className="text-center">Grade</div>,
      cell: ({ row }) => (
        <div className="text-center capitalize">{row.getValue("grade")}</div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    props.removeCourse(row.original.id);
                    // row.toggleSelected(false);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }
    }
  ];

  const table = useReactTable({
    data: props.courses,
    getRowId: (row) => row.id,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  });

  const calculateGPA = (courses: Course[]) => {
    const totalCredits = courses.reduce(
      (acc, course) => acc + course.credit,
      0
    );
    const totalGradePoints = courses.reduce(
      (acc, course) => acc + gradeToPoints(course.grade) * course.credit,
      0
    );
    return totalGradePoints / totalCredits;
  };

  const gradeToPoints = (grade: string) => {
    switch (grade) {
      case "A":
      case "A+":
        return 5.0;
      case "A-":
        return 4.5;
      case "B+":
        return 4.0;
      case "B":
        return 3.5;
      case "B-":
        return 3.0;
      case "C+":
        return 2.5;
      case "C":
        return 2.0;
      case "D+":
        return 1.5;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      default:
        return 0.0;
    }
  };

  return (
    <div className="mt-20 w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Course..."
          value={(table.getColumn("course")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("course")?.setFilterValue(event.target.value)
          }
          className="mr-5 max-w-sm"
        />
        <Button
          className="ml-auto"
          variant="destructive"
          onClick={() => {
            const courseIdsToRemove = table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original.id);

            props.setCourses(
              props.courses.filter(
                (course) => !courseIdsToRemove.includes(course.id)
              )
            );

            table.toggleAllRowsSelected(false);
          }}
        >
          Delete Selected
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-center" colSpan={5}>
                {`GPA = ${
                  isNaN(calculateGPA(props.courses))
                    ? "0.00"
                    : calculateGPA(props.courses).toFixed(2)
                }`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
