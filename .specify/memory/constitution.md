# Slidev SQL Training Constitution
<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0
Modified Principles:
- [NEW] I. Content Quality & Clarity
- [NEW] II. Accessibility & Performance
- [NEW] III. Modularity & Reusability

Added Sections:
- Quality Standards
- Development Workflow
- Governance

Templates Status:
- ✅ plan-template.md: Updated with constitution-aligned checklist
- ✅ spec-template.md: User scenarios align with presentation context
- ✅ tasks-template.md: Task categorization supports content development
- ✅ agent-file-template.md: Updated with Slidev-specific guidance
- ✅ checklist-template.md: Ready for presentation-specific checklists

Follow-up TODOs: None - all placeholders filled
-->

## Core Principles

### I. Content Quality & Clarity
Content MUST be pedagogically sound and technically accurate. Every slide deck MUST:
- Have a clear learning objective stated upfront
- Progress logically from fundamental to advanced concepts
- Include practical examples that can be tested/verified
- Use consistent terminology and notation throughout
- Provide references for further learning

**Rationale**: Educational content that confuses learners is worse than no content. Clear, accurate instruction is the primary deliverable.

### II. Accessibility & Performance
Presentations MUST be accessible to diverse learners and perform well on standard devices. Requirements:
- Semantic HTML structure for screen readers
- Sufficient color contrast ratios (WCAG AA minimum)
- Keyboard-navigable slides
- Mobile-responsive layouts
- Fast load times (<3s initial load)
- No animations that trigger motion sensitivity

**Rationale**: Education should be inclusive. Technical barriers prevent learning and exclude potential students.

### III. Modularity & Reusability
Content MUST be organized into independent, reusable modules. Each module MUST:
- Stand alone as a complete lesson on one topic
- Be remixable into different course structures
- Separate content from presentation styling
- Use component-based architecture for interactive elements
- Document dependencies and prerequisites clearly

**Rationale**: Modular content can be maintained, updated, and remixed efficiently. Monolithic presentations become unmaintainable and cannot adapt to different audiences.

## Quality Standards

### Content Verification
- All SQL examples MUST be executable and produce stated results
- Code snippets MUST be syntax-highlighted and copyable
- Database schemas referenced MUST be documented
- Interactive demos MUST include error handling and user feedback

### Visual Design
- Typography: Minimum 24pt for body text, 36pt for headings
- Consistent spacing using Slidev's layout system
- Maximum 7 bullet points per slide (cognitive load limit)
- Code blocks: Maximum 20 lines per slide for readability

### Documentation Requirements
- Each slide deck MUST include a README with:
  - Learning objectives and target audience
  - Prerequisites and required setup
  - Estimated completion time
  - License and attribution for external content
- Presenter notes for complex topics
- Exercise solutions in separate files

## Development Workflow

### Content Development Process
1. **Outline**: Define learning objectives and topic structure
2. **Draft**: Create slide content with examples
3. **Review**: Verify technical accuracy and pedagogical flow
4. **Test**: Present to test audience or peer review
5. **Iterate**: Refine based on feedback
6. **Publish**: Deploy and document

### Version Control
- Semantic versioning: MAJOR.MINOR.PATCH
  - MAJOR: Content restructure, prerequisite changes
  - MINOR: New topics/sections added
  - PATCH: Corrections, clarifications, updated examples
- Git commits MUST reference specific topics/slides changed
- Each deck version MUST be tagged for historical reference

### Testing Strategy
Testing is MINIMAL but focused on critical aspects:
- **SQL Validation**: All queries MUST execute successfully
- **Link Checking**: External references MUST resolve
- **Accessibility Audit**: Run automated tools (axe, Lighthouse)
- Manual presentation walkthroughs before publication

## Governance

### Amendment Process
1. Propose change with rationale in constitution file comments
2. Discuss impact on existing content and workflows
3. Update constitution with version bump
4. Propagate changes to affected templates and documentation
5. Document migration path for existing content

### Compliance Review
- All new slide decks MUST validate against these principles
- Content reviews verify adherence to accessibility and quality standards
- Template updates MUST maintain backward compatibility or provide migration guide

### Conflict Resolution
When principles conflict:
1. **Content Quality** takes precedence over aesthetics
2. **Accessibility** takes precedence over advanced features
3. **Clarity** takes precedence over brevity

**Version**: 1.0.0 | **Ratified**: 2025-11-24 | **Last Amended**: 2025-11-24
