import { VideoDebugSnapshot } from "@/hooks/useVideoDebug";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function VideoDebugOverlay(props: {
  enabled: boolean;
  items: VideoDebugSnapshot[];
  onClear: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  if (!props.enabled) return null;

  const latest = props.items[0];

  if (collapsed) {
    return (
      <div className="pointer-events-none absolute right-3 top-3 z-[9999]">
        <Button
          variant="secondary"
          size="sm"
          className="pointer-events-auto opacity-80"
          onClick={() => setCollapsed(false)}
        >
          Debug ▼
        </Button>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute right-3 top-3 z-[9999] w-[min(420px,calc(100%-24px))]">
      <div className="pointer-events-auto rounded-lg border border-border bg-background/90 p-3 text-foreground shadow-lg backdrop-blur">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="text-sm font-semibold">Video Debug</div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setCollapsed(true)}>
              ▲
            </Button>
            <Button variant="secondary" size="sm" onClick={props.onClear}>
              Clear
            </Button>
          </div>
        </div>

        {latest && (
          <div className="mb-2 rounded-md bg-muted/50 p-2 text-[11px] leading-5">
            <div className="truncate">
              <span className="font-medium">path</span>: {latest.path}
              {latest.pageId ? ` (id: ${latest.pageId})` : ""}
              {latest.locationKey ? ` [key: ${latest.locationKey}]` : ""}
            </div>
            <div>
              <span className="font-medium">event</span>: {latest.event}
            </div>
            <div className="truncate">
              <span className="font-medium">src</span>: {String(latest.currentSrc ?? "")}
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span>
                <span className="font-medium">ready</span>: {String(latest.readyState ?? "")}
              </span>
              <span>
                <span className="font-medium">net</span>: {String(latest.networkState ?? "")}
              </span>
              <span>
                <span className="font-medium">paused</span>: {String(latest.paused ?? "")}
              </span>
              <span>
                <span className="font-medium">muted</span>: {String(latest.muted ?? "")}
              </span>
              <span>
                <span className="font-medium">t</span>:{" "}
                {typeof latest.currentTime === "number" ? latest.currentTime.toFixed(2) : ""}
              </span>
            </div>
            {(latest.errorCode !== undefined || latest.errorMessage) && (
              <div className="text-red-400">
                <span className="font-medium">error</span>: code={latest.errorCode},{" "}
                {latest.errorMessage || "no message"}
              </div>
            )}
            {latest.boundingRect && (
              <div className="text-muted-foreground">
                <span className="font-medium">rect</span>: {latest.boundingRect.width.toFixed(0)}x
                {latest.boundingRect.height.toFixed(0)} @({latest.boundingRect.left.toFixed(0)},
                {latest.boundingRect.top.toFixed(0)})
              </div>
            )}
            {latest.ancestorStyles && latest.ancestorStyles.length > 0 && (
              <details className="mt-1">
                <summary className="cursor-pointer text-muted-foreground">
                  styles ({latest.ancestorStyles.length} layers)
                </summary>
                <ul className="mt-1 max-h-32 overflow-auto text-[10px]">
                  {latest.ancestorStyles.map((s, i) => (
                    <li key={i} className="border-b border-border/30 py-0.5">
                      <span className="font-medium">{s.tagName}</span>
                      {s.id ? `#${s.id}` : ""}{s.className ? `.${s.className.split(" ")[0]}` : ""} |{" "}
                      d:{s.display} v:{s.visibility} o:{s.opacity} z:{s.zIndex} pos:{s.position}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}

        <div className="max-h-[200px] overflow-auto rounded-md border border-border/60">
          <ul className="divide-y divide-border/60">
            {props.items.slice(0, 15).map((it, idx) => (
              <li key={`${it.ts}-${it.event}-${idx}`} className="p-1.5 text-[11px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{it.event}</span>
                  <span className="text-muted-foreground">{new Date(it.ts).toLocaleTimeString()}</span>
                </div>
                {it.errorCode !== undefined && (
                  <div className="text-red-400">err: {it.errorCode}</div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2 text-[10px] text-muted-foreground">
          enable: <span className="font-mono">?videoDebug=1</span> or localStorage{" "}
          <span className="font-mono">videoDebug=1</span>
        </div>
      </div>
    </div>
  );
}
