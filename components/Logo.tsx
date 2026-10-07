import Link from "next/link";
import Image from "next/image";

/** Brand lockup. `light` (default) is the ivory/orange version for dark surfaces. */
export function Logo({ variant = "light", priority = false }: { variant?: "light" | "color"; priority?: boolean }) {
  const src = variant === "light" ? "/images/alishba-logo-light.webp" : "/images/alishba-logo-trim.webp";
  return (
    <Link href="/" className="logo" aria-label="Alishba Cruises — home">
      <Image className="logo-image" src={src} alt="Alishba Cruises" width={398} height={106} priority={priority} />
    </Link>
  );
}
