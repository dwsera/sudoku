import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Sudoku Master',
  description: 'Terms of service for Sudoku Master. Read our terms and conditions for using the website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Acceptance of Terms</h2>
            <p>
              By accessing and using Sudoku Master, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Use License</h2>
            <p className="mb-2">
              Permission is granted to temporarily access and use Sudoku Master for personal, non-commercial use only. This license does not include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for commercial purposes</li>
              <li>Attempting to reverse engineer any software</li>
              <li>Removing copyright or proprietary notations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Disclaimer</h2>
            <p>
              The materials on Sudoku Master are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Limitations</h2>
            <p>
              In no event shall Sudoku Master or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Accuracy of Materials</h2>
            <p>
              The materials appearing on Sudoku Master could include technical, typographical, or photographic errors. We do not warrant that any materials are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Links</h2>
            <p>
              We have not reviewed all sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Modifications</h2>
            <p>
              We may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
