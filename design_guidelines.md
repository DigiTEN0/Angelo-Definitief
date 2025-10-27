# Design Guidelines: Angelo Randazzo Inc. - Montreal Luxury Real Estate

## Design Approach
**Reference-Based Luxury Real Estate Design** inspired by Sotheby's International Realty's sophistication, combined with the functional excellence of Zillow, and infused with Montreal's European elegance. This is a conversion-focused design that builds trust through premium aesthetics while maintaining crystal-clear pathways to contact.

## Core Design Principles
1. **Luxe Minimalism**: Clean, spacious layouts that let properties shine
2. **Trust Through Sophistication**: Professional polish that signals expertise
3. **Conversion Pathways**: Every page guides users toward contact
4. **Montreal Character**: Subtle European elegance reflecting the market

## Typography System

**Primary Font**: Playfair Display (Google Fonts)
- H1 (Hero Headlines): 3.5rem (desktop) / 2.25rem (mobile), font-weight 700, letter-spacing -0.02em
- H2 (Section Headers): 2.5rem (desktop) / 1.875rem (mobile), font-weight 600
- H3 (Property Titles): 1.75rem, font-weight 600
- H4 (Subsections): 1.25rem, font-weight 600

**Secondary Font**: Inter (Google Fonts)
- Body Text: 1rem, font-weight 400, line-height 1.7
- Property Details: 0.875rem, font-weight 500
- CTAs: 1rem, font-weight 600, letter-spacing 0.025em (uppercase)
- Labels/Meta: 0.75rem, font-weight 500, letter-spacing 0.05em (uppercase)

## Layout System

**Spacing Scale**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 to p-8
- Section vertical spacing: py-20 (desktop) / py-12 (mobile)
- Card gaps: gap-6 to gap-8
- Element spacing: Use 4 and 6 for tight relationships, 8 and 12 for breathing room

**Container Widths**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-6
- Property grids: max-w-7xl
- Content sections: max-w-4xl
- Forms: max-w-2xl

## Hero Section

**Layout**: Full-viewport (min-h-screen) with large hero image
- Overlay: Subtle dark gradient (black opacity 40-50%) for text legibility
- Content: Centered, max-w-4xl
- Headline emphasizing Angelo's expertise and Montreal market knowledge
- Subheadline highlighting unique value proposition
- Primary CTA: "View Available Properties" with blurred background
- Secondary CTA: "Schedule Consultation" 
- Trust indicators below CTAs: Years of experience, properties sold, client satisfaction

**Buttons on Images**: All CTAs over hero image have backdrop-blur-md with semi-transparent background - no hover states on the blur effect itself

## Property Showcase Strategy

**Featured Properties Section** (Homepage):
- Grid layout: 3 columns (desktop) / 2 columns (tablet) / 1 column (mobile)
- Large property images (16:9 aspect ratio minimum 400px height)
- Hover effect: Subtle scale transform and overlay with "View Details" text
- Property cards include: Primary image, price (prominent), address, bed/bath/sqft icons, status badge
- "View All Properties" CTA at section bottom

**Property Listings Page**:
- Sidebar filters (desktop) / top filters (mobile): Price range, bedrooms, bathrooms, status
- Masonry-style grid showcasing properties with varied image sizes for visual interest
- Pagination or infinite scroll
- Quick-view modal option for property details

**Individual Property Pages**:
- Full-width image gallery at top (carousel with thumbnails)
- Two-column layout: Details on left (60%), contact form on right (40%)
- Key details displayed with icons: Price, beds, baths, sqft, lot size, year built
- Rich description section with proper typography hierarchy
- Features list with checkmarks
- Location map integration
- Similar properties section at bottom
- Sticky contact form that follows scroll on desktop

## Contact & Conversion Elements

**Strategic CTA Placement**:
- Hero section: Primary conversion point
- After featured properties: "See More Listings"
- Property pages: Sticky contact sidebar
- Footer: Newsletter signup + direct contact
- Floating contact button (mobile): Bottom-right, always visible

**Contact Form Design**:
- Clean, professional styling with generous spacing
- Fields: Name, Email, Phone, Message, Property Interest (dropdown)
- Clear privacy statement
- High-contrast submit button
- Confirmation message with next steps

## About Section (Homepage)

**Layout**: Two-column (desktop)
- Left: Professional headshot of Angelo (400x500px minimum)
- Right: Compelling bio highlighting expertise, market knowledge, client-first approach
- Key stats displayed with large numbers: Years in business, properties sold, average sale price
- "Get in Touch" CTA below

## Component Library

**Property Cards**:
- Contained with subtle shadow
- Image fills top portion (60% of card height)
- Status badge: Positioned top-left on image
- Content section: Price (largest), address, features (icons), CTA link

**Navigation**:
- Sticky header with transparent background on scroll
- Logo left, navigation center, contact CTA right
- Mobile: Hamburger menu with full-screen overlay
- Links: Properties, About, Contact, Client Login (subtle)

**Filters (Property Listings)**:
- Clean dropdown selectors or range sliders
- Clear selected filters display with remove option
- "Reset Filters" option always visible
- Results count displayed

**Footer**:
- Three columns: Contact info, Quick links, Newsletter signup
- Social media icons
- License/credentials display
- Copyright and legal links

## Dashboard Design (Admin)

**Modern SaaS Dashboard Aesthetic**:
- Sidebar navigation (collapsed on mobile)
- Clean data tables with search and sorting
- Property management: Grid view with quick-edit capabilities
- Lead management: Table view with filters by date, property interest, status
- Form entries: Chronological list with unread indicators
- Add/Edit property: Multi-step form with image upload previews
- Analytics dashboard: Key metrics cards at top

## Animation & Interaction

**Subtle, Professional Animations**:
- Page load: Fade-in for content sections (stagger by 100ms)
- Property cards: Smooth hover scale (1.02) with 300ms transition
- Navigation: Smooth scroll to anchored sections
- Image galleries: Elegant slide transitions
- Form submission: Loading state with success confirmation
- No distracting parallax or excessive motion

## Images Strategy

**Required Images**:
1. **Hero Image**: Stunning Montreal skyline or iconic neighborhood (Old Montreal, Plateau) - full-width, high-quality
2. **About Section**: Professional headshot of Angelo
3. **Property Images**: Placeholder for 8-10 featured properties with interior/exterior shots
4. **Background Textures**: Subtle luxury patterns for section dividers (optional, very subtle)

**Image Treatment**:
- Professional photography style
- Consistent editing/color grading
- Optimized for web performance
- Lazy loading for property images

## Responsive Behavior

**Breakpoints**:
- Mobile: Base (< 768px) - Single column, stacked navigation
- Tablet: md (768px-1024px) - Two-column grids, simplified layouts
- Desktop: lg (1024px+) - Full multi-column layouts, sidebar forms

**Mobile-Specific Optimizations**:
- Larger touch targets (minimum 44px)
- Simplified navigation with bottom contact bar
- Optimized image sizes
- Accordion-style property details
- Tap-to-call phone numbers
- Tap-to-email functionality

This design creates a premium, trustworthy presence that converts visitors into qualified leads while showcasing Angelo's properties in the best possible light.