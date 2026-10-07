import Link from "next/link";
import Image from "next/image";

/** Brand lockup. Both versions are rendered; CSS shows the right one for the surface/theme
 *  (ivory+orange on dark/photo surfaces, full colour on light surfaces). */
export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Alishba Cruises — home">
      <Image className="logo-image logo-on-dark" src="/images/alishba-logo-light.webp" alt="Alishba Cruises" width={398} height={106} priority={priority} />
      <Image className="logo-image logo-on-light" src="/images/alishba-logo-trim.webp" alt="" aria-hidden="true" width={398} height={106} priority={priority} />
    </Link>
  );
}
