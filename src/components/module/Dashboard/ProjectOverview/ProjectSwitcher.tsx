"use client";

import { DemoProject } from "@/constants/demoData";
import { UserCheck, Calendar } from "lucide-react";

interface ProjectSwitcherProps {
  projects: DemoProject[];
  selectedProjectId: number | string;
  onSelectProject: (id: number | string) => void;
}

export default function ProjectSwitcher({
  projects,
  selectedProjectId,
  onSelectProject,
}: ProjectSwitcherProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
        Select Project to View Details
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {projects.map((proj) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => onSelectProject(proj.id)}
            className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col gap-2 cursor-pointer ${
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
  );
}
