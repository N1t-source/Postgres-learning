# PostgreSQL Educational System

## Purpose

This repository teaches PostgreSQL as an operating system for reasoning about data, not as a list of commands.

The curriculum is built for experienced software engineers who need internal models first and syntax second.

## Core Philosophy

- Mechanisms always come before convenience.
- Understanding always comes before speed.
- Every session teaches one concept deeply.
- Every lab proves the concept in a working state.
- Every quiz tests reasoning, not recall.
- Every commit marks a stable learning increment.

## Curriculum Shape

The course progresses through seven layers:

1. Foundations
2. Internals
3. Concurrency
4. Schema Design
5. Operations
6. Performance
7. Production

Each later layer depends on the mental model created by earlier layers.

## Session Anatomy

Every session uses the same teaching scaffold:

1. Learning Objective
2. Prerequisite Concept
3. Pre-Quiz
4. Concept Explanation
5. SVG Concept Maps
6. Lab
7. Expected Files
8. Commit Message
9. Checklist
10. Post Quiz
11. Reflection
12. What Breaks If Removed
13. What Was Learned

The order is fixed so the learner always sees the cause before the consequence and the model before the tool.

## Unlock System

- Session 01 is the only active lesson in phase 1.
- The pre-quiz gate requires 4/5 before the concept section is considered unlocked.
- Later sessions remain locked until Session 01 is reviewed and approved.
- Future layers are planned, but not exposed as active learning pages yet.

## Visual System

- Static HTML only
- Shared `docs/styles.css`
- Dark teaching surface
- White monospace diagrams
- Pink accent color for emphasis and flow
- SVGs must explain mechanism, not decorate the page

## Quiz Policy

- 5-question pre-quiz
- 5-question post-quiz
- Questions must test reasoning
- Answers must show why they are right or wrong
- A locked answer cannot be changed after selection

## Commit Discipline

- One session
- One concept
- One lab
- One commit

The commit is part of the lesson, not an afterthought.

## Phase 1 Scope

- `POSTGRES.md`
- `docker-compose.yml`
- `README.md`
- `docs/index.html`
- `docs/styles.css`
- `docs/prompts/index.html`
- `docs/syllabus/index.html`
- `docs/sessions/session-01/index.html`
- Placeholder pages for session notes, quizzes, and architecture

No later session is authored until Session 01 is approved.
