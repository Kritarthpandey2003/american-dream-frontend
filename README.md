# American Dream: The Interactive Atlas

This repository contains the front-end code for the "American Dream" Digital Deck, completely reimagined as a non-linear, video-first interactive experience (The Atlas).

## Strategic Pivot: The Atlas Overhaul

Based on feedback requiring a highly interactive, non-linear journey, we abandoned the traditional "Slide 1 to 5" presentation format. This project is now structured as an **Immersive Hub and Spoke Model**.

- **The Atlas Hub**: Users land on a dynamic, video-rich dashboard where they are presented with four high-level entry points (Scale, Engine, Avenue, Stage). They drive the journey.
- **Deep Dives**: Clicking a node expands it into a full-screen, highly emotional, and commercially driven deep dive.
- **Generative AI Integration**: All static stock photography has been replaced with bespoke, high-resolution generative AI imagery created specifically for this project to evoke a sense of futuristic luxury and unprecedented scale.

## The "I Need to Be Here" Moment: The Spotlight Interaction

**Interaction Details:**
Navigate to **03. The Avenue**. Upon entering this section, the screen is dark and atmospheric. As the user moves their mouse, a dynamic "spotlight" reveals a bustling, ultra-luxury retail environment beneath the darkness. Only when illuminated do the key commercial metrics (e.g., "$1.5B Projected Sales", "VIP Concierge Network") reveal themselves within the spotlight.

**Why this earns the reaction:**
*“By forcing the prospect to physically 'reveal' the foot traffic and sales potential through their own cursor movement, they stop passively reading a slide and start feeling the exclusivity of the space. The darkness creates an atmosphere of scarcity, while the spotlight reveals vibrant, undeniable commercial energy. It transforms a standard metric into a tangible opportunity they are actively uncovering—creating instant FOMO and the realization that they need to claim their spot before it's gone.”*

## Technical Implementation
- **HTML5 & CSS3**: Utilizes CSS Grid, CSS Variables for mouse tracking, and complex `mask-image: radial-gradient` rules for the Spotlight effect.
- **Vanilla JavaScript**: Handles state routing between the Hub and Deep Dives without heavy frameworks.
- **Responsive**: Fully functional across desktop viewports.

## Running Locally
Simply open `index.html` in any modern web browser to experience the Atlas. No build tools required.
