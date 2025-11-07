import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";

export const metadata: Metadata = {
  title: "FAQ | Rum River Barn",
  description: "Frequently asked questions about Rum River Barn venue rental and events.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What is included in the venue rental?",
      answer: "Our venue rental includes tables, chairs, basic lighting, parking, and access to our bridal suite. We also provide basic setup and cleanup services."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 12-18 months in advance, especially for peak wedding season (May-October). However, we do have availability for shorter notice events."
    },
    {
      question: "What is your capacity?",
      answer: "Rum River Barn can accommodate up to 150 guests for a seated dinner and up to 200 for a cocktail-style reception."
    },
    {
      question: "Do you allow outside catering?",
      answer: "Yes, we work with a preferred list of caterers, but you're welcome to bring in your own licensed caterer. All caterers must meet our venue requirements."
    },
    {
      question: "Is alcohol allowed?",
      answer: "Yes, alcohol is permitted. You can either use our bar service or bring your own alcohol with proper licensing and insurance."
    },
    {
      question: "What happens if it rains?",
      answer: "Our barn is fully enclosed and climate-controlled, so weather is never an issue. We also have covered outdoor areas for cocktail hours."
    },
    {
      question: "Do you provide decorations?",
      answer: "We provide basic lighting and some rustic decor elements. You're welcome to bring in your own decorations or work with our preferred vendors."
    },
    {
      question: "What are your payment terms?",
      answer: "We require a 50% deposit to secure your date, with the remaining balance due 30 days before your event."
    },
    {
      question: "Can we have our rehearsal dinner here?",
      answer: "Yes! We offer rehearsal dinner packages at a discounted rate for couples who book their wedding reception with us."
    },
    {
      question: "Do you have parking?",
      answer: "Yes, we have ample free parking for up to 80 vehicles on-site, with additional overflow parking available nearby."
    }
  ];

  return (
    <PageTemplate>
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about hosting your event at Rum River Barn
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group"
            >
              <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center hover:text-blue-600 transition-colors">
                {faq.question}
                <span className="ml-4 transform group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            We're here to help! Contact us directly and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white py-3 px-8 rounded hover:bg-blue-700">
              Send us a message
            </button>
            <button className="border border-gray-300 text-gray-700 py-3 px-8 rounded hover:bg-gray-50">
              Schedule a tour
            </button>
          </div>
        </div>
      </main>
    </PageTemplate>
  );
}