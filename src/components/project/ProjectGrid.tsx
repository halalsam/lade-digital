"use client";

import { useState } from "react";
import { PROJECTS, FILTERS, type Category } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

type FilterId = "all" | Category;

export default function ProjectGrid() {
  const [active, setActive] = useState<FilterId>("all");

  const filtered = PROJECTS.filter(
    (p) => active === "all" || p.categories.includes(active as Category)
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-28 mt-16 flex flex-wrap justify-center gap-x-2 gap-y-3">
        {FILTERS.map((filter) => {
          const isActive = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              className={`group relative px-6 py-1.5 text-2xl tracking-[0.02em] transition-opacity ${
                isActive ? "opacity-100" : "opacity-40 hover:opacity-100"
              }`}
            >
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-700 ease-[var(--ease-reveal)] group-hover:-translate-y-full">
                  {filter.label}
                </span>
                <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-700 ease-[var(--ease-reveal)] group-hover:translate-y-0">
                  {filter.label}
                </span>
              </span>
              <span
                className={`absolute -bottom-0.5 left-6 right-6 h-px origin-left bg-ink transition-transform duration-500 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Offset two-column grid (right column drops down, like the source) */}
      <div className="grid gap-x-24 gap-y-24 md:grid-cols-2 md:gap-y-40">
        {filtered.map((project, i) => (
          <div
            key={project.slug}
            className={i % 2 === 1 ? "md:translate-y-40" : ""}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
