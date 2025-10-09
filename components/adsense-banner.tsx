'use client';

interface AdSenseBannerProps {
  position: 'top' | 'sidebar' | 'bottom';
}

export function AdSenseBanner({ position }: AdSenseBannerProps) {
  const dimensions = {
    top: 'w-full h-24',
    sidebar: 'w-full h-96',
    bottom: 'w-full h-24'
  };

  return (
    <div className={`${dimensions[position]} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center`}>
      <div className="text-center text-gray-500">
        <p className="text-sm font-medium">Advertisement</p>
        <p className="text-xs mt-1">AdSense {position} banner</p>
      </div>
    </div>
  );
}
