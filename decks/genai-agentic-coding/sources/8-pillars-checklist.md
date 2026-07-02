#

## The 8 Pillars of Verification Infrastructure

A practical assessment framework for measuring how ready your codebase is for AI coding agents. Based on the principle that **the limit to agent autonomy isn't the model, it's your verification infrastructure**.

---

## How to Use This Checklist

1. **Score each item** by checking the box if your codebase meets the criteria
2. **Add up points** for each pillar (max 10 points per pillar)
3. **Calculate total score** (max 80 points)
4. **Determine readiness level** using the scale below

### Scoring Key

Each item has a point value in parentheses:
- **(2 pts)** — Critical foundation for agent reliability
- **(1.5 pts)** — Important for consistent agent performance
- **(1 pt)** — Standard good practice
- **(0.5 pts)** — Advanced optimization

---

## Readiness Levels

| Level | Score | Percentage | What It Means |
|-------|-------|------------|---------------|
| **Basic** | 0-32 | <40% | Not agent-ready. Agents will produce unreliable output requiring heavy human oversight. Focus on foundational gaps. |
| **Ready** | 33-56 | 40-70% | Agent-capable with supervision. Agents can handle defined tasks but need human verification on complex work. |
| **Advanced** | 57-80 | >70% | High autonomy potential. Agents can work independently on most tasks with minimal oversight. |

---

## Pillar 1: Testing

**The Foundation of Verification**

*Core Question: Does it work?*

| | Item | Points |
|---|------|--------|
| [ ] | Test coverage exceeds 70% on critical code paths | (2) |
| [ ] | Full test suite completes in under 10 minutes | (2) |
| [ ] | Flaky test rate is below 1% (tests are deterministic) | (1.5) |
| [ ] | Tests are isolated with no shared state or order dependency | (1) |
| [ ] | Tests run automatically on every PR/commit | (1) |
| [ ] | Integration tests exist for external services and APIs | (0.5) |
| [ ] | E2E tests cover critical user journeys | (0.5) |
| [ ] | Test failure messages are clear and actionable | (0.5) |
| [ ] | Contract/snapshot tests exist for API boundaries | (0.5) |
| [ ] | Tests can run in parallel without conflicts | (0.5) |

**Pillar 1 Score: ___ / 10**

---

## Pillar 2: Documentation

**The Context Layer**

*Core Question: What should it do?*

| | Item | Points |
|---|------|--------|
| [ ] | README enables project setup in under 5 minutes | (2) |
| [ ] | API documentation is auto-generated and current | (1.5) |
| [ ] | Architecture docs exist (system diagrams, component relationships) | (1.5) |
| [ ] | Code comments explain "why" not just "what" | (1) |
| [ ] | New developers can be productive within 1 day | (1) |
| [ ] | Integration points with external systems are documented | (1) |
| [ ] | Known limitations and edge cases are documented | (0.5) |
| [ ] | CHANGELOG is maintained for releases | (0.5) |
| [ ] | Documentation lives alongside code (not in separate wikis) | (0.5) |
| [ ] | Runbooks exist for common operational tasks | (0.5) |

**Pillar 2 Score: ___ / 10**

---

## Pillar 3: Code Quality

**The Standards Enforcer**

*Core Question: Does it meet standards?*

| | Item | Points |
|---|------|--------|
| [ ] | Linter runs on every commit with zero-tolerance policy | (2) |
| [ ] | Type coverage exceeds 80% (TypeScript, type hints, etc.) | (2) |
| [ ] | Code formatter is enforced automatically | (1.5) |
| [ ] | Static analysis catches bugs before runtime | (1) |
| [ ] | Quality check failures block PR merges | (1) |
| [ ] | Complexity metrics are tracked with defined limits | (0.5) |
| [ ] | Dead code detection is enabled | (0.5) |
| [ ] | Import/dependency rules are enforced | (0.5) |
| [ ] | Pre-commit hooks prevent bad commits locally | (0.5) |
| [ ] | Quality metrics are visible in dashboards | (0.5) |

**Pillar 3 Score: ___ / 10**

---

## Pillar 4: Build Systems

**The Reproducibility Layer**

*Core Question: Can it compile reliably?*

| | Item | Points |
|---|------|--------|
| [ ] | Builds are reproducible (same commit = same output) | (2) |
| [ ] | Build completes in under 5 minutes for typical changes | (2) |
| [ ] | Build failures produce clear, actionable error messages | (1.5) |
| [ ] | Dependencies are pinned/locked (no floating versions) | (1) |
| [ ] | Build caching significantly reduces rebuild time | (1) |
| [ ] | CI/CD pipeline is defined as code (version controlled) | (0.5) |
| [ ] | Builds work identically in local and CI environments | (0.5) |
| [ ] | Dependency updates are automated (Dependabot, Renovate) | (0.5) |
| [ ] | Build artifacts are versioned and traceable to commits | (0.5) |
| [ ] | Incremental builds only rebuild affected components | (0.5) |

**Pillar 4 Score: ___ / 10**

---

## Pillar 5: Dev Environment

**The Experimentation Space**

*Core Question: Can it test safely?*

| | Item | Points |
|---|------|--------|
| [ ] | New environment spins up in under 15 minutes | (2) |
| [ ] | Preview/staging environments match production behavior | (2) |
| [ ] | Environments are isolated (no shared state between branches) | (1.5) |
| [ ] | Database seeding/fixtures are available for testing | (1) |
| [ ] | Environment configuration is version controlled | (1) |
| [ ] | Hot reload enables fast feedback during development | (0.5) |
| [ ] | Local setup is containerized/reproducible (Docker, devcontainers) | (0.5) |
| [ ] | Feature flags enable safe testing in production-like envs | (0.5) |
| [ ] | Environment provisioning is automated (Infrastructure as Code) | (0.5) |
| [ ] | Sanitized production data is available for realistic testing | (0.5) |

**Pillar 5 Score: ___ / 10**

---

## Pillar 6: Observability

**The Feedback Signal**

*Core Question: What happened?*

| | Item | Points |
|---|------|--------|
| [ ] | Logs are structured (JSON) and searchable | (2) |
| [ ] | Key metrics have defined baselines and alerts | (2) |
| [ ] | Distributed tracing connects requests across services | (1.5) |
| [ ] | Error tracking captures stack traces with context | (1) |
| [ ] | Performance baselines exist for critical paths | (1) |
| [ ] | Logs include correlation IDs for request tracing | (0.5) |
| [ ] | Dashboards visualize key service health indicators | (0.5) |
| [ ] | Log retention meets debugging needs (7+ days) | (0.5) |
| [ ] | Profiling data is available for performance analysis | (0.5) |
| [ ] | Observability data is accessible via APIs | (0.5) |

**Pillar 6 Score: ___ / 10**

---

## Pillar 7: Security

**The Safety Gate**

*Core Question: Is it safe?*

| | Item | Points |
|---|------|--------|
| [ ] | SAST (static security analysis) runs on every PR | (2) |
| [ ] | Secrets are managed via vault/environment (never in code) | (2) |
| [ ] | Dependency vulnerability scanning is automated | (1.5) |
| [ ] | Security scan failures block deployment | (1) |
| [ ] | Access controls follow least-privilege principle | (1) |
| [ ] | DAST (dynamic security testing) runs in staging | (0.5) |
| [ ] | Container/image scanning checks for vulnerabilities | (0.5) |
| [ ] | Security policies are documented and version controlled | (0.5) |
| [ ] | Audit logs exist for sensitive operations | (0.5) |
| [ ] | Incident response playbook is documented | (0.5) |

**Pillar 7 Score: ___ / 10**

---

## Pillar 8: Standards

**The Consistency Framework**

*Core Question: Is it consistent?*

| | Item | Points |
|---|------|--------|
| [ ] | Coding conventions are documented and discoverable | (2) |
| [ ] | Standards are enforced by tooling (not just code review) | (2) |
| [ ] | Architecture Decision Records (ADRs) capture key decisions | (1.5) |
| [ ] | Naming conventions are consistent across the codebase | (1) |
| [ ] | Pattern library/examples exist for common tasks | (1) |
| [ ] | File/folder structure follows documented conventions | (0.5) |
| [ ] | Git commit message format is standardized | (0.5) |
| [ ] | PR template guides reviewers on what to check | (0.5) |
| [ ] | Error handling patterns are documented | (0.5) |
| [ ] | Deprecated patterns are marked with migration guidance | (0.5) |

**Pillar 8 Score: ___ / 10**

---

## Score Summary

| Pillar | Score |
|--------|-------|
| 1. Testing | ___ / 10 |
| 2. Documentation | ___ / 10 |
| 3. Code Quality | ___ / 10 |
| 4. Build Systems | ___ / 10 |
| 5. Dev Environment | ___ / 10 |
| 6. Observability | ___ / 10 |
| 7. Security | ___ / 10 |
| 8. Standards | ___ / 10 |
| **Total** | **___ / 80** |

### Your Readiness Level

- [ ] **Basic** (0-32 points): Focus on foundational gaps before deploying agents
- [ ] **Ready** (33-56 points): Agents can assist with supervision
- [ ] **Advanced** (57-80 points): High autonomy potential

---

## Priority Order for Improvement

If you're starting from scratch, focus on these pillars first (highest leverage):

1. **Testing** — Without tests, agents can't verify correctness
2. **Build Systems** — Without reliable builds, agents waste cycles on phantom errors
3. **Code Quality** — Without quality gates, agents generate inconsistent code
4. **Documentation** — Without docs, agents make wrong assumptions

---

## Key Insight

> "Software 1.0 easily automates what you can specify. Software 2.0 easily automates what you can verify."
> — Andrej Karpathy

The items in this checklist represent your **verification infrastructure**. Each gap is a ceiling on agent autonomy. Humans compensate for missing infrastructure with intuition and workarounds. Agents can't.

---

## Resources

- [Verifiability](https://karpathy.bearblog.dev/verifiability/) — Andrej Karpathy
- [Asymmetry of Verification](https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law) — Jason Wei
- [OpenSpec](https://github.com/openspec/openspec) — Spec-driven development toolkit

---

*Version 1.0*
Author: Guillaume Moigneu for [Upsun](https://upsun.com)
Apache V2 License
Based on "The 8 Pillars of Verification Infrastructure" framework
