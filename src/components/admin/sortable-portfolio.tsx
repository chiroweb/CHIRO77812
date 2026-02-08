"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PortfolioProject } from "@/lib/types";
import Link from "next/link";

interface SortableItemProps {
  project: PortfolioProject;
  onDelete: (id: number) => void;
}

function SortableItem({ project, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between py-4 border-b border-[#e5e5e3] bg-white"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          {...attributes}
          {...listeners}
          className="text-[#9b9b9b] hover:text-[#1a1a1a] cursor-grab active:cursor-grabbing px-1 touch-none"
        >
          ⠿
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                project.published ? "bg-green-500" : "bg-[#e5e5e3]"
              }`}
            />
            <span className="text-base font-normal truncate">{project.name}</span>
          </div>
          <div className="flex items-center gap-4 ml-5">
            <span className="text-xs text-[#9b9b9b]">{project.category}</span>
            <span className="text-xs text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)]">
              {project.year}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <Link
          href={`/chiro/portfolio/${project.id}/edit`}
          className="text-xs px-3 py-1 border border-[#e5e5e3] hover:border-[#1a1a1a] transition-colors"
        >
          수정
        </Link>
        <button
          onClick={() => onDelete(project.id)}
          className="text-xs px-3 py-1 border border-[#e5e5e3] text-[#FF4D00] hover:border-[#FF4D00] transition-colors cursor-pointer"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

interface SortablePortfolioListProps {
  projects: PortfolioProject[];
  onReorder: (projects: PortfolioProject[]) => void;
  onDelete: (id: number) => void;
}

export default function SortablePortfolioList({
  projects,
  onReorder,
  onDelete,
}: SortablePortfolioListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);
      const newOrder = arrayMove(projects, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={projects.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="border-t border-[#e5e5e3]">
          {projects.map((project) => (
            <SortableItem
              key={project.id}
              project={project}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
