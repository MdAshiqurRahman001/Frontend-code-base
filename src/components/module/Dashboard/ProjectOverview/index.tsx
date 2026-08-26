/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import ProjectHeader from "./ProjectHeader";
import Timeline from "./Timeline";
import Deliverables from "./Deliverables";
import Cancellation from "./Cancellation";
import ProjectSwitcher from "./ProjectSwitcher";
import ProjectSummaryCards from "./ProjectSummaryCards";
import { DEMO_PROJECTS, DemoProject } from "@/constants/demoData";
import {
  useGetProjectsQuery,
  useUpdateMilestoneStatusMutation,
  useCancelProjectMutation,
} from "@/redux/api/projectsApi";
import { toast } from "sonner";

export default function DashboardProjectsModule() {
  const { data: apiProjectsData } = useGetProjectsQuery();
  const [updateMilestoneApi] = useUpdateMilestoneStatusMutation();
  const [cancelProjectApi] = useCancelProjectMutation();

  const [projects, setProjects] = useState<DemoProject[]>(DEMO_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<number | string>(
    DEMO_PROJECTS[0].id
  );

  useEffect(() => {
    if (apiProjectsData) {
      const raw = Array.isArray(apiProjectsData?.data)
        ? (apiProjectsData.data as DemoProject[])
        : (apiProjectsData?.data as any)?.data;
      if (raw && Array.isArray(raw) && raw.length > 0) {
        setProjects(raw);
        setSelectedProjectId((prev) => prev || raw[0].id);
      }
    }
  }, [apiProjectsData]);

  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0] || DEMO_PROJECTS[0];

  const handleUpdateMilestoneStatus = async (
    milestoneId: number,
    newStatus: "COMPLETED" | "IN PROGRESS" | "UPCOMING"
  ) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) => {
        if (proj.id !== selectedProjectId) return proj;
        return {
          ...proj,
          milestones: proj.milestones.map((m) =>
            m.id === milestoneId ? { ...m, status: newStatus } : m
          ),
        };
      })
    );
    toast.success(`Milestone status updated to ${newStatus}!`);

    try {
      await updateMilestoneApi({
        projectId: selectedProjectId,
        milestoneId,
        status: newStatus,
      }).unwrap();
    } catch {
      // Graceful fallback
    }
  };

  const handleInitiateCancellation = async () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId ? { ...p, status: "Cancelled" } : p
      )
    );
    toast.error("Project has been marked as Cancelled.");

    try {
      await cancelProjectApi({ projectId: selectedProjectId }).unwrap();
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Project Header with status badge */}
      <ProjectHeader
        title={currentProject.title}
        status={currentProject.status}
      />

      {/* 2. Project Switcher / Tabs */}
      <ProjectSwitcher
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
      />

      {/* 3. Project Summary Cards */}
      <ProjectSummaryCards project={currentProject} />

      {/* 4. Interactive Timeline & Milestones */}
      <Timeline
        milestones={currentProject.milestones}
        onUpdateStatus={handleUpdateMilestoneStatus}
      />

      {/* 5. Deliverables & Cancellation Modals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Deliverables projectStatus={currentProject.status} />
        <Cancellation
          projectStatus={currentProject.status}
          onInitiateCancellation={handleInitiateCancellation}
        />
      </div>
    </div>
  );
}
