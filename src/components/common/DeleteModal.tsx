"use client";

import Swal from "sweetalert2";

interface DeleteModalOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

/**
 * showDeleteModal — a reusable async confirmation dialog.
 * Returns `true` if the user confirmed, `false` if they cancelled.
 *
 * @example
 * const confirmed = await showDeleteModal({ title: "Delete User?" });
 * if (confirmed) { await deleteUser(id); }
 */
export async function showDeleteModal({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
}: DeleteModalOptions = {}): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: "#DE251F",
    cancelButtonColor: "#6B7280",
    background: "#FFFFFF",
    color: "#111827",
    focusCancel: true,
  });

  return result.isConfirmed;
}

export default showDeleteModal;
