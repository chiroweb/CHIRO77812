"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, viewportConfig } from "@/lib/motion";

interface ComparisonRow {
  feature: string;
  values: (boolean | string)[];
}

interface ComparisonTableProps {
  label?: string;
  heading?: string;
  columns: string[];
  rows: ComparisonRow[];
  highlightColumn?: number;
}

function CellValue({ value, isHighlight }: { value: boolean | string; isHighlight: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-full"
        style={{ backgroundColor: "rgba(16,185,129,0.15)" }}
        aria-label="포함"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5l2.5 2.5L8 3"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ) : (
      <span className="text-[#ccc] text-[18px] leading-none select-none" aria-label="미포함">
        —
      </span>
    );
  }
  return (
    <span
      className="text-[13px] leading-[1.6]"
      style={{ color: isHighlight ? "#111" : "#666" }}
    >
      {value}
    </span>
  );
}

export default function ComparisonTable({
  label,
  heading,
  columns,
  rows,
  highlightColumn,
}: ComparisonTableProps) {
  const hi = highlightColumn ?? columns.length - 1;

  return (
    <section className="py-[80px] md:py-[120px] px-5 md:px-12 lg:px-20 bg-[#f5f5f0]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        {(label || heading) && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12 md:mb-16"
          >
            {label && (
              <motion.p
                variants={fadeInUp}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6"
              >
                {label}
              </motion.p>
            )}
            {heading && (
              <motion.h2
                variants={fadeInUp}
                className="text-[32px] md:text-[52px] lg:text-[64px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111]"
              >
                {heading}
              </motion.h2>
            )}
          </motion.div>
        )}

        {/* Table wrapper — horizontal scroll on mobile, first col sticky */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0"
        >
          <table className="w-full border-collapse" style={{ minWidth: "560px" }}>
            <thead>
              <tr className="border-b border-[#ddd]">
                {/* sticky feature column header */}
                <th
                  className="text-left py-4 pr-6 w-[30%] bg-[#f5f5f0] sticky left-0 z-10"
                  style={{ minWidth: "140px" }}
                >
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] font-normal">
                    기능
                  </span>
                </th>

                {columns.map((col, ci) => {
                  const isHi = ci === hi;
                  return (
                    <th
                      key={ci}
                      className="text-left py-4 px-5"
                      style={{
                        backgroundColor: isHi ? "#111" : "transparent",
                        borderRadius: ci === hi ? "4px 4px 0 0" : undefined,
                      }}
                    >
                      <span
                        className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase font-normal"
                        style={{ color: isHi ? "#fff" : "#999" }}
                      >
                        {col}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, ri) => {
                const isEven = ri % 2 === 0;
                return (
                  <motion.tr
                    key={ri}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="border-b border-[#ddd]"
                    style={{ backgroundColor: isEven ? "#f5f5f0" : "#efefea" }}
                  >
                    {/* sticky feature cell */}
                    <td
                      className="py-4 pr-6 text-[13px] font-medium text-[#111] align-middle sticky left-0 z-10"
                      style={{
                        backgroundColor: isEven ? "#f5f5f0" : "#efefea",
                        minWidth: "140px",
                      }}
                    >
                      {row.feature}
                    </td>

                    {row.values.map((val, ci) => {
                      const isHi = ci === hi;
                      return (
                        <td
                          key={ci}
                          className="py-4 px-5 align-middle"
                          style={{
                            backgroundColor: isHi
                              ? isEven
                                ? "rgba(17,17,17,0.06)"
                                : "rgba(17,17,17,0.09)"
                              : undefined,
                          }}
                        >
                          <CellValue value={val} isHighlight={isHi} />
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
