"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  slug: string;
  initialViews: number;
}

export function ViewCounter({ slug, initialViews }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    // Send background increment
    fetch(`/api/views/${slug}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.viewsCount === "number") {
          setViews(data.viewsCount);
        } else {
          setViews((prev) => prev + 1);
        }
      })
      .catch(() => {
        // Silently tolerate in development / offline
      });
  }, [slug]);

  const formattedViews = new Intl.NumberFormat("id-ID").format(views);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-stone-500 uppercase tracking-wider">
      <Eye className="w-3.5 h-3.5" />
      <span>{formattedViews} pembaca</span>
    </span>
  );
}
