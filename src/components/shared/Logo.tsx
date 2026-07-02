import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo/logo.png"
      alt="Lade Digital"
      width={40}
      height={40}
      className={className}
      priority
    />
  );
}
