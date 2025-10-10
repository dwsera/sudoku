import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tutorials } from '../../../lib/tutorials-data';

type TutorialDataType = {
  title: Record<string, string> | string;
  description: Record<string, string> | string;
  keywords: string;
  content: Record<string, string>;
};

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params;
  const tutorial = tutorials[slug];

  if (!tutorial) {
    return {
      title: 'Tutorial Not Found',
      description: 'The requested tutorial could not be found.',
    };
  }

  return {
    title: tutorial.title,
    description: tutorial.description,
    keywords: tutorial.keywords,
  };
}

import TutorialContent from './TutorialContent';

export default function TutorialPage({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params;
  const tutorial = tutorials[slug];

  if (!tutorial) {
    notFound();
  }

  return (
    <TutorialContent 
      title={tutorial.title}
      description={tutorial.description}
      content={tutorial.content}
    />
  );
}

// 为静态生成提供所有可能的教程slug
export function generateStaticParams() {
  // 只返回tutorials对象中实际存在的slug
  return Object.keys(tutorials).map((slug) => ({
    slug,
  }));
}
