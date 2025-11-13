import React from 'react';
import Navbar from "@/features/Navbar";
import Footer from "@/features/Footer";
import GlassToolbar from "@/development/GlassToolbar";

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