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
				style={{ backgroundColor: 'oklch(0.98 0 255)' }}
			>
				<head>
					<script
						dangerouslySetInnerHTML={{
							__html: `
(function(){
  try{
		var d = document.documentElement;
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
		d.setAttribute('data-theme', allowedTheme);
		
		// Set color-scheme for native UI elements (scrollbars, etc)
		d.style.colorScheme = allowedTheme === 'dark' ? 'dark' : 'light';
		
		// Set immediate background to match theme
		d.style.backgroundColor = allowedTheme === 'dark' ? 'oklch(0.16 0.03 252)' : 'oklch(0.98 0 255)';

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
		document.documentElement.setAttribute('data-theme', 'light');
		document.documentElement.setAttribute('data-brand', 'romantic');
		document.documentElement.style.backgroundColor = 'oklch(0.98 0 255)';
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
