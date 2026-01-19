import * as React from "react";

export type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK = "/placeholder.svg";

const SafeImage = React.forwardRef<HTMLImageElement, SafeImageProps>(
  ({ fallbackSrc = DEFAULT_FALLBACK, onError, ...props }, ref) => {
    const hasFailedRef = React.useRef(false);

    return (
      <img
        ref={ref}
        {...props}
        onError={(e) => {
          if (!hasFailedRef.current) {
            hasFailedRef.current = true;
            e.currentTarget.src = fallbackSrc;
          }
          onError?.(e);
        }}
      />
    );
  }
);
SafeImage.displayName = "SafeImage";

export default SafeImage;
