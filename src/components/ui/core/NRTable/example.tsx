/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { NRTable } from "./index";
import TablePagination from "./TablePagination";
import DeleteConfirmationModal from "../NRModal/DeleteConfirmationModal";
import { Button } from "@/components/ui/button";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Admin",
    status: "Active",
  },
];

const ExampleTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = () => {
    if (selectId) {
      toast.success(`Deleted item ${selectedItem || selectId}`);
    }
    setModalOpen(false);
    setSelectId(null);
    setSelectedItem(null);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => row.getValue("email"),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
          {row.getValue("role")}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600">
          {row.getValue("status")}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              toast.info(`Edit clicked for ${row.getValue("name")}`);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setSelectId(row.getValue("id"));
              setSelectedItem(row.getValue("name"));
              setModalOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Data Table Example</h2>
      <NRTable columns={columns} data={mockUsers} />
      <TablePagination
        totalPage={5}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ExampleTable;
