'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/language-provider';
import { translations } from '@/lib/translations';
import { AdSenseBanner } from '@/components/adsense-banner';

interface TutorialContentProps {
  title: Record<string, string> | string;
  description: Record<string, string> | string;
  content: Record<string, string>;
}

export default function TutorialContent({ title, description, content }: TutorialContentProps) {
  const { currentLanguage } = useLanguage();
  // 确保 currentLanguage 有效，如果无效则使用 'en'
  const validLanguage = ['en', 'zh', 'ja', 'es', 'fr', 'de'].includes(currentLanguage) ? currentLanguage : 'en';
  const t = translations[validLanguage as 'en' | 'zh' | 'ja' | 'es' | 'fr' | 'de'];
  
  // 获取当前语言的标题，如果不存在则使用英语或原始字符串
  const currentTitle = typeof title === 'object' ? (title[validLanguage] || title.en || '') : title;
  // 获取当前语言的描述，如果不存在则使用英语或原始字符串
  const currentDescription = typeof description === 'object' ? (description[validLanguage] || description.en || '') : description;
  // 获取当前语言的内容，如果不存在则使用英语
  const currentContent = content[validLanguage] || content.en;
  
  const sections = currentContent
    .split('\n## ')
    .filter(section => section.trim())
    .map(section => {
      const lines = section.split('\n');
      const heading = lines[0].replace('# ', '');
      const content = lines.slice(1).join('\n');
      return { heading, content };
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {process.env.NODE_ENV === 'production' && (
          <div className="mb-8">
            <AdSenseBanner position="top" />
          </div>
        )}
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          ← {t.tutorials.backToTutorials}
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {currentTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8 border-l-4 border-blue-500 pl-4">
            {currentDescription}
          </p>

          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.heading}
                </h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t.tutorials.readyToPractice}
          </h3>
          <p className="text-gray-700 mb-4">
            {t.tutorials.applyWhatYouLearned}
          </p>
            <Link
              href="/play"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t.home.playNow}
            </Link>
          </div>
        </article>
        
        {process.env.NODE_ENV === 'production' && (
          <div className="mt-12">
            <AdSenseBanner position="bottom" />
          </div>
        )}
      </div>
    </div>
  );
}