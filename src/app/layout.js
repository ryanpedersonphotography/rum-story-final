// 1. TOKENS - Design tokens (OKLCH colors, surfaces, gradients, spacing)
import '@/styles/tokens/theme.css'
import '@/styles/tokens/spacing.css'

// 2. UTILITIES - Section presets and layout utilities (@layer utilities)
import '@/styles/system/section-presets.css'
import '@/styles/system/layout.css'
import '@/styles/utilities/ornate-divider.css'

// 3. GLOBALS - Base styles
import '@/styles/globals.css'

// 4. COMPONENTS - Component-specific styles (@layer components)
import '@/styles/components/navbar.css'

// import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
 
// storyblokInit({
//   accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
//   use: [apiPlugin]
// });
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { playfairDisplay, montserrat, dancingScript } from './fonts';
import Navbar from '@/features/Navbar';
import ThemeSelect from '@/development/ThemeSelect';

const isDev = process.env.NODE_ENV !== 'production';

export const metadata = {
	title: 'Rum River Barn | Wedding Venue',
	description: 'Experience your dream wedding at Rum River Barn, a romantic venue in Minnesota',
};

/*
 * DEV SERVER: http://localhost:6666
 * CLEAN ARCHITECTURE: All components migrated to clean tokenized system
 * - All sections use clean design tokens and components
 * - Responsive design with semantic styling
 */

export default function RootLayout({ children }) {
	return (
		<>
			<html
				lang="en"
				className={`${playfairDisplay.variable} ${montserrat.variable} ${dancingScript.variable}`}
				suppressHydrationWarning
			>
				<head>
					<script
						dangerouslySetInnerHTML={{
							__html: `
(function(){
  try{
		var d = document.documentElement;
		var b = document.body;
		var params = new URLSearchParams(window.location.search);

		// Theme (light/dark) - MUST SET BEFORE FIRST PAINT
		var theme = params.get('theme');
		var allowedTheme = theme === 'dark' || theme === 'light' ? theme : null;
		if(!allowedTheme){
			allowedTheme = localStorage.getItem('rr.theme');
			if(!allowedTheme){
				allowedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			}
		} else {
			localStorage.setItem('rr.theme', allowedTheme);
		}
		
		// CRITICAL: Set concrete background color IMMEDIATELY
		// This runs before any CSS loads, preventing white flash
		var isDark = allowedTheme === 'dark';
		var bgColor = isDark ? 'oklch(0.16 0.03 252)' : 'oklch(0.98 0 255)';
		
		// Apply to HTML element immediately
		d.style.backgroundColor = bgColor;
		d.style.colorScheme = isDark ? 'dark' : 'light';
		d.setAttribute('data-theme', allowedTheme);
		
		// Also set on body if it exists (for extra safety)
		if(b) {
			b.style.backgroundColor = 'transparent';
		}

		// Brand (romantic/modern) - default to romantic for public site
		var brandParam = params.get('brand');
		var allowedBrand = brandParam === 'romantic' || brandParam === 'modern' ? brandParam : null;
		if(!allowedBrand){
			allowedBrand = localStorage.getItem('rr.brand') || 'romantic';
		} else {
			localStorage.setItem('rr.brand', allowedBrand);
		}
		d.setAttribute('data-brand', allowedBrand);
  }catch(e){
		// Failsafe: set reasonable defaults
		var d = document.documentElement;
		d.setAttribute('data-theme', 'light');
		d.setAttribute('data-brand', 'romantic');
		d.style.backgroundColor = 'oklch(0.98 0 255)';
		d.style.colorScheme = 'light';
  }
})();
`}}
					/>
				</head>
				<body>
					<ThemeProvider>
						<div data-clean-root="true">
							<Navbar />
							{children}
						</div>
					{isDev ? <ThemeSelect /> : null}
					</ThemeProvider>
					<script src="//instant.page/5.2.0" type="module" integrity="sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z" async></script>
				</body>
			</html>
		</>
	);
}
