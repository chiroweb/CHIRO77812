import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "outline" | "text" | "ghost";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  type = "button",
  variant = "outline",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 text-sm tracking-[0.05em] transition-all duration-300 cursor-pointer";

  const variants = {
    outline:
      "border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3.5 md:py-3 hover:bg-[#1a1a1a] hover:text-white",
    ghost:
      "border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3.5 md:py-3 hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00]",
    text: "text-[#1a1a1a] border-b border-[#1a1a1a] pb-[2px] hover:border-transparent group",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
        {variant === "text" && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        )}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick}>
      {children}
      {variant === "text" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      )}
    </button>
  );
}
