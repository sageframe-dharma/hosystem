---
created: 2026-09-12
status: implemented
scope: Framework, Skills, Walk, Writing
source_commit: f53c4d4
di_revision: e9d35c8d952dbb40e4781297e93a6df259ee4071
ho_system_revision: 0f93b7fa32f71a6aa6a3c672ff18dfe1af045a44
sharibako_revision: 157d1da960c6
---

# Framework, Skills, Walk, and Writing — editorial proposal

Implementation note, 2026-09-12: Andrew approved this proposal with “i trust you. just do it.” The proposal below preserves the pre-implementation review; its pending-action statements describe that earlier state. Implementation and verification are recorded at the end.

The pages need to help readers find documents, choose a skill, inspect a project decision, and choose an essay. Their current introductions repeatedly praise the practice and expose instructions written for the site's authors. This proposal replaces the authored page copy and skill-card summaries. Application sources and published pages remain unchanged pending Andrew's review.

## Reader and source scope

Framework serves someone looking up a named part of Ho or downloading a template. Skills serves someone choosing help for a planning or setup task; the installation example assumes they already have Git and Claude Code. Walk serves someone evaluating how Ho works through a project's records. Writing serves someone choosing an essay to read.

Reviewed the actual local templates, the rendered skill catalog, `src/_data/corpus.js`, the marker and comparison implementations, and imported source documents. Used the current nine-class DI skill and both kill lists in the local Destructive Interference repository. Its revision is unchanged since the previous batch; the installed eight-class description is still behind it.

The proposal retains the diagrams, document lists, record contents, navigation, and source links. Imported framework documents and project records are outside this copy pass. The new skill-card summaries belong to the website, so future ingestion should not replace them with agent-facing trigger descriptions.

## DI AUDIT — authored copy in the four page templates

### LEVEL 1 — ACT

1. Framework: “It is the obviously-right order, never a locked door.” [SS]
   Diagnosis: the sentence certifies the sequence instead of explaining how the documents relate or when they change.
   Edit: REWRITE → “Later work can lead you to revise an earlier document; record the revision and its reason.” Place this in the diagram caption, where the revision arrows supply its context.

2. Framework: “six links: four framing documents carry a project from opinions to a sequence, a fifth carries each working session, and a sixth remembers the build between them.” [MS]
   Diagnosis: the caption immediately repeats the same explanation; the introduction needs to orient a reader to the page's resources.
   Edit: REPLACE → “The framework documents define how Ho projects are planned, carried out, checked, and recorded. Use the diagram to follow the project documents, or browse the definitions and download templates below.”

3. Framework: “the skills that author them are one door over.” [MT]
   Diagnosis: the invented spatial transition replaces a usable destination with site metaphor.
   Edit: REPLACE → “The Ho skills can guide you through developing these documents.” Link “Ho skills” to `/skills/`.

4. Skills: “written down so the conversation goes right every time.” [SS]
   Diagnosis: the absolute assurance supplies no evidence and cannot describe a dependable outcome of model instructions.
   Edit: REWRITE → “Each Ho skill gives an AI assistant instructions for a planning, setup, or maintenance task.”

5. Skills: “New to the practice? The on-ramp is” [TC]
   Diagnosis: the question and lead-in add nothing to the destination label.
   Edit: DELETE → retain “Start a Ho project →”, linked to `/start/`.

6. Skills: “Each skill is known by what it produces and where it sits in the chain.” [TC]
   Diagnosis: the sentence announces the information the catalog should supply, without helping readers choose.
   Edit: DELETE → [removed]. Give each card a task title and description instead.

7. Walk: “a real, shipped project” and “its genuine build record: the actual documents from the actual build, not a demo and not staged data.” [SS]
   Diagnosis: repeated authenticity claims substitute emphasis for provenance; source links and records establish provenance. “Shipped” also conflicts with the imported README's stated release status.
   Edit: REWRITE → use the two-sentence Walk introduction below, followed by a source link.

8. Walk: “The cleanest current-convention instance of the practice” [SS]
   Diagnosis: the superlative evaluates the example before readers inspect it and identifies no comparison set.
   Edit: DELETE → [removed].

9. Walk: “a real project, its whole chain and hos rendered as the documents they are” [MS]
   Diagnosis: the second paragraph repeats the first paragraph's entire claim.
   Edit: REPLACE → “Start with the change to the setup command below, then follow the project-framing documents and individual ho records.”

10. Walk: “The most persuasive single thing the practice can show is a plan meeting reality on the record.” [PE]
    Diagnosis: the sentence tells readers how to rate the example before presenting what happened.
    Edit: REPLACE → “The dashboard built in ho-04.4 passed automated tests but trapped the user during a terminal walkthrough. Ho-04.6 replaced it with line-by-line prompts while retaining the underlying import logic.”

### TALLY

L1: 10 · L2: 0 · L3: 0

PE: 1 · PU: 0 · TC: 2 · BH: 0 · SS: 4 · MS: 2 · EI: 0 · MT: 1 · FS: 0

### NOTES

The repeated catalog layout supports comparison among skills; it is not an instance of the uniform-template failure. The retained diagram's parallel document names also describe an actual structure. No nursery sightings warrant a new entry.

“Not a plugin—a structured collaborator with opinions and refusals” needs a direct definition and a compatibility correction. “Practitioner-chosen…never inferred” exposes an authoring constraint. These are reader and accuracy problems without needing a forced DI code.

## Accuracy, provenance, and reader problems

- **Design instructions became public copy.** `design/design-spec.md` §5.2 says that the essay list is practitioner-curated and that additions must not be inferred. `src/writing.njk` repeats that constraint for visitors, who need essay subjects and links. The essay subtitles also closely repeat the specification's internal notes. This is direct evidence of instruction leakage in Writing; it does not establish the cause of every bad sentence on the site.
- **Agent descriptions became reader descriptions.** `src/_data/corpus.js` takes the first sentence of each skill's frontmatter description. That field is written to help an agent select the skill. The result includes repeated “collaborator” phrasing and visible literal backticks around a filesystem path. Use explicit website summaries while retaining the exact command names and source links.
- **Availability was overstated.** The imported Sharibako README says “v1 in active development” and describes a Mac app and CLI. Remove “shipped” and the CLI-only description. The revised introduction describes the project's purpose without announcing a release.
- **Animation copy drifted from behavior.** `src/js/flip.js` renders already-closed marks in gold without animation on a first visit. On a return visit, it can animate a newly closed record when fully visible. Reduced-motion and unavailable-storage cases also skip animation. Explain what the states mean; avoid promising an animation to every reader.
- **The comparison instruction needs a location.** The clickable item is in the selected document's `supersedes` row. Name that location and explain that it opens the earlier and replacement records together.
- **Installation is missing.** The source overview identifies directory packages, and the repository contains eight Ho skill directories. It does not give the website reader a first installation sequence. Add a project-local seed-skill example, with its prerequisites and confirmation step.
- **Compatibility varies by skill.** The personal setup skill explicitly configures `~/.claude/`; project setup reads that environment's files. Planning skills use Markdown and bundled references. Do not infer that the entire package works in Codex or other assistants merely because they can read the skill format.
- **DI's source status differs from the catalog description.** The upstream overview lists DI among nine built skills and calls it eight-class. DI is not one of the eight skill directories ingested here; its current development source is nine-class in another repository. Do not promise a DI installation or silently add it to this catalog. Upstream overview correction is separate work.
- **An unpublished essay is not a destination.** “The Spec Is Not the Hard Part — joins on publication” has no link. Remove that row from the public page pending a confirmed publication URL; preserve the title in the design record. Publication status was not inferred from the absence of a link.

## Exact proposed copy — Framework

Description:

> Ho System definitions, project documents, and downloadable Markdown templates.

Title: The Framework

> The framework documents define how Ho projects are planned, carried out, checked, and recorded. Use the diagram to follow the project documents, or browse the definitions and download templates below.

Keep the existing responsive diagram. Replace its caption with:

> The Kamae chain begins with Seed, System Design, README, and Ho Overview. Per-ho documents define individual working sessions; State Memory records the project's current position between sessions. Later work can lead you to revise an earlier document; record the revision and its reason. Each box links to the document that explains it.

Keep “The documents” and its generated list. Replace the index caption with:

> The index of documents lists the framework's documents and their source locations.

Retain the existing `corpus.documentsIndex.url` link on “index of documents.”

Keep “Templates” and all download/source links. Replace its introduction with:

> Download a Markdown template to begin a project document. The Ho skills can guide you through developing these documents.

Link “Ho skills” to `/skills/`.

## Exact proposed copy — Skills

Description:

> Choose a Ho skill for project planning, environment setup, or document maintenance, and install the seed skill in Claude Code.

Title: The Skills

> Each Ho skill gives an AI assistant instructions for a planning, setup, or maintenance task. It specifies what to ask, which documents to use, and what to produce. You review the decisions and resulting work.

> The setup skills configure a Claude Code environment. The planning skills produce Markdown documents that you can read and edit independently. You can also begin directly with the document templates.

Link “document templates” to `/framework/#templates`.

Retain the Start link, labeled “Start a Ho project →”. Delete the v2 transcript promise; it is not a release commitment supported by this review.

### Try the seed skill in Claude Code

> You need Git and Claude Code installed. In Terminal, open the project directory where you want to develop the idea, then run:

```sh
ho_skill_source="$(mktemp -d)"
git clone --depth 1 https://github.com/sageframe-no-kaji/ho-system.git "$ho_skill_source/ho-system" &&
mkdir -p .claude/skills &&
if [ -e .claude/skills/ho-kamae-1-seed-collaborator ]; then
  echo "The seed skill is already installed; keep it or review an update separately."
else
  cp -R "$ho_skill_source/ho-system/skills/ho-kamae-1-seed-collaborator" .claude/skills/
fi
```

> This copies the seed skill and its references into `.claude/skills/` for this project. Open Claude Code in the same directory and type `/ho-kamae-1-seed-collaborator`, followed by a description of the project you want to develop. Confirm that the command is available before beginning the conversation.

> To use another skill, copy its whole directory from the Ho repository into `.claude/skills/`. Keep its reference files with it. Claude Code's skill documentation describes installation across all your projects and other locations.

Link “Ho repository” to `https://github.com/sageframe-no-kaji/ho-system/tree/main/skills` and “Claude Code's skill documentation” to `https://code.claude.com/docs/en/skills`.

### Choose a skill

Display each task title as the card heading. Preserve its full command identifier in code below the heading, its existing framework reference, and its source link. These eight rows define the exact website summaries:

| Existing identifier | Display title | Description |
| --- | --- | --- |
| `ho-kamae-1-seed-collaborator` | Develop a project seed | Work through the problem, intended users, constraints, and possible approaches. Draft a seed or revise one you already have. |
| `ho-kamae-2-system-design-collaborator` | Design the system | Use the completed seed to decide the architecture, compare alternatives, and record the reasons for your choices. |
| `ho-kamae-3-readme-collaborator` | Write the project README | Describe the intended product and scope from the seed and system design. Update the README as the project changes. |
| `ho-kamae-4-overview-collaborator` | Plan the build sequence | Organize the work into phases and hos, with dependencies, deferred decisions, and planned release points. |
| `ho-kamae-5-authoring-collaborator` | Prepare a working session | Define a ho's scope, decisions, and checks from the project plan. Update the document as the work develops and record the results afterward. |
| `ho-setup-personal-environment-collaborator` | Set up your Claude Code environment | Configure the operating instructions, practitioner context, language conventions, and templates used across your Ho projects. |
| `ho-setup-project-environment-collaborator` | Set up a project | Create the repository structure and configure its development tools and checks using your Ho environment. |
| `ho-tool-index-maintenance` | Maintain the framework index | Update document metadata and INDEX.md entries in the Ho System repository. |

For the existing per-card resource line, replace “Claude Code skill · grounded in” with “Framework reference:” when there is a reference. For Kamae 5, retain the templates link, labeled “Document templates →”. Keep “SKILL.md source →” on every card. The exact command identifier provides the installation name; the display title need not repeat it.

Closing caption:

> The skills overview describes when to use each skill and distinguishes practitioner setup from project work.

Retain the existing overview link. Its stale DI count and class description should be corrected in the owning repository before presenting it as an installation manifest.

## Exact proposed copy — Walk

Description:

> Follow Sharibako's project plans, working-session records, and the replacement of its setup dashboard with plain prompts.

Title: The Walk

> Sharibako is a Mac app and command-line tool for storing API keys and environment variables in an encrypted local vault. These documents record its plans, implementation work, and revisions.

> Start with the change to the setup command below, then follow the project-framing documents and individual ho records. The source documents are available in Sharibako's public repository.

Link “Sharibako's public repository” to the existing GitHub destination.

Replace “The arc, as state” with “The setup sequence”.

> This arc follows three versions of Sharibako's setup command. Gold marks indicate closed steps; the lighter gold mark identifies the superseded dashboard. Select a step to read its record.

Retain the glossary interaction on “arc” and the three existing linked nodes. Replace the superseded mark's tooltip “superseded: recession, not promotion” with “Superseded by ho-04.6”.

Replace “The visible architecture change” with “Replacing the dashboard”.

> The dashboard built in ho-04.4 passed automated tests but trapped the user during a terminal walkthrough. Ho-04.6 replaced it with line-by-line prompts while retaining the underlying import logic. Open ho-04.6—plain-prompt init, then select the entry in its `supersedes` row to compare the earlier and replacement records.

Retain `corpus.showcase` as the link target for “ho-04.6—plain-prompt init”. The specific failure and retained logic are recorded in ho-04.6's Problem, Changes, and Results sections; no new outcome claim is inferred from test counts.

Keep “The Kamae chain” and its generated list. Rename “The hos” to “Working-session records”; keep the list and all status/supersession labels.

## Exact proposed copy — Writing

Description:

> Essays by Andrew Marcus on building Kanyō, defining problems, and developing the Ho System.

Title: Writing

> Andrew Marcus writes about building with AI and developing the Ho System. These essays are published on Substack.

Retain the three existing linked titles and URLs. Replace their subtitles as follows:

| Existing essay | Proposed subtitle |
| --- | --- |
| I Built a Computer Vision System for Harvard's Falcon Cameras | building Kanyō with AI |
| Walking Without Google Maps | defining the problem before choosing a solution |
| Three Hours | how a working environment can carry the method |

The subtitles draw from the existing approved list and design notes; they do not expand the essays' claims. Remove the unlinked fourth row, as described under accuracy and reader problems. Do not add new essays or alter published titles.

## Implementation scope if approved

- `src/framework.njk`, `src/skills.njk`, `src/walk.njk`, `src/writing.njk`: apply the copy and the described Skills installation section.
- Add website-owned skill titles and summaries in `src/_data/skillCopy.json`; use them in `src/skills.njk`. Keep the imported records and `src/_data/corpus.js` unchanged. A missing override can fall back to the existing source description until reviewed.
- Keep existing visual values, diagrams, interactions, and list rendering. Inspect the new installation block and card identifiers at desktop and narrow widths because they introduce long command text.
- Run the build, internal-link checker, and `git diff --check`; inspect the four rendered pages and the Walk comparison instructions before publication.

## Installation verification and limits

Checked the official [Claude Code skill documentation](https://code.claude.com/docs/en/skills) on 2026-09-12. It documents project-local `.claude/skills/<name>/SKILL.md`, supporting files in the same directory, and direct slash-command invocation. The source packages' own instructions establish the Claude-specific environment assumptions. This does not certify another assistant's compatibility.

Executed the seed-skill clone and copy sequence in an isolated temporary project on macOS with Bash. The public download's three seed-skill files matched the local source by relative path and SHA-256. A repeated installation preserved the entire existing directory, including a test sentinel. No skills were placed in Andrew's project or personal configuration.

The installed Claude Code executable reports version 2.1.269. No model session was launched, so slash-command discovery and the ensuing planning conversation remain unverified. File placement passing is not a claim that the skill's behavior has passed acceptance. The public instructions include the reader's command-discovery step; a full runtime test remains an implementation check before describing this as end-to-end tested.

The initial file-copy test used fail-on-error shell settings. The displayed copy-paste sequence uses `&&` between dependent commands so a failed clone or directory creation does not proceed to copying. Extracted that exact displayed sequence from this proposal and tested it separately: Bash syntax passed, all three installed files matched the local source, and repeating the commands preserved the existing directory. The four page templates remain unchanged; no site build or deployment was needed for this review artifact.


## Implementation and verification — 2026-09-12

Applied the four-page copy and added `src/_data/skillCopy.json` with the eight reviewed task titles and summaries. The Skills template uses that data while retaining identifiers, framework references, and source links. The installation commands match the tested proposal. Imported documents and the corpus ingestion code are unchanged.

Browser inspection found one correction to the proposal: the compact Framework diagram does not expose individual box links. Removed “Each box links to the document that explains it” from its caption rather than promising an interaction unavailable at narrow widths. The existing diagram and document links remain unchanged.

- Build: 127 pages generated successfully.
- Internal links: all 3,804 resolve.
- Whitespace: `git diff --check` passes.
- Rendered review: all four pages inspected at 390-pixel width; Skills also inspected at desktop width. Skill identifiers wrap and its command block scrolls internally without widening the page.
- Walk: followed the plain-prompt link and selected the `supersedes` entry; the earlier dashboard and replacement prompt appeared together, with the control reporting expanded state.
- Installation: file placement and existing-directory preservation were tested during the proposal. No Claude Code model session was run; runtime invocation remains unverified.
