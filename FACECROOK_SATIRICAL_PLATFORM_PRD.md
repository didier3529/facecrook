# FaceCrook: Satirical Social Platform PRD

## Executive Summary

### What is FaceCrook?
FaceCrook is a satirical social platform where every profile and post is intentionally "dodgy," exposing classic online scam tropes. The platform serves as both entertainment and education, helping users recognize common scam patterns through humor and parody.

## Goals & Non-Goals

### Goals
- **Educate and entertain** through parody of common online scams
- **Preserve classic Facebook-style UI/UX** - only the seeded parody content is changing for now
- **Raise awareness** of online scam tactics in a humorous, memorable way
- **Create a safe environment** to explore scam scenarios without real risk

### Non-Goals
- **NO real personal data** - everything is satire only
- **Monetization/outbound integrations** are out of scope for MVP
- **Real social networking features** - this is purely satirical content
- **User-generated content** in initial MVP (admin-curated only)

## Key Personas

Use these exact names and bios for the satirical characters:

| Display Name | About Snippet | Character Type |
|--------------|---------------|----------------|
| Rajesh "ROI" Jindal | Serial entrepreneur. Inbox open for "fastest returns in Asia". | Investment Scammer |
| Priya "Crypto-Queen" Patel | Blockchain believer. DM for moon-shot deals 💎🚀 | Crypto Scammer |
| Mahesh "Gift-Card" Kumar | Customer-support expert since Windows XP. | Tech Support Scammer |
| Anil "Prince" Varma | Long-lost royalty. Searching for a trustworthy friend. | Prince Scammer |
| Deepak "Refund Guru" Nair | I sense viruses on your PC. Let me "help" remotely. | Refund Scammer |
| Seema "Scholarship" Rao | Education consultant—every student "wins". | Education Scammer |

## Seed Posts (Pre-populated Sample Content)

### Default Metadata
- **Feeling:** Human
- **Location:** A bit dodgy

### Sample Posts

**Rajesh "ROI" Jindal:**
> Hard work? Over-rated. I turned ₹7,000 into ₹7 lakh in 7 days—ask me how before SEATS FILL ⚡⚡

**Priya "Crypto-Queen" Patel:**
> Just minted a new coin: PRYACOIN 🚀 Early investors get 10000% returns GUARANTEED! DM for whitelist access 💎

**Mahesh "Gift-Card" Kumar:**
> Limited-time Microsoft® partnership—pay tech-support fee in any gift card! Your computer security depends on it! 🛡️

**Anil "Prince" Varma:**
> My £43M inheritance is frozen. Need ONE real friend to help transfer funds. Will share 50% as gratitude 👑

**Deepak "Refund Guru" Nair:**
> Your Amazon order shipped twice—click for refund (requires screen-share). Act fast before charge goes through! 📦

**Seema "Scholarship" Rao:**
> Every student deserves Harvard. Comment "STUDY" and I'll personally ensure your admission. 100% success rate! 🎓

## Core MVP Features

### 1. Public Timeline Feed
- **Infinite scroll** functionality
- **Newest-first** sorting
- **Character filtering** options
- **Responsive design** (desktop + mobile)

### 2. User Profile Pages
- **Avatar display** with satirical photos
- **About section** with scammer persona details
- **Posts timeline** showing character's scam attempts
- **"Feeling" & "Location" tags** for added authenticity
- **Verification badges** (ironically for scammers)

### 3. Admin-Only CRUD Interface
- **Character management** (add/edit personas)
- **Post management** (create/edit/delete posts)
- **Content moderation** tools
- **Analytics dashboard** for engagement metrics

### 4. Authentication System
- **Mock authentication** (no real sign-up required)
- **Admin access controls**
- **Session management**

### 5. UI/UX Framework
- **React + Tailwind CSS**
- **Facebook-inspired design**
- **Accessibility compliance** (WCAG AA basics)
- **Mobile-responsive** layout

## Functional Requirements

### Data Models

#### User Model
```typescript
interface User {
  id: string;
  displayName: string;
  username: string;
  avatar: string;
  about: string;
  characterType: ScammerType;
  isVerified: boolean;
  joinDate: Date;
  location: string;
  defaultFeeling: string;
}
```

#### Post Model
```typescript
interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  feeling?: string;
  location?: string;
  hashtags?: string[];
  imageUrl?: string;
  scamCategory: ScamCategory;
}
```

### Core Functionality
- **Feed sorting** by newest-first with pagination
- **Character filtering** by scammer type
- **Search functionality** for posts and characters
- **Responsive interactions** (like, comment, share - all mock)
- **Content sanitization** to prevent XSS

### Testing Requirements
- **Unit tests** for all components
- **Integration tests** for data flow
- **E2E tests** for critical user journeys
- **Performance testing** for feed loading
- **Accessibility testing** with screen readers

### Code Quality
- **ESLint** configuration for consistent code style
- **TypeScript** for type safety
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

## Non-Functional Requirements

### Performance
- **First Contentful Paint < 2s** on broadband connection
- **Time to Interactive < 3s** for initial page load
- **Smooth scrolling** performance on mobile devices
- **Optimized images** with lazy loading

### Security
- **No XSS vulnerabilities** via post content
- **Static seed data only** (no user input in MVP)
- **Secure admin authentication**
- **Content Security Policy** headers

### Scalability
- **Component-based architecture** for easy feature additions
- **Modular CSS** with Tailwind utilities
- **Lazy loading** for performance optimization
- **CDN-ready** asset structure

### Internationalization
- **i18n scaffolding** ready for multiple languages
- **RTL text support** preparation
- **Currency localization** for different regions
- **Cultural sensitivity** considerations

### Accessibility
- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **High contrast** color options
- **Font size** adjustability

## Design & Tone Guidelines

### Visual Design
- **Bright, slightly "cheap"** color palette to parody spam sites
- **Exaggerated emojis** and ALL-CAPS headlines for authenticity
- **Gradients and flashy effects** typical of scam websites
- **Facebook-inspired** layout structure
- **Comic Sans-style** fonts for headers (ironically professional)

### Content Tone
- **Over-the-top enthusiasm** in all messaging
- **Grammatical errors** and typos for authenticity
- **Urgent call-to-action** language
- **Excessive emoji usage** 💰🚀💎⚡
- **Broken English** patterns where appropriate

### Disclaimer Requirements
- **Prominent disclaimer banner** on every page: "All content is fictional satire"
- **Legal disclaimer** in footer about parody nature
- **Educational intent** clearly stated
- **No real contact information** provided

## Risk Assessment & Mitigation

### Legal Risks
- **Defamation concerns:** Use completely fictional personas
- **Cultural sensitivity:** Avoid stereotypes that could cause offense
- **Copyright issues:** Create original satirical content only
- **Local laws:** Research parody protections in target markets

### Technical Risks
- **Performance degradation:** Implement lazy loading and optimization
- **Security vulnerabilities:** Regular security audits and updates
- **Browser compatibility:** Comprehensive cross-browser testing
- **Mobile responsiveness:** Progressive Web App considerations

### Content Risks
- **Misinterpretation:** Clear satirical intent in all communications
- **Actual scam promotion:** Careful content review processes
- **User confusion:** Educational context provided throughout

## Open Questions

1. **Content Expansion:** How to gate user-generated content if added later?
2. **Platform Growth:** Should we allow community contributions with moderation?
3. **Educational Integration:** Partner with cybersecurity organizations?
4. **Metrics Tracking:** What engagement metrics matter for educational impact?
5. **Monetization Path:** How to monetize while maintaining satirical integrity?

## Milestones & Timeline

### Phase 1: Foundation (Weeks 1-2)
- ✅ Set up React + Tailwind project structure
- ✅ Implement basic Facebook-style UI components
- ✅ Create data models and seed data
- ✅ Basic routing and navigation

### Phase 2: Core Features (Weeks 3-4)
- 🎯 Implement persona profiles with new images
- 🎯 Build timeline feed with infinite scroll
- 🎯 Add character filtering functionality
- 🎯 Create admin CRUD interface

### Phase 3: Polish & Testing (Weeks 5-6)
- 📋 Comprehensive testing suite
- 📋 Performance optimization
- 📋 Accessibility compliance
- 📋 Cross-browser compatibility

### Phase 4: Deployment (Week 7)
- 📋 Production deployment setup
- 📋 CI/CD pipeline configuration
- 📋 Monitoring and analytics
- 📋 Documentation completion

## Success Metrics

### Educational Impact
- **User engagement time** on profiles and posts
- **Completion rate** of viewing disclaimer information
- **Social sharing** of educational content
- **Feedback surveys** on scam awareness improvement

### Technical Performance
- **Page load speeds** meeting performance targets
- **Mobile responsiveness** scores
- **Accessibility compliance** ratings
- **Bug reports** and resolution times

### Content Quality
- **Satirical authenticity** maintaining believable scam scenarios
- **Educational value** clear identification of scam tactics
- **Entertainment factor** user enjoyment and engagement
- **Cultural sensitivity** avoiding offensive stereotypes

---

**Document Version:** 1.0  
**Last Updated:** January 2024  
**Document Owner:** FaceCrook Development Team  
**Stakeholders:** Product, Engineering, Design, Legal, Marketing 