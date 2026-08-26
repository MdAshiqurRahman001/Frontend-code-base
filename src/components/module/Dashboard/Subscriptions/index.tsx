"use client";

import { useState } from "react";
import { DEMO_PACKAGES, DemoPackage } from "@/constants/demoData";
import { toast } from "sonner";
import SubscriptionsHeader from "./SubscriptionsHeader";
import SubscriptionPlanCards from "./SubscriptionPlanCards";
import SubscriptionGuaranteeFooter from "./SubscriptionGuaranteeFooter";

export default function DashboardUserSubscriptionsModule() {
  const [activePlanId, setActivePlanId] = useState<number>(2); // Default to Pro Agency for demo

  const handleSubscribe = (pkg: DemoPackage) => {
    setActivePlanId(pkg.id);
    toast.success(`Successfully activated "${pkg.name}" plan! 🎉`);
  };

  return (
    <div className="space-y-6 py-4 pb-10">
      {/* Header */}
      <SubscriptionsHeader />

      {/* Subscription Cards Grid */}
      <SubscriptionPlanCards
        packages={DEMO_PACKAGES}
        activePlanId={activePlanId}
        onSubscribe={handleSubscribe}
      />

      {/* Benefits Footer */}
      <SubscriptionGuaranteeFooter />
    </div>
  );
}
