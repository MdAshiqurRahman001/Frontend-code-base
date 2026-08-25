/**
 * ==============================================================================
 * 📌 PROJECTS MANAGEMENT PAGE (/dashboard/projects)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This page displays all active and completed creative projects. It includes:
 *  - Project status badges and client/creator avatars
 *  - Interactive Milestones Timeline (switch milestone status live!)
 *  - Deliverables Upload & Review Dialog
 *  - Project Cancellation & Dispute modal
 *
 * 🛠️ HOW IT WORKS:
 * All state is interactive: clicking "Mark Completed", "Mark In Progress", or
 * "Mark Upcoming" updates the visual state instantly with a toast alert.
 * ==============================================================================
 */

"use client";

import { useState } from "react";
import ProjectHeader from "@/components/module/Dashboard/ProjectOverview/ProjectHeader";
import Timeline from "@/components/module/Dashboard/ProjectOverview/Timeline";
import Deliverables from "@/components/module/Dashboard/ProjectOverview/Deliverables";
import Cancellation from "@/components/module/Dashboard/ProjectOverview/Cancellation";
import { DEMO_PROJECTS, DemoProject } from "@/constants/demoData";
import { FolderKanban, Calendar, DollarSign, UserCheck } from "lucide-react";
import { toast } from "sonner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<DemoProject[]>(DEMO_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(DEMO_PROJECTS[0].id);

  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Callback to update milestone status interactively
  const handleUpdateMilestoneStatus = (
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
  };

  const handleInitiateCancellation = () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId ? { ...p, status: "Cancelled" } : p
      )
    );
    toast.error("Project has been marked as Cancelled.");
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Project Header with status badge */}
      <ProjectHeader
        title={currentProject.title}
        status={currentProject.status}
      />

      {/* 2. Project Switcher / Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
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
                  ? "border-indigo-600 bg-indigo-50/50 shadow-xs"
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
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Total Escrow</p>
            <p className="text-xl font-bold text-slate-800">{currentProject.budget}</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Completion</p>
            <p className="text-xl font-bold text-slate-800">{currentProject.progress}%</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
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
