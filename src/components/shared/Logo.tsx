import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/logo/logo.png"
        alt="Lade Digital"
        width={80}
        height={80}
        className="h-full w-auto rounded-lg"
        priority
      />
      <span className="font-semibold text-2xl">Lade Digital</span>
    </span>
  );
}
