"use client";

import { useState } from "react";
import { PROJECTS, FILTERS, type Category } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import RevealUp from "../shared/RevealUp";
import HoverButton from "../shared/HoverButton";

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
            <span key={filter.id} className="relative">
              <HoverButton
                onClick={() => setActive(filter.id)}
                aria-pressed={isActive}
                className={`text-2xl tracking-[0.02em] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-100"
                }`}
              >
                {filter.label}
              </HoverButton>
              {/* Active underline — outside the overflow-hidden button so it
                  isn't clipped; animates its width from the left. */}
              <span
                className={`pointer-events-none absolute -bottom-0.5 left-5 right-5 h-px origin-left bg-ink transition-transform duration-500 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </span>
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
            <RevealUp>
              <ProjectCard project={project} />
            </RevealUp>
          </div>
        ))}
      </div>
    </div>
  );
}
