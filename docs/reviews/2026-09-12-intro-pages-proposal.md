---
created: 2026-09-12
status: implemented
scope: Home, Practice, Start
source_commit: 2da367e6dbf9db72063fbd0011b3a9cf85a9ce2a
di_revision: e9d35c8d952dbb40e4781297e93a6df259ee4071
---

# Home, Practice, and Start — editorial proposal

Implementation note, 2026-09-12: Andrew approved this proposal with “do it.” The proposal below records the review before implementation; its pending-action statements describe that earlier state. The approved copy is now applied to `src/index.njk`, `src/practice.njk`, and `src/start.njk`.

Home needs to explain the practice, Practice needs to describe the work and learning involved, and Start needs to give a usable first sequence. The current pages repeat the ownership claim while leaving some of the actions unexplained. This proposal changes their authored copy and descriptions; the source pages remain unchanged pending Andrew's ruling.

## Reader and scope

The assumed reader is new to Ho and has arrived with an interest in building software with AI. Home also serves someone considering working with Andrew. Start introduces project planning; a complete installation tutorial for someone unfamiliar with coding tools is a separate requirement that the current page does not meet.

The reviewed sources are `src/index.njk`, `src/practice.njk`, and `src/start.njk`. Supporting checks used the local Ho System documents on framing, ho structure, understanding, progression, continuity, the skills overview, and the draft guides. The current nine-class DI repository and both kill lists governed the language pass; the installed eight-class skill was not treated as current authority.

The page structures, diagram, navigation destinations, and contact route are retained. The proposed Practice list adds a link to the existing Tiered Understanding page because its new explanatory paragraph needs that reference. Existing glossary interactions remain available where terms are retained or introduced.

## DI findings

### Level 1 — Act

1. Home, description and main claim: “genuine understanding” [SS]
   - Diagnosis: the adjective certifies a quality without explaining how understanding is developed or assessed.
   - Edit: REWRITE the claim around directing, evaluating, and learning from the work. The exact replacement is in the Home proposal below.

2. Home, Walk caption: “as they really are” [SS]
   - Diagnosis: the phrase repeats the assurance that these are project records; the linked records supply the evidence.
   - Edit: DELETE the phrase and identify the contents: “Follow Sharibako's project plans, working sessions, and recorded changes.”

3. Practice, opening: “You genuinely learn while actually building” [SS]
   - Diagnosis: the intensifiers grade the promised result. The page should describe the activities through which someone learns.
   - Edit: REWRITE as the session and understanding paragraphs below.

4. Practice, opening: “The human keeps architectural authority; the AI handles implementation; the human understands enough to evaluate what gets built.” [MS]
   - Diagnosis: the preceding sentence already says the reader directs, evaluates, and understands the work. The restatement adds no explanation of how.
   - Edit: REPLACE the repeated claim with the concrete understanding paragraph below.

5. Practice, Start link: “Ready to run it on your own project?” [TC]
   - Diagnosis: deleting the question leaves the same usable invitation in the link.
   - Edit: DELETE the question; keep “Start here →”.

6. Practice, Writing introduction: “The curated list is one door over.” [MT]
   - Diagnosis: the immediately following Writing link already provides the route; the metaphor adds no destination information.
   - Edit: DELETE the sentence and describe what the essays concern.

7. Start, opening: “You are about to adopt a discipline, not install a tool.” [TC]
   - Diagnosis: the sentence instructs the reader how to frame the experience before supplying an action. The next paragraph can begin with the project.
   - Edit: REPLACE with “Start with a project you want to build.”

8. Start, third step: “so the last document is easy to write” [SS]
   - Diagnosis: the promised ease is unsubstantiated and adds nothing to the order of documents.
   - Edit: DELETE the assurance; name what the System Design, README, and Ho Overview each establish.

9. Start, final caption: “That is the whole on-ramp. When you want the named parts in depth, they are one door over” [MS|MT]
   - Diagnosis: the first sentence declares completion and the second narrates the links that follow.
   - Edit: DELETE the caption. The Skills link appears in step 1, and the Framework links accompany the documents and further-reading material.

### Level 3 — Defensible

10. Home, first audience card: “What is this?” [TC]
    - Doing work: it labels a reader's navigation choice rather than staging a question for the author to answer in the next sentence. Keep this and the second card's “I want to try it on my project.”

11. Home, ho definition: “bounded, verified, recorded step” [SS]
    - Doing work: scope, checking, and traceability are distinct properties described in the ho-structure source. The triple is not condemned merely for having three terms. Keep it; also retain Andrew's explicitly approved “verified, recorded, reviewable steps” in the engagement card.

Tally: L1 9; L2 0; L3 2. Class occurrences: PE 0; PU 0; TC 3; BH 0; SS 5; MS 2; EI 0; MT 2. Class counts include defensible findings; they are not a quality score.

Nursery sighting, without severity: the repeated claim “architectural authority and genuine understanding” appears on Home and Start, with the same claim restated on Practice. This matches the document-level candidate concerning the same claim repeated at different levels without a distinct job for each occurrence. Repetition needed for independently understandable landing pages is legitimate; the proposed replacements give each occurrence additional information.

## Reader and factual findings outside DI

| Source location | Finding | Proposed resolution |
|---|---|---|
| Home 11–15; Practice 10–13 | The code-generation/ownership contrast and the “third path” framing establish opposition before explaining what Ho asks someone to do. The access claim is broader than the local evidence supports. | Define the practice and describe planning, implementation, review, and learning. Preserve human architectural responsibility without the universal claim about access. |
| Home 27–37 | “The problem, the claim,” “named parts,” and “run against my code” describe internal categories or suggest a code-auditing service. | Give each card a concrete destination description and align the third card with the approved collaboration/coaching offer. |
| Home 42–44 | “running at Harvard” repeats the ambiguity corrected on Engagements. | Locate the camera on the roof of Memorial Hall at Harvard. |
| Practice 20 | “why the method holds up” presents the linked foundations essay as proof of effectiveness. It contains research background and an author-reported pilot, including unresolved generalizability questions. | Label it “research background and the Kanyō pilot.” This review does not validate the paper's citations or conclusions. |
| Practice 10–13; Start 10–12 | Understanding is promised without defining its scope. | Explain that the reader chooses how deeply to understand different components, records limits, and uses the existing Tiered Understanding reference. |
| Start 11–12 | “Walk the chain once and you have the shape of every project that follows” implies that one pass settles future work. | Remove the universal promise. State the immediate destination: a planned working session. |
| Start 24–26 | “Install the skills” links to the catalog and source rather than a verified installation procedure. The local skills overview distinguishes conversational authoring from filesystem-dependent setup, so “Claude-Code-native collaborators, one per conversation” is also too broad. | Offer the documented Markdown-template path and identify skills as the guided option. Do not supply installation commands until target environments and packaging are checked. |
| Start 28–34 | “Run Kamae 1” and “opinions” assume knowledge of the document system. | Name the seed and its contents, then identify the outputs of stages 2–4. |
| Start 36–40 | The diagram includes State Memory but the actions omit its creation and maintenance. A drafted ho is also described as if the work were already verified and recorded. | Separate preparing a ho from carrying it out and reviewing it; explicitly create and update State Memory. |
| Start 43–46 | Guides are described vaguely as “taking shape.” | Label the existing linked guides as drafts. The inspected source files declare draft status. |

## Exact proposed copy — Home

Description:

> The Ho System: a practice for building software with AI through planned sessions, verification, and reflection, while retaining responsibility for the system's design.

Title: The Ho System

Opening paragraph:

> The Ho System is a practice for building software with AI. You direct the system's design and evaluate what gets built. The work is organized so you develop that judgment as the project progresses.

Second paragraph:

> A ho is one bounded, verified, recorded step. You plan the work, carry it out with AI, and review the result. Project documents preserve the decisions and instructions that later sessions need.

Keep “Take the walk →” linking to `/walk/`. Replace its caption with:

> Follow Sharibako's project plans, working sessions, and recorded changes.

Keep Sharibako linked to `https://github.com/sageframe-no-kaji/sharibako`. Replace the card copy as follows:

| Card heading | Body | Links |
|---|---|---|
| “What is this?” | How Ho organizes work with AI and develops the practitioner's judgment. | The Practice → `/practice/` |
| “I want to try it on my project.” | Begin with a project idea, then use the documents and skills to plan the build. | Start here → `/start/`; The Framework → `/framework/`; The Skills → `/skills/` |
| “I want help with a project or team.” | Work with Andrew on your project or through guided team sessions. The work arrives as verified, recorded, reviewable steps. | Engagements → `/engagements/` |

Replace the bio with:

> Andrew Marcus created the Ho System and built Kanyō, a computer-vision system that monitors the peregrine falcon camera on the roof of Memorial Hall at Harvard.

Keep the Kanyō account link at `https://sageframe.substack.com/p/ho-process-methodology`. Retain the existing seal and its alt text, “The 歩 hanko—the Ho System seal.”

## Exact proposed copy — Practice

Description:

> How the Ho System combines project work, verification, and reflection to develop judgment when building software with AI.

Title: The Practice

> Before a building session, define the change you intend to make and how you will check it. Work with AI to carry out the plan, then review whether the result meets the requirements. Record what changed, what you learned, and what remains unresolved.
>
> For each component, decide how much you need to understand to work with it. You might use a library through its documented interface while learning enough about your own code to change and explain its behavior. The session record identifies what you understand and where you still need help.

Keep “Start here →” linking to `/start/`, without the introductory question.

Heading: Read the practice

| Link text | Description | Destination |
|---|---|---|
| The Ho System | the methodology and its structure | `/framework/the-ho-system/` |
| Ho Foundations | research background and the Kanyō pilot | `/framework/ho-foundations-evidence/` |
| The Operating Discipline | planning, verification, and responsibility during the work | `/framework/operating-discipline/` |
| Tiered Understanding | deciding how deeply to understand each component | `/framework/tiered-understanding/` |
| Shu-Ha-Ri | how guidance changes as your experience develops | `/framework/shu-ha-ri/` |

Heading: Essays

> Andrew Marcus writes about how the Ho System developed, how he defines a problem before building, and what he has learned through working with AI.

Keep “The Writing →” linking to `/writing/`. The sentence describes the topics of the currently listed essays without adding a new publication or claiming they validate the method.

## Exact proposed copy — Start

Description:

> Start a Ho System project: develop the idea, plan the build, prepare a working session, and maintain the project record.

Title: Start

> Start with a project you want to build. Write down the problem, intended users, and constraints before choosing an implementation. Use those decisions to plan the build and define its first working session.

Keep the existing chain diagram. Replace its caption with:

> The Kamae chain has four project-framing documents: Seed, System Design, README, and Ho Overview. Per-ho documents define individual sessions, and State Memory records the project's current position between sessions. Each box links to the document that explains it.

Heading: First steps

1. Choose templates or skills. Download the Markdown templates to work directly with the documents, or use the Ho skills to guide the planning conversations and setup work. The catalog describes each skill and links to its source.
2. Develop a seed (Kamae 1). Describe the problem, who the project is for, what already exists, and the constraints it must meet. Record the approach you want to explore and the questions still open.
3. Frame the build (Kamae 2–4). Develop the System Design to settle the architecture. Write the README to define the intended product and scope, then the Ho Overview to sequence the work and its dependencies.
4. Prepare the first ho (Kamae 5). Set up the project's tools and checks, and create its State Memory (Kamae 6). Define the session's deliverable, boundaries, and checks before implementation begins.
5. Carry out the work and record the result. Check the deliverable against the plan, review what you learned, and commit the completed work and its record to version control. Update State Memory whenever a ho closes or a session ends, recording what is complete, what comes next, unresolved issues, and the project's lifecycle stage. Preserve completed records when later decisions supersede them.

Link “Markdown templates” in step 1 to `/framework/#templates` and “catalog” to `/skills/`. Keep the existing skills source link, labeled “Skill source on GitHub,” at `https://github.com/sageframe-no-kaji/ho-system/tree/main/skills`. Use the existing glossary definitions for seed, ho, and State Memory where appropriate.

Closing resource sentence:

> Draft guides cover getting started, choosing a project, and working with AI. The Framework contains the document definitions and downloadable templates.

Link “Draft guides” to `https://github.com/sageframe-no-kaji/ho-system/tree/main/guides` and “Framework” to `/framework/`. Remove the old final caption.

## Limits and next decisions

The Start proposal gives the reader a documented template route and explains where skills fit. It does not solve skill installation: the next batch should establish which environments the published packages support and provide one tested installation route. The existing Skills page's universal reliability claims and the Walk page's repeated authenticity claims were observed while checking destinations and are deferred to their own review.

The proposed bodies and labels were checked against local source documents and existing built link destinations. No new platform-compatibility, project-count, effectiveness, or institutional-sponsorship claims are introduced. No build or publication was run because this artifact is a copy proposal and the application sources have not changed.

## Implementation verification — 2026-09-12

Applied the approved copy, added the Tiered Understanding link, and retained the specified reader-choice headings and wording exceptions. The Start page now includes creating and updating State Memory. Page structure, visual styling, and the Kamae chain diagram are unchanged.

- `npm run build`: passed, 127 pages generated.
- `npm run check-links`: passed, 3,804 internal links across 127 pages.
- `git diff --check`: passed.
- Browser review: read all three rendered pages and inspected full-page desktop screenshots; no clipping or broken layout observed.

Skill installation remains deferred to the next review batch, as proposed above.
