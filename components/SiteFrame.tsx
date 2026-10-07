import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteFrame({ children }: { children: ReactNode }) {
  return <><Header /><main id="main">{children}</main><Footer /></>;
}
