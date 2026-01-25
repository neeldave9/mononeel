import React from "react";
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 border">{children}</button>;
}
