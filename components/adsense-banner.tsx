'use client';

import { useEffect } from 'react';

interface AdSenseBannerProps {
  position: 'top' | 'sidebar' | 'bottom';
}

export function AdSenseBanner({ position }: AdSenseBannerProps) {
  useEffect(() => {
    // 确保在客户端环境中加载Google AdSense脚本
    if (typeof window !== 'undefined' && !window.googletag) {
      // 异步加载Google AdSense脚本
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2563164931075294';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      
      // 初始化googletag对象
      window.googletag = window.googletag || {} as Googletag;
      window.googletag.cmd = window.googletag.cmd || [];
      
      // 定义广告单元
      window.googletag.cmd.push(() => {
        // 根据位置定义不同的广告单元
        const adUnits = {
          top: '/123456789/top_banner', // 替换为您的广告单元ID
          sidebar: '/123456789/sidebar', // 替换为您的广告单元ID
          bottom: '/123456789/bottom_banner' // 替换为您的广告单元ID
        };
        
        // 安全访问googletag
        if (window.googletag) {
          window.googletag.defineSlot(adUnits[position], [[728, 90], [300, 250], [336, 280]], `ad-${position}`).addService(window.googletag.pubads());
          window.googletag.pubads().enableSingleRequest();
          window.googletag.enableServices();
        }
      });
    }
    
    // 加载广告
    if (typeof window !== 'undefined' && window.googletag) {
      window.googletag.cmd.push(() => {
        // 安全访问googletag
        if (window.googletag) {
          window.googletag.display(`ad-${position}`);
        }
      });
    }
  }, [position]);

  const dimensions = {
    top: 'w-full h-24',
    sidebar: 'w-full h-96',
    bottom: 'w-full h-24'
  };

  // 根据位置使用不同的广告单元ID和格式
  const adConfig = {
    top: {
      slot: '1234567890',
      format: 'horizontal',
      className: 'display:block; width:100%; height:auto;'
    },
    sidebar: {
      slot: '2345678901',
      format: 'vertical',
      className: 'display:block; width:100%; height:600px;'
    },
    bottom: {
      slot: '3456789012',
      format: 'horizontal',
      className: 'display:block; width:100%; height:auto;'
    }
  };

  return (
    <div className={`${dimensions[position]} bg-gray-100 rounded-lg overflow-hidden my-6`}>
      {/* 广告容器 */}
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2563164931075294"
        data-ad-slot={adConfig[position].slot}
        data-ad-format={adConfig[position].format}
        data-full-width-responsive="true"
        id={`ad-${position}`}
      ></ins>
      {/* Google AdSense自动广告脚本初始化 */}
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </div>
  );
}

// 声明全局googletag对象
interface Googletag {
  cmd: Array<() => void>;
  defineSlot: (adUnitPath: string, size: number[][] | number[], containerId: string) => any;
  pubads: () => { enableSingleRequest: () => void; addService: (service: any) => void };
  enableServices: () => void;
  display: (containerId: string) => void;
}

declare global {
  interface Window {
    googletag?: Googletag;
  }
}
