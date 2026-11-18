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
        // Silently tolerate
      });
  }, [slug]);

  const formattedViews = new Intl.NumberFormat("id-ID").format(views);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400">
      <Eye className="w-3.5 h-3.5 text-zinc-400" />
      <span>{formattedViews} pembaca</span>
    </span>
  );
}
