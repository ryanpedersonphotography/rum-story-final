// Basic JavaScript for static site
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu removed for now - desktop only
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar removed - no scroll behavior needed
    
    // Spaces Section - Tab Switching
    const spaceTabs = document.querySelectorAll('.spaces-tab');
    const venuePanels = document.querySelectorAll('.venue-panel');
    
    if (spaceTabs.length > 0) {
        spaceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetVenue = this.getAttribute('data-venue');
                
                // Remove active class from all tabs
                spaceTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all panels by removing active class
                venuePanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                
                // Show the target panel by adding active class
                const targetPanel = document.querySelector(`[data-panel="${targetVenue}"]`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    // Theme toggle placeholder (will be implemented later)
    // For now, theme is set via localStorage and URL params
    
    console.log('Rum River Barn site loaded successfully');
});