/**
 * ==============================================================================
 * 📌 PROJECTS MANAGEMENT PAGE (/dashboard/projects)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This page displays creative projects and milestones.
 *
 * 🛠️ DUAL-MODE DYNAMIC API INTEGRATION:
 *  - Live Mode: Connects to `projectsApi` endpoints (`getProjects`, `updateMilestoneStatus`)
 *  - Demo Mode: Falls back to `DEMO_PROJECTS` with instant toast simulation
 * ==============================================================================
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import ProjectHeader from "@/components/module/Dashboard/ProjectOverview/ProjectHeader";
import Timeline from "@/components/module/Dashboard/ProjectOverview/Timeline";
import Deliverables from "@/components/module/Dashboard/ProjectOverview/Deliverables";
import Cancellation from "@/components/module/Dashboard/ProjectOverview/Cancellation";
import { DEMO_PROJECTS, DemoProject } from "@/constants/demoData";
import {
  useGetProjectsQuery,
  useUpdateMilestoneStatusMutation,
  useCancelProjectMutation,
} from "@/redux/api/projectsApi";
import { FolderKanban, Calendar, DollarSign, UserCheck } from "lucide-react";
import { toast } from "sonner";

export default function ProjectsPage() {
  const { data: apiProjectsData } = useGetProjectsQuery();
  const [updateMilestoneApi] = useUpdateMilestoneStatusMutation();
  const [cancelProjectApi] = useCancelProjectMutation();

  // Normalize API data or use demo fallback
  const rawProjects = Array.isArray(apiProjectsData?.data)
    ? (apiProjectsData.data as DemoProject[])
    : (apiProjectsData?.data as any)?.data || DEMO_PROJECTS;

  const [projects, setProjects] = useState<DemoProject[]>(rawProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<number | string>(
    projects[0]?.id || DEMO_PROJECTS[0].id
  );

  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0] || DEMO_PROJECTS[0];

  // Callback to update milestone status interactively + via API
  const handleUpdateMilestoneStatus = async (
    milestoneId: number,
    newStatus: "COMPLETED" | "IN PROGRESS" | "UPCOMING"
  ) => {
    // 1. Optimistic local update
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

    // 2. Dispatch to backend API if available
    try {
      await updateMilestoneApi({
        projectId: selectedProjectId,
        milestoneId,
        status: newStatus,
      }).unwrap();
    } catch {
      // Graceful fallback for offline demo mode
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
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Select Project to View Details
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col gap-2 ${
                proj.id === selectedProjectId
                  ? "border-indigo-600 bg-indigo-50/50 shadow-2xs"
                  : "border-slate-100 hover:border-slate-200 bg-slate-50/50"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-sm text-slate-800 line-clamp-1">
                  {proj.title}
                </span>
                <span className="text-xs font-semibold text-indigo-600 shrink-0">
                  {proj.budget}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  {proj.creator}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {proj.deadline}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Project Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Total Escrow</p>
            <p className="text-xl font-bold text-slate-800">{currentProject.budget}</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Completion</p>
            <p className="text-xl font-bold text-slate-800">{currentProject.progress}%</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Target Delivery</p>
            <p className="text-xl font-bold text-slate-800">{currentProject.deadline}</p>
          </div>
        </div>
      </div>

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
