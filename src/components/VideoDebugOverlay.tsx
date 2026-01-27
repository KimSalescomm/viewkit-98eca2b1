import { VideoDebugSnapshot } from "@/hooks/useVideoDebug";
import { Button } from "@/components/ui/button";

export default function VideoDebugOverlay(props: {
  enabled: boolean;
  items: VideoDebugSnapshot[];
  onClear: () => void;
}) {
  if (!props.enabled) return null;
  const latest = props.items[0];

  return (
    <div className="pointer-events-auto absolute left-3 top-3 z-50 w-[min(520px,calc(100%-24px))] rounded-lg border border-border bg-background/85 p-3 text-foreground shadow-lg backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-sm font-semibold">Video Debug</div>
        <Button variant="secondary" size="sm" onClick={props.onClear}>
          Clear
        </Button>
      </div>

      {latest && (
        <div className="mb-2 rounded-md bg-muted/50 p-2 text-[12px] leading-5">
          <div>
            <span className="font-medium">path</span>: {latest.path}
            {latest.pageId ? ` (id: ${latest.pageId})` : ""}
          </div>
          <div>
            <span className="font-medium">event</span>: {latest.event}
          </div>
          <div className="truncate">
            <span className="font-medium">currentSrc</span>: {String(latest.currentSrc ?? "")}
          </div>
          <div className="flex flex-wrap gap-x-3">
            <span>
              <span className="font-medium">readyState</span>: {String(latest.readyState ?? "")}
            </span>
            <span>
              <span className="font-medium">networkState</span>: {String(latest.networkState ?? "")}
            </span>
            <span>
              <span className="font-medium">paused</span>: {String(latest.paused ?? "")}
            </span>
            <span>
              <span className="font-medium">muted</span>: {String(latest.muted ?? "")}
            </span>
            <span>
              <span className="font-medium">t</span>: {typeof latest.currentTime === "number" ? latest.currentTime.toFixed(2) : ""}
            </span>
          </div>
        </div>
      )}

      <div className="max-h-[260px] overflow-auto rounded-md border border-border/60">
        <ul className="divide-y divide-border/60">
          {props.items.slice(0, 12).map((it) => (
            <li key={`${it.ts}-${it.event}`} className="p-2 text-[12px]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{it.event}</span>
                <span className="text-muted-foreground">{new Date(it.ts).toLocaleTimeString()}</span>
              </div>
              <div className="truncate text-muted-foreground">{String(it.currentSrc ?? "")}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2 text-[11px] text-muted-foreground">
        enable: <span className="font-mono">?videoDebug=1</span> 또는 localStorage <span className="font-mono">videoDebug=1</span>
      </div>
    </div>
  );
}
