"use client";

interface NotificationsHeaderProps {
  totalNotifications: number;
}

export default function NotificationsHeader({
  totalNotifications,
}: NotificationsHeaderProps) {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">Notification Center</h1>
      <p className="text-sm text-gray-500">{totalNotifications} total notifications sent</p>
    </div>
  );
}
