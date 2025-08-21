# Terms of Service Content Management System

This module provides comprehensive terms of service functionality for the AWS simulator website, including Brazilian Portuguese legal content, version management, and content validation.

## Features

- **Brazilian Portuguese Legal Content**: Complete terms of service in Portuguese with proper legal structure
- **Version Management**: Semantic versioning with comparison and update utilities
- **Content Validation**: Comprehensive validation and sanitization of terms content
- **User Consent Tracking**: localStorage-based consent management with fallback support
- **Type Safety**: Full TypeScript support with detailed interfaces
- **Testing**: Comprehensive unit and integration tests

## Usage

### Basic Usage

```typescript
import { 
  TermsContentManager, 
  TermsVersionManager, 
  TermsContentValidator,
  TERMS_CONTENT_PT_BR 
} from '@/lib/terms';

// Get current terms content
const currentTerms = TermsContentManager.getCurrentContent();

// Get a specific section
const introSection = TermsContentManager.getSection('introduction');

// Generate content summary
const summary = TermsContentManager.generateSummary();
```

### Version Management

```typescript
// Compare versions
const isNewer = TermsVersionManager.isNewerVersion('1.1.0', '1.0.0'); // true

// Generate next version
const nextVersion = TermsVersionManager.getNextVersion('1.0.0', 'minor'); // '1.1.0'

// Create version object
const version = TermsVersionManager.createVersion(content, ['Added new section']);
```

### Content Validation

```typescript
// Validate content structure
const validation = TermsContentValidator.validateContent(content);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}

// Validate and sanitize content
const result = TermsContentValidator.validateAndSanitize(content);
if (result.isValid) {
  const safeContent = result.sanitizedContent;
}
```

### Content Updates

```typescript
// Update terms content
const updateResult = TermsContentManager.updateContent(newContent);
if (updateResult.success) {
  console.log('Content updated successfully');
} else {
  console.error('Update failed:', updateResult.errors);
}
```

### User Consent Tracking

```typescript
import { 
  ConsentManager,
  ConsentValidator,
  hasValidConsent,
  recordUserAcceptance,
  getCurrentUserAcceptance
} from '@/lib/terms';

// Quick consent check
const hasConsent = await hasValidConsent('1.0.0');

// Record user acceptance
const success = await recordUserAcceptance('1.0.0');

// Get current user acceptance
const acceptance = await getCurrentUserAcceptance();

// Advanced consent management
const config = {
  currentVersion: '1.0.0',
  requireAcceptance: true,
  gracePeriodDays: 30,
  showChangesHighlight: true,
  enableVersionHistory: true,
  maxStoredVersions: 5,
};

const manager = new ConsentManager(config);

// Check if user needs to accept terms
const needsAcceptance = await manager.needsAcceptance();

// Get detailed consent status
const status = await manager.getConsentStatus();

// Record acceptance with additional data
const result = await manager.recordAcceptance('1.0.0', ConsentType.INITIAL, {
  userId: 'user123',
  ipAddress: '192.168.1.1',
  userAgent: navigator.userAgent
});

// Export user data (LGPD compliance)
const exportData = await manager.exportConsentData();
```

## Content Structure

The terms content follows a structured format:

```typescript
interface TermsContent {
  version: string;           // Semantic version (e.g., "1.0.0")
  lastUpdated: Date;         // Last modification date
  metadata: {
    language: string;        // "pt-BR" for Brazilian Portuguese
    jurisdiction: string;    // "Brasil"
    effectiveDate: Date;     // When terms become effective
  };
  sections: TermsSection[];  // Ordered sections
}
```

### Default Sections

The Brazilian Portuguese terms include these sections:

1. **Introdução** - Introduction and overview
2. **Finalidade do Serviço** - Service purpose and educational nature
3. **Uso Permitido** - Permitted uses and restrictions
4. **Atividades Proibidas** - Prohibited activities
5. **Mudanças Futuras e Modelo de Negócio** - Future changes and business model
6. **Limitação de Responsabilidade** - Liability disclaimers
7. **Privacidade e Dados** - Privacy and LGPD compliance
8. **Atualizações dos Termos** - Terms update process
9. **Contato e Suporte** - Contact information
10. **Lei Aplicável** - Governing law and jurisdiction

## Validation Rules

The content validator enforces these rules:

- **Version Format**: Must follow semantic versioning (x.y.z)
- **Required Metadata**: Language and jurisdiction must be specified
- **Section Requirements**: Each section must have ID, title, and content
- **Unique Identifiers**: Section IDs and order numbers must be unique
- **Content Length**: Sections cannot exceed 10,000 characters
- **Date Validation**: Dates cannot be in the future
- **Content Sanitization**: HTML entities are escaped to prevent XSS

## Security Features

- **XSS Prevention**: All content is sanitized before storage
- **Input Validation**: Comprehensive validation of all input data
- **Type Safety**: TypeScript interfaces prevent runtime errors
- **Immutable Operations**: All getter methods return copies, not references

## Consent Tracking Features

### Storage Strategy

The consent tracking system uses a multi-layered storage approach:

1. **Primary Storage**: localStorage for persistent client-side storage
2. **Fallback Storage**: In-memory storage when localStorage is unavailable
3. **Error Handling**: Graceful degradation with user notification
4. **Data Validation**: Comprehensive validation of all consent data

### Consent Data Structure

```typescript
interface UserTermsAcceptance {
  version: string;           // Version accepted (e.g., "1.0.0")
  acceptedAt: Date;          // Timestamp of acceptance
  status: AcceptanceStatus;  // ACCEPTED, DECLINED, PENDING, EXPIRED
  consentType: ConsentType;  // INITIAL, UPDATE, RENEWAL
  userId?: string;           // Optional user identifier
  ipAddress?: string;        // Optional IP address
  userAgent?: string;        // Optional browser information
}
```

### Version Compatibility

The system handles version compatibility with:

- **Exact Version Matching**: Requires exact version match by default
- **Grace Period Support**: Configurable grace period for updates
- **Migration Rules**: Future support for backward compatibility rules
- **Change Highlighting**: Shows changes between versions

## Testing

The module includes comprehensive tests:

- **Content Management**: 36 tests covering all utility functions
- **Consent Tracking**: 48 tests covering localStorage operations, validation, and error handling
- **Integration Tests**: 5 tests covering complete workflows
- **Content Validation**: Tests for the default Brazilian Portuguese content

Run tests with:

```bash
npx vitest run src/lib/terms/__tests__/
```

## Error Handling

The system provides detailed error information:

```typescript
// Error codes for different scenarios
enum TermsErrorCode {
  STORAGE_UNAVAILABLE = 'STORAGE_UNAVAILABLE',
  VERSION_MISMATCH = 'VERSION_MISMATCH',
  INVALID_ACCEPTANCE = 'INVALID_ACCEPTANCE',
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}

// Create structured errors
const error = TermsContentManager.createError(
  TermsErrorCode.VALIDATION_ERROR,
  'Content validation failed',
  { details: validationErrors }
);
```

## Legal Compliance

The Brazilian Portuguese content is designed to comply with:

- **LGPD** (Lei Geral de Proteção de Dados) - Brazilian data protection law
- **Brazilian Consumer Protection Code** - User rights and business obligations
- **Educational Service Regulations** - Proper disclaimers for educational content

## LGPD Compliance Features

The consent tracking system includes specific features for Brazilian LGPD compliance:

- **Minimal Data Collection**: Only collects necessary consent data
- **User Data Export**: `exportConsentData()` method for data portability
- **Data Deletion**: `clearConsent()` method for right to erasure
- **Consent Tracking**: Detailed timestamps and version tracking
- **Transparent Processing**: Clear consent status and history

## Future Enhancements

The system is designed to support:

- Multiple language versions
- Database storage migration
- Content management system integration
- Automated legal compliance checking
- Email notification systems
- Advanced consent analytics
- Cross-device consent synchronization