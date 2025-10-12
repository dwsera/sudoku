'use client';

import Link from 'next/link';
// import { AdSenseBanner } from '@/components/adsense-banner';
import { Brain, Trophy, Clock, Zap } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function HomePageClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* <div className="mb-8">
          {process.env.NODE_ENV === 'production' && <AdSenseBanner position="top" />}
        </div> */}

        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            {t.home.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.home.subtitle}
          </p>
          <Link
            href="/play"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            {t.home.playNow}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{t.home.brainTraining}</h3>
            <p className="text-gray-600">{t.home.brainTrainingDesc}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{t.home.dailyChallenges}</h3>
            <p className="text-gray-600">{t.home.dailyChallengesDesc}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{t.home.trackProgress}</h3>
            <p className="text-gray-600">{t.home.trackProgressDesc}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{t.home.multipleLevels}</h3>
            <p className="text-gray-600">{t.home.multipleLevelsDesc}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.home.whatIsSudoku}</h2>
          <p className="text-lg text-gray-700 mb-4">
            {t.home.sudokuDesc1}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            {t.home.sudokuDesc2}
          </p>
          <div className="mt-6">
            <Link href="/tutorials" className="text-blue-600 font-semibold hover:text-blue-700">
              {t.home.learnHowToPlay}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-green-800 mb-3">{t.home.easy}</h3>
            <p className="text-gray-700 mb-4">{t.home.easyDesc}</p>
            <Link href="/play" className="text-green-600 font-semibold hover:text-green-700">
              {t.home.startEasy}
            </Link>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-yellow-800 mb-3">{t.home.medium}</h3>
            <p className="text-gray-700 mb-4">{t.home.mediumDesc}</p>
            <Link href="/play" className="text-yellow-600 font-semibold hover:text-yellow-700">
              {t.home.tryMedium}
            </Link>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-red-800 mb-3">{t.home.hard}</h3>
            <p className="text-gray-700 mb-4">{t.home.hardDesc}</p>
            <Link href="/play" className="text-red-600 font-semibold hover:text-red-700">
              {t.home.goHard}
            </Link>
          </div>
        </div>

        {/* <div className="mb-8">
          {process.env.NODE_ENV === 'production' && <AdSenseBanner position="bottom" />}
        </div> */}
      </div>
    </div>
  );
}
