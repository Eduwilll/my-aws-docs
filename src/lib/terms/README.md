# Terms of Service Content Management System

This module provides comprehensive terms of service functionality for the AWS simulator website, including Brazilian Portuguese legal content, version management, and content validation.

## Features

- **Brazilian Portuguese Legal Content**: Complete terms of service in Portuguese with proper legal structure
- **Version Management**: Semantic versioning with comparison and update utilities
- **Content Validation**: Comprehensive validation and sanitization of terms content
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

## Testing

The module includes comprehensive tests:

- **Unit Tests**: 36 tests covering all utility functions
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

## Future Enhancements

The system is designed to support:

- Multiple language versions
- Database storage migration
- Content management system integration
- Automated legal compliance checking
- User acceptance tracking
- Email notification systems