// plain-cuts.mjs — SPIKE-LOCAL plain cuts for definition-on-touch (Basis §4, §7).
//
// FRICTION (reported in SPIKE.md, not a frozen-value change): the framework's
// glossary.md has NO `plain:` field yet — writing the ~40 plain cuts is the framework
// task that *gates v1* (spec §4, §11). So the site's real source of plain cuts does not
// exist to ingest. These stand-ins are condensed from the REAL glossary definitions
// (ingested, linked as the full cut) and obey §4's rule: one sentence, no term of art
// inside. When the framework lands its `plain:` field, ingestion reads it and this file
// is deleted. The full cut below is always the real ingested entry.

// term key → { plain, aliases[] }  (aliases are surface forms found in prose)
export const PLAIN_CUTS = {
  ho: {
    plain: "One bounded, deliverable session of work that leaves a record when it closes.",
    aliases: [],
  },
  supersedes: {
    plain:
      "Names exactly what a newer document overtakes; the older one keeps a pointer back, and nothing is erased.",
    aliases: ["supersedes", "superseded", "supersede", "supersession"],
  },
  dogfood: {
    plain: "Learning a tool by actually using it on a real task, the way a real user would.",
    aliases: ["dogfood", "dogfooded", "dogfooding"],
  },
  Reflect: {
    plain:
      "The honest look back after the work: did the plan hold, what changed, what the next session carries.",
    aliases: ["Reflect"],
  },
  "agent task": {
    plain:
      "A precise, checkable spec an autonomous coding agent runs to do one bounded piece of work.",
    aliases: ["agent task", "agent tasks"],
  },
  "forward-only": {
    plain:
      "Finished work stays finished; a mistake is answered with a new document, never by editing the old one.",
    aliases: ["forward-only"],
  },
};
