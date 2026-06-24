import { cn } from "@/lib/utils";
import { Plane, Globe, MapPin, Luggage, Camera, Compass, Train, Car, Ship, Mountain } from "lucide-react";

const TEAL = "#0D9488";
const TEAL_DARK = "#0B7C73";
const TEAL_LIGHT = "#14b8a6";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function PlaneSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div className={cn("animate-bounce", sizeClasses[size])}>
          <Plane className="w-full h-full text-[#0D9488] animate-pulse" />
        </div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-300 rounded-full animate-ping" />
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function GlobeSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className={cn("animate-spin", sizeClasses[size])}>
        <Globe className="w-full h-full text-[#0D9488]" />
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function LuggageSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className={cn("animate-bounce", sizeClasses[size])}>
        <Luggage className="w-full h-full text-[#0D9488]" />
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function MapPinSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className={cn("animate-pulse", sizeClasses[size])}>
        <MapPin className="w-full h-full text-[#0D9488] animate-bounce" />
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function CompassSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className={cn("animate-spin", sizeClasses[size])}>
        <Compass className="w-full h-full text-[#0D9488]" />
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function TravelJourneySpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="flex items-center gap-2">
        <div className={cn("animate-bounce", sizeClasses[size])} style={{ animationDelay: "0ms" }}>
          <Plane className="w-full h-full text-[#0D9488]" />
        </div>
        <div className="w-8 h-0.5 bg-[rgba(13,148,136,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] to-[#14b8a6] animate-pulse" />
        </div>
        <div className={cn("animate-bounce", sizeClasses[size])} style={{ animationDelay: "200ms" }}>
          <MapPin className="w-full h-full text-[#0D9488]" />
        </div>
        <div className="w-8 h-0.5 bg-[rgba(13,148,136,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488] to-[#0B7C73] animate-pulse" />
        </div>
        <div className={cn("animate-bounce", sizeClasses[size])} style={{ animationDelay: "400ms" }}>
          <Camera className="w-full h-full text-[#0D9488]" />
        </div>
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function TrainSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div className={cn("animate-bounce", sizeClasses[size])}>
          <Train className="w-full h-full text-[#0D9488]" />
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-[#0D9488]/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1 h-1 bg-[#0D9488]/50 rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
            <div className="w-1 h-1 bg-[#0D9488]/50 rounded-full animate-bounce" style={{ animationDelay: "400ms" }} />
          </div>
        </div>
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function CarSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div className={cn("animate-bounce", sizeClasses[size])}>
          <Car className="w-full h-full text-[#0D9488]" />
        </div>
        <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[rgba(13,148,136,0.15)] rounded-full">
          <div className="h-full bg-[#0D9488] rounded-full animate-pulse" style={{ width: "60%" }} />
        </div>
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function ShipSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div className={cn("animate-bounce", sizeClasses[size])}>
          <Ship className="w-full h-full text-[#0D9488]" />
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[rgba(13,148,136,0.15)] rounded-full">
          <div className="h-full bg-[#0D9488] rounded-full animate-pulse" style={{ width: "80%" }} />
        </div>
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function MountainSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div className={cn("animate-pulse", sizeClasses[size])}>
          <Mountain className="w-full h-full text-[#0D9488]" />
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
          <div className="w-2 h-2 bg-[#14b8a6] rounded-full animate-ping" />
        </div>
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
    </div>
  );
}

export function TravelLoadingSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = { sm: "w-12 h-12", md: "w-16 h-16", lg: "w-24 h-24" };
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full animate-spin" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="rgba(13,148,136,0.15)" strokeWidth="2" fill="none" />
          <circle
            cx="50" cy="50" r="45"
            stroke={TEAL}
            strokeWidth="2"
            fill="none"
            strokeDasharray="280"
            strokeDashoffset="280"
            style={{ animation: "teal-dash 2s linear infinite" }}
          />
          <g transform="translate(50, 50)">
            <path
              d="M-8 -2 L-4 -6 L0 -2 L4 -6 L8 -2 L4 2 L0 6 L-4 2 Z"
              fill={TEAL}
            />
          </g>
        </svg>
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute top-2 right-2 w-3 h-3 text-[#0D9488]"><Globe className="w-full h-full" /></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 text-[#0D9488]"><Luggage className="w-full h-full" /></div>
          <div className="absolute top-2 left-2 w-3 h-3 text-[#0D9488]"><MapPin className="w-full h-full" /></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 text-[#0D9488]"><Camera className="w-full h-full" /></div>
        </div>
      </div>
      {text && <p className="text-sm text-[#0D3D39]/60 animate-pulse">{text}</p>}
      <style>{`
        @keyframes teal-dash {
          0% { stroke-dashoffset: 280; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -280; }
        }
      `}</style>
    </div>
  );
}

export function TravelLoading({ className, size = "md", text, variant }: LoadingSpinnerProps & { variant?: string }) {
  const spinners = [
    PlaneSpinner, GlobeSpinner, LuggageSpinner, MapPinSpinner, CompassSpinner,
    TravelJourneySpinner, TrainSpinner, CarSpinner, ShipSpinner, MountainSpinner, TravelLoadingSpinner,
  ];

  let SpinnerComponent;
  if (variant) {
    const variantMap: Record<string, typeof PlaneSpinner> = {
      plane: PlaneSpinner, globe: GlobeSpinner, luggage: LuggageSpinner,
      mappin: MapPinSpinner, compass: CompassSpinner, journey: TravelJourneySpinner,
      train: TrainSpinner, car: CarSpinner, ship: ShipSpinner,
      mountain: MountainSpinner, travel: TravelLoadingSpinner,
    };
    SpinnerComponent = variantMap[variant] || TravelLoadingSpinner;
  } else {
    SpinnerComponent = spinners[Math.floor(Math.random() * spinners.length)];
  }

  return <SpinnerComponent className={className} size={size} text={text} />;
}
