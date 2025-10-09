'use client';

import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, Target, Lightbulb, Trophy, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTranslation } from '@/lib/translations';

// 由于使用了'use client'，我们不能导出静态metadata
// 但Next.js仍然会自动处理页面标题，我们已经在组件中设置了翻译后的标题

// 教程数据将使用翻译函数动态获取标题和描述

const colorClasses = {
  blue: 'from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400',
  green: 'from-green-50 to-green-100 border-green-200 hover:border-green-400',
  yellow: 'from-yellow-50 to-yellow-100 border-yellow-200 hover:border-yellow-400',
  red: 'from-red-50 to-red-100 border-red-200 hover:border-red-400',
  purple: 'from-purple-50 to-purple-100 border-purple-200 hover:border-purple-400'
};

const iconColorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  red: 'text-red-600',
  purple: 'text-purple-600'
};

export default function TutorialsPage() {
  // 初始使用英文，然后在客户端水合后更新
  const [t, setT] = useState(getTranslation('en'));
  
  useEffect(() => {
    // 在客户端水合后获取当前语言设置
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('language') || 'en';
      setT(getTranslation(lang));
    }
  }, []);
  
  // 根据翻译生成教程列表
  const tutorials = [
    {
      slug: 'beginners-guide',
      title: t.tutorials.beginnersGuide,
      description: t.tutorials.beginnersGuideDesc,
      icon: BookOpen,
      color: 'blue'
    },
    {
      slug: 'advanced-strategies',
      title: t.tutorials.advancedStrategies,
      description: t.tutorials.advancedStrategiesDesc,
      icon: Target,
      color: 'green'
    },
    {
      slug: 'common-mistakes',
      title: t.tutorials.commonMistakes,
      description: t.tutorials.commonMistakesDesc,
      icon: Lightbulb,
      color: 'yellow'
    },
    {
      slug: 'speed-solving',
      title: t.tutorials.speedSolving,
      description: t.tutorials.speedSolvingDesc,
      icon: Trophy,
      color: 'red'
    },
    {
      slug: 'mental-strategies',
      title: t.tutorials.mentalStrategies,
      description: t.tutorials.mentalStrategiesDesc,
      icon: Brain,
      color: 'purple'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6 text-gray-900">
          {t.tutorials.title}
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {t.tutorials.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {tutorials.map((tutorial) => {
            const Icon = tutorial.icon;
            return (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className={`bg-gradient-to-br ${colorClasses[tutorial.color as keyof typeof colorClasses]} border-2 rounded-lg p-6 transition-all hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-white rounded-lg ${iconColorClasses[tutorial.color as keyof typeof iconColorClasses]}`}>
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-700">{tutorial.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{t.tutorials.whyLearn}</h2>
          <div className="space-y-4 text-gray-700">
            <p>{t.tutorials.whyLearnDesc1}</p>
            <p>{t.tutorials.whyLearnDesc2}</p>
            <p>{t.tutorials.whyLearnDesc3}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
