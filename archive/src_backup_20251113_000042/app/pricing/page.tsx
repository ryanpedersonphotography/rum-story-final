import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";

export const metadata: Metadata = {
  title: "Pricing | Rum River Barn",
  description: "Simple, transparent pricing for your perfect venue.",
};

export default function PricingPage() {
  return (
    <PageTemplate>
      <main className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Pricing</h1>
      <p className="text-lg mb-8">Developer-owned page (not in Storyblok).</p>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Basic Package */}
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-2xl font-semibold mb-4">Essential</h3>
          <p className="text-3xl font-bold text-gray-800 mb-6">$2,500</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Venue rental (8 hours)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Tables and chairs
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Basic lighting
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* Premium Package */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-500 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Premium</h3>
          <p className="text-3xl font-bold text-gray-800 mb-6">$4,500</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Everything in Essential
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Premium lighting package
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Bar service setup
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Event coordinator
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* Luxury Package */}
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h3 className="text-2xl font-semibold mb-4">Luxury</h3>
          <p className="text-3xl font-bold text-gray-800 mb-6">$6,500</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Everything in Premium
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Full catering service
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Professional photography
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Floral arrangements
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Need something custom? We&apos;d love to work with you.</p>
        <button className="bg-gray-800 text-white py-3 px-8 rounded hover:bg-gray-700">
          Contact Us for Custom Quote
        </button>
      </div>
      </main>
    </PageTemplate>
  );
}