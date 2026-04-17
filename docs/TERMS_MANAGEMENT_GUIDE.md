# Terms of Service Management Guide

## Overview

This guide provides comprehensive instructions for managing Terms of Service content, versions, and user acceptance tracking in the AWS Simulator application.

## Architecture Overview

The Terms of Service system consists of:

1. **Content Management** - Structured legal content with versioning
2. **User Consent Tracking** - localStorage-based acceptance tracking
3. **Version Management** - Automatic version checking and user notifications
4. **UI Components** - Modal dialogs and navigation links
5. **Integration Points** - ExamSimulator and site-wide integration

## Content Management

### Current Content Structure

The terms content is managed in `src/lib/terms/content.ts`:

```typescript
export const TERMS_CONTENT_PT_BR: TermsContent = {
  version: "1.0.0",
  lastUpdated: new Date("2025-01-08"),
  sections: [
    {
      id: "purpose",
      title: "Finalidade do Serviço",
      content: "...",
      order: 1
    },
    // Additional sections...
  ],
  metadata: {
    language: "pt-BR",
    jurisdiction: "Brasil",
    effectiveDate: new Date("2025-01-08")
  }
};
```

### Updating Terms Content

#### 1. Content Updates

To update terms content:

1. **Edit the content** in `src/lib/terms/content.ts`
2. **Update the version number** following semantic versioning
3. **Update the lastUpdated date**
4. **Test the changes** using the test suite

Example:
```typescript
// Before update
version: "1.0.0",
lastUpdated: new Date("2025-01-08"),

// After update
version: "1.1.0",
lastUpdated: new Date("2025-02-15"),
```

#### 2. Version Increment Guidelines

- **Patch (1.0.1)**: Minor corrections, typos, clarifications
- **Minor (1.1.0)**: New sections, significant content additions
- **Major (2.0.0)**: Fundamental changes requiring new user acceptance

#### 3. Section Management

Adding a new section:
```typescript
{
  id: "new-section",
  title: "Nova Seção",
  content: "Conteúdo da nova seção...",
  order: 6, // Next available order
  lastModified: new Date("2025-02-15")
}
```

Modifying existing sections:
```typescript
{
  id: "existing-section",
  title: "Seção Atualizada",
  content: "Conteúdo atualizado...",
  order: 2,
  lastModified: new Date("2025-02-15") // Update this date
}
```

## Version Management

### Automatic Version Checking

The system automatically checks for version updates when:
- User visits the simulator page
- User attempts to start an exam
- Page loads with TermsVersionManager component

### Grace Period Configuration

Configure grace periods in the terms config:

```typescript
const termsConfig: TermsConfig = {
  currentVersion: "1.1.0",
  requireAcceptance: true,
  showChangesHighlight: true,
  gracePeriodDays: 7, // Users have 7 days to accept updates
  enableVersionHistory: true,
  maxStoredVersions: 5
};
```

### Version Update Scenarios

#### Scenario 1: New User
- Shows terms acceptance modal immediately
- Requires acceptance before accessing simulator
- Stores acceptance with timestamp

#### Scenario 2: Existing User - Minor Update
- Shows grace period notification
- Allows continued use during grace period
- Prompts for acceptance after grace period expires

#### Scenario 3: Existing User - Major Update
- Shows terms acceptance modal immediately
- Blocks access until acceptance
- Highlights changes from previous version

## User Consent Tracking

### Storage Structure

User consent is stored in localStorage:

```typescript
interface StoredTermsData {
  acceptances: UserTermsAcceptance[];
  currentAcceptance?: UserTermsAcceptance;
  lastChecked: Date;
  userPreferences: {
    showReminders: boolean;
    emailUpdates: boolean;
  };
}
```

### Consent Validation

The system validates consent by:
1. Checking if user has accepted current version
2. Verifying acceptance is within grace period (if applicable)
3. Ensuring acceptance data integrity

### Data Migration

When updating versions, the system:
1. Preserves previous acceptance records
2. Marks current acceptance as outdated
3. Prompts for new acceptance
4. Maintains audit trail

## Testing and Validation

### Running Tests

```bash
# Run all terms-related tests
pnpm test src/lib/terms/

# Run component tests
pnpm test src/components/__tests__/Terms

# Run integration tests
pnpm test --run src/components/__tests__/TermsIntegration.test.tsx
```

### Manual Testing Checklist

#### New User Flow
- [ ] Terms modal appears on first visit
- [ ] Cannot access simulator without acceptance
- [ ] Acceptance is properly stored
- [ ] Navigation links work correctly

#### Version Update Flow
- [ ] Grace period notification appears
- [ ] Can dismiss notification during grace period
- [ ] Modal appears after grace period expires
- [ ] Changes are highlighted for updates

#### Error Handling
- [ ] Graceful degradation when localStorage unavailable
- [ ] Retry mechanism for failed acceptance
- [ ] User-friendly error messages
- [ ] Recovery suggestions provided

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] High contrast mode support
- [ ] Mobile responsiveness

## Deployment Process

### Pre-deployment Checklist

1. **Content Review**
   - [ ] Legal content accuracy verified
   - [ ] Version number updated correctly
   - [ ] Dates are accurate
   - [ ] All sections are complete

2. **Technical Validation**
   - [ ] Tests pass
   - [ ] Build succeeds
   - [ ] No console errors
   - [ ] Performance acceptable

3. **User Experience**
   - [ ] Modal displays correctly
   - [ ] Navigation works
   - [ ] Responsive design verified
   - [ ] Accessibility compliance

### Deployment Steps

1. **Update Content**
   ```bash
   # Edit content in src/lib/terms/content.ts
   # Update version and dates
   ```

2. **Run Tests**
   ```bash
   pnpm test --run
   ```

3. **Build Application**
   ```bash
   pnpm build
   ```

4. **Deploy**
   ```bash
   # Deploy to your hosting platform
   # Vercel, Netlify, etc.
   ```

### Post-deployment Validation

1. **Functional Testing**
   - Visit simulator page
   - Verify terms modal behavior
   - Test acceptance flow
   - Check navigation links

2. **User Communication**
   - Notify users of significant changes
   - Provide summary of updates
   - Offer support for questions

## Monitoring and Analytics

### Key Metrics to Track

1. **Acceptance Rates**
   - New user acceptance rate
   - Update acceptance rate
   - Time to acceptance

2. **User Behavior**
   - Modal dismissal rate
   - Grace period usage
   - Error occurrence rate

3. **Technical Performance**
   - Page load times
   - Modal render times
   - Storage operation success rate

### Error Monitoring

Monitor for:
- localStorage quota exceeded errors
- Network failures during acceptance
- Version mismatch issues
- Component rendering errors

## Troubleshooting

### Common Issues

#### Terms Modal Not Appearing
1. Check browser localStorage availability
2. Verify version configuration
3. Check console for JavaScript errors
4. Validate component integration

#### Acceptance Not Persisting
1. Check localStorage quota
2. Verify storage permissions
3. Check for data corruption
4. Review error logs

#### Version Mismatch
1. Clear localStorage data
2. Verify version configuration
3. Check for caching issues
4. Validate content structure

### Debug Tools

#### Console Commands
```javascript
// Check current consent status
localStorage.getItem('terms-consent-data')

// Clear all terms data
localStorage.removeItem('terms-consent-data')

// Check version manager state
window.termsVersionManager?.getCurrentVersion()
```

#### Development Mode
```typescript
// Enable debug logging
const termsConfig: TermsConfig = {
  // ... other config
  debugMode: true, // Add this for development
};
```

## Legal Considerations

### Content Requirements

Ensure terms include:
- [ ] Service purpose and scope
- [ ] User rights and obligations
- [ ] Liability limitations
- [ ] Privacy policy references
- [ ] Contact information
- [ ] Governing law and jurisdiction

### Compliance Checklist

- [ ] LGPD compliance (Brazilian users)
- [ ] Clear and understandable language
- [ ] Proper version control
- [ ] User consent documentation
- [ ] Data retention policies

### Change Management

For significant legal changes:
1. Consult legal counsel
2. Plan user communication strategy
3. Consider transition periods
4. Document change rationale
5. Update privacy policies if needed

## Support and Maintenance

### Regular Maintenance Tasks

#### Monthly
- [ ] Review acceptance rates
- [ ] Check error logs
- [ ] Validate storage usage
- [ ] Test modal functionality

#### Quarterly
- [ ] Legal content review
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] User feedback analysis

#### Annually
- [ ] Comprehensive legal review
- [ ] Major version updates
- [ ] Security assessment
- [ ] Compliance verification

### Contact Information

For technical issues:
- Development Team: [team@example.com]
- Repository: [GitHub URL]

For legal questions:
- Legal Team: [legal@example.com]
- External Counsel: [counsel@example.com]

## Appendix

### File Structure
```
src/
├── lib/
│   ├── terms/
│   │   ├── content.ts          # Terms content and management
│   │   ├── consent-tracking.ts # User consent tracking
│   │   └── index.ts           # Module exports
│   └── types/
│       └── terms.ts           # TypeScript definitions
├── components/
│   ├── TermsAcceptanceModal.tsx    # Acceptance modal
│   ├── TermsVersionManager.tsx     # Version management
│   └── TermsNavigationLinks.tsx    # Navigation links
├── pages/
│   └── terms.astro            # Terms page
└── styles/
    └── terms-accessibility.css # Accessibility styles
```

### Configuration Examples

#### Basic Configuration
```typescript
const basicConfig: TermsConfig = {
  currentVersion: "1.0.0",
  requireAcceptance: true,
  showChangesHighlight: false,
  gracePeriodDays: 0
};
```

#### Advanced Configuration
```typescript
const advancedConfig: TermsConfig = {
  currentVersion: "2.1.0",
  requireAcceptance: true,
  showChangesHighlight: true,
  gracePeriodDays: 14,
  enableVersionHistory: true,
  maxStoredVersions: 10,
  retryAttempts: 3,
  retryDelay: 1000
};
```

### Version History Template

When updating versions, document changes:

```markdown
## Version 1.1.0 (2025-02-15)

### Added
- New section on data processing
- Enhanced privacy protections

### Changed
- Updated liability limitations
- Clarified service scope

### Removed
- Deprecated beta features section

### Migration Notes
- Users will see grace period notification
- Highlights new data processing section
```