import React from 'react';
import Navbar from "@/components/clean/Navbar";
import Footer from "@/components/clean/Footer";
import GlassToolbar from "@/components/dev/GlassToolbar";

interface PageTemplateProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTemplate({ children, className = "" }: PageTemplateProps) {
  return (
    <div data-clean-root="true" className={className}>
      <Navbar />
      <GlassToolbar />
      
      {children}
      
      <Footer />
    </div>
  );
}