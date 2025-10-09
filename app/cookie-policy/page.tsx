import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Sudoku Master',
  description: 'Cookie policy for Sudoku Master. Learn about the cookies we use and how to manage them.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Use Cookies</h2>
            <p className="mb-2">We use cookies for several purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To remember your preferences and settings</li>
              <li>To understand how you use our website</li>
              <li>To improve website performance</li>
              <li>To deliver personalized advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Types of Cookies We Use</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Performance Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Functionality Cookies</h3>
            <p>
              These cookies allow the website to remember choices you make and provide enhanced features and personalization.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Advertising Cookies</h3>
            <p>
              These cookies are used to deliver advertisements that are relevant to you. They may be set by our advertising partners through our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Third-Party Cookies</h2>
            <p>
              We may use third-party services such as Google AdSense, which may set cookies on your device. These third parties have their own privacy policies, and we have no control over their cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Managing Cookies</h2>
            <p className="mb-2">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Browser Settings: Most browsers allow you to refuse or accept cookies</li>
              <li>Browser Add-ons: Some browsers offer cookie management add-ons</li>
              <li>Ad Settings: You can opt out of personalized advertising</li>
            </ul>
            <p className="mt-3">
              Please note that blocking all cookies may impact your experience on our website, and some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Local Storage</h2>
            <p>
              In addition to cookies, we use browser local storage to save your game progress and preferences. This data remains on your device and can be cleared through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. Please check this page periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p>
              If you have questions about our use of cookies or this Cookie Policy, please contact us through our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
