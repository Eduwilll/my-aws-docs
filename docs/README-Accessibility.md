# Terms of Service Components - Accessibility & Responsive Design

This document outlines the accessibility and responsive design features implemented in the Terms of Service components.

## Overview

The Terms of Service system has been enhanced with comprehensive accessibility features and responsive design to ensure WCAG 2.1 AA compliance and optimal user experience across all devices and user preferences.

## Accessibility Features

### WCAG 2.1 AA Compliance

#### Keyboard Navigation
- **Full keyboard support**: All interactive elements are accessible via keyboard
- **Tab order**: Logical tab sequence through all focusable elements
- **Focus management**: Proper focus trapping in modals
- **Keyboard shortcuts**: 
  - `Tab` / `Shift+Tab`: Navigate between elements
  - `Enter` / `Space`: Activate buttons and checkboxes
  - `Escape`: Close modals and notifications

#### Screen Reader Support
- **Semantic HTML**: Proper use of headings, landmarks, and roles
- **ARIA labels**: Descriptive labels for all interactive elements
- **Live regions**: Dynamic content changes announced to screen readers
- **Alternative text**: All icons have appropriate `aria-hidden` or `alt` attributes
- **Descriptive text**: Context provided for complex interactions

#### Visual Accessibility
- **High contrast mode**: Enhanced borders and colors when `prefers-contrast: high`
- **Focus indicators**: Visible focus rings with 3px outline and 2px offset
- **Color contrast**: All text meets WCAG AA contrast requirements (4.5:1 minimum)
- **Text scaling**: Supports up to 200% zoom without horizontal scrolling

#### Motor Accessibility
- **Touch targets**: Minimum 44px × 44px touch targets on mobile (48px on coarse pointer devices)
- **Reduced motion**: Respects `prefers-reduced-motion: reduce` preference
- **Hover alternatives**: All hover interactions have keyboard/focus equivalents

### Component-Specific Accessibility

#### TermsAcceptanceModal
- **Modal focus trap**: Focus contained within modal when open
- **Initial focus**: Title receives focus when modal opens
- **Required field indication**: Checkbox marked as `aria-required="true"`
- **Error announcements**: Errors announced via `aria-live="assertive"`
- **Loading states**: Loading announced to screen readers

#### TermsVersionManager
- **Notification announcements**: Grace period notifications use `aria-live="polite"`
- **Button labeling**: All buttons have descriptive `aria-label` attributes
- **Status updates**: Version changes announced to screen readers

#### TermsNavigationLinks
- **Navigation landmarks**: Proper `nav` elements with `aria-label`
- **Link descriptions**: Each link has descriptive `aria-label`
- **Separator handling**: Decorative separators marked `aria-hidden="true"`

## Responsive Design

### Mobile-First Approach
- **Base styles**: Designed for mobile devices first
- **Progressive enhancement**: Features added for larger screens
- **Flexible layouts**: CSS Grid and Flexbox for adaptive layouts

### Breakpoints
```css
/* Mobile: 0px - 639px (base styles) */
/* Small: 640px+ (sm:) */
/* Medium: 768px+ (md:) */
/* Large: 1024px+ (lg:) */
/* Extra Large: 1280px+ (xl:) */
```

### Component Responsiveness

#### TermsAcceptanceModal
- **Mobile**: Full-width with minimal margins (`calc(100vw - 1rem)`)
- **Tablet**: Reduced width with more margins (`calc(100vw - 2rem)`)
- **Desktop**: Fixed max-width with auto margins (768px - 1024px)
- **Height**: Adaptive height with scroll areas (35vh - 50vh)

#### TermsVersionManager
- **Notification positioning**: 
  - Mobile: Full-width bottom notification
  - Desktop: Fixed-width right-aligned notification
- **Button layout**: Stacked on mobile, inline on desktop

#### TermsNavigationLinks
- **Footer variant**: Vertical stack on mobile, horizontal on desktop
- **Separator visibility**: Hidden on mobile, visible on desktop
- **Icon sizing**: Smaller icons on mobile (12px), larger on desktop (16px)

### Typography Scaling
- **Mobile**: 14px base font size
- **Tablet**: 16px base font size  
- **Desktop**: 18px base font size
- **Line height**: Increases with screen size (1.5 → 1.6 → 1.7)

### Touch Target Optimization
- **Minimum size**: 44px × 44px (WCAG AA requirement)
- **Coarse pointer**: 48px × 48px for touch devices
- **Spacing**: Adequate spacing between touch targets
- **Visual feedback**: Clear hover and active states

## Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Feature Detection
- `prefers-contrast: high`
- `prefers-reduced-motion: reduce`
- `prefers-color-scheme: dark`
- `pointer: coarse`
- `hover: hover`

## Testing

### Automated Testing
- **Jest-axe**: Automated accessibility testing
- **Vitest**: Component functionality testing
- **Responsive tests**: Cross-device compatibility testing

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Activate buttons with Enter and Space
- [ ] Close modals with Escape
- [ ] Focus visible and logical order

#### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with TalkBack (Android)

#### Visual Testing
- [ ] High contrast mode
- [ ] 200% zoom level
- [ ] Dark mode
- [ ] Color blindness simulation

#### Device Testing
- [ ] Mobile phones (320px - 414px)
- [ ] Tablets (768px - 1024px)
- [ ] Desktops (1280px+)
- [ ] Orientation changes

## Implementation Guidelines

### CSS Classes
Use the provided CSS classes for consistent accessibility:

```css
/* Focus management */
.terms-focusable:focus-visible
.terms-keyboard-nav:focus-within

/* Touch targets */
.terms-touch-target

/* Responsive containers */
.terms-container
.terms-modal-responsive
.terms-notification-responsive

/* Screen reader content */
.terms-sr-only
.terms-skip-link
```

### ARIA Patterns
Follow established ARIA patterns:

```jsx
// Modal dialog
<div role="dialog" aria-labelledby="title" aria-describedby="description">
  <h2 id="title">Modal Title</h2>
  <p id="description">Modal description</p>
</div>

// Navigation
<nav aria-label="Descriptive label" role="navigation">
  <a href="/terms" aria-label="Access Terms of Service">Terms</a>
</nav>

// Live regions
<div aria-live="polite" aria-atomic="true">
  Status updates
</div>

<div aria-live="assertive" role="alert">
  Error messages
</div>
```

### Responsive Patterns
Use mobile-first responsive design:

```jsx
// Mobile-first classes
className="w-full sm:w-auto lg:w-1/2"
className="text-sm sm:text-base lg:text-lg"
className="p-2 sm:p-4 lg:p-6"
```

## Performance Considerations

### CSS Optimization
- **Critical CSS**: Inline critical accessibility styles
- **Progressive loading**: Load responsive styles progressively
- **Reduced motion**: Disable animations when requested

### JavaScript Optimization
- **Event delegation**: Efficient event handling
- **Debounced resize**: Optimized resize event handling
- **Lazy loading**: Load accessibility features on demand

## Maintenance

### Regular Testing
- **Monthly**: Automated accessibility tests
- **Quarterly**: Manual screen reader testing
- **Bi-annually**: Full device compatibility testing

### Updates
- **WCAG updates**: Monitor for new accessibility guidelines
- **Browser support**: Update browser compatibility matrix
- **Device testing**: Test on new device form factors

## Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Free, Windows)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows)
- [VoiceOver](https://www.apple.com/accessibility/vision/) (macOS/iOS)
- [TalkBack](https://support.google.com/accessibility/android/answer/6283677) (Android)

## Support

For accessibility issues or questions, please:
1. Check this documentation
2. Run automated tests
3. Test with screen readers
4. File an issue with detailed reproduction steps

Remember: Accessibility is not a feature to be added later—it should be considered from the beginning of the design and development process.