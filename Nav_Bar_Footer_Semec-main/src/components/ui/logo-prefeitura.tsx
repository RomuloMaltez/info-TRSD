import Image from "next/image";

type LogoSize = "desktop" | "mobile" | "hero";

interface LogoPrefeituraProps {
  size?: LogoSize;
  className?: string;
}

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  desktop: { width: 140, height: 140 },
  mobile: { width: 96, height: 96 },
  hero: { width: 200, height: 200 },
};

export default function LogoPrefeitura({
  size = "desktop",
  className = "",
}: LogoPrefeituraProps) {
  const dimensions = sizeMap[size];

  return (
    <Image
      src="/logo-semec.svg"
      alt="Logotipo da Prefeitura de Porto Velho - SEMEC"
      width={dimensions.width}
      height={dimensions.height}
      priority
      className={`object-contain ${className}`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    />
  );
}
