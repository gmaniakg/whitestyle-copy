# ROADMAP: 5-Step GSD Execution Loop

## Phase 1: Graphify Zero-Token Knowledge Graph (`[COMPLETED]`)
- **Discuss & Plan:** Select `graphifyy` (`v0.9.102`) for local `tree-sitter` AST extraction across 37 languages.
- **Execute:** Install `graphify` CLI & skills into Antigravity (`~/.gemini/config/skills/graphify`) and Claude Code (`~/.claude/skills/graphify`), extract `sns-management` (`377 nodes, 749 edges`) and `whitestyle-copy` (`2,133 nodes, 3,958 edges`), and merge into `~/.graphify/global-graph.json`.
- **Verify:** Benchmark confirms **`15.3x`** token reduction on `sns-management` and **`82.4x`** token reduction on `whitestyle-copy`.

## Phase 2: Diagram-Design v2.6 + WhiteStyle Profile + Hallmark Showcase (`[IN PROGRESS]`)
- **Discuss & Plan:** Install `diagram-design` (45 visual types) and onboard `~/.diagram-design/profiles/whitestyle.md` with `.diagram-design` project markers.
- **Execute:** Build flagship standalone HTML/SVG clinical architecture & patient journey diagram (`whitestyle_33yr_clinical_system_diagram.html`) with Korean (`국문 완결`) and Japanese (`일문 완결`) sections.
- **Verify:** Pass `verify-contrast.py` / `lint-skin.py`, Hallmark `sloplint.mjs` (`0 FAIL, 0 WARN`), and `impeccable detect` (`0 anti-patterns`).

## Phase 3: GSD (`.planning/`) Global Runtime & Subagent Handoff (`[IN PROGRESS]`)
- **Discuss & Plan:** Install `@opengsd/gsd-core` across `--antigravity` and `--claude` global scopes.
- **Execute:** Configure `.planning/` (`PROJECT.md`, `ROADMAP.md`, `STATE.md`, `config.json`) in `insane_skills` and `sns-management`.
- **Verify:** Confirm `gsd-*` skills/agents and `.planning/` state handoff between Antigravity and Claude Code + Strata.

## Phase 4: X-Algorithm Production Weights & Omnichannel Syndicator Upgrade (`[IN PROGRESS]`)
- **Discuss & Plan:** Extract exact `ValueModelWeights` (`ShareViaCopyLink +20.0`, `BidirectionalFollowReplyBoost +15.0`, `Reply +5.0`, `Quote +5.0`, `AuthorDiversityDecay 0.5->0.25`, `MinVideoDurationMs 10,000`, `open_link` gate trap) into `x-algorithm` skill.
- **Execute:** Upgrade `e:\antigravity\sns-management\omnichannel_syndicator.py` with `score_x_thread_phoenix()` and 3-part link-isolated X thread architecture (`1/3 KR Hook [No URL]` → `2/3 JP Hook [No URL]` → `3/3 Official Consultation URLs`).
- **Verify:** Re-run `omnichannel_syndicator.py --force` and verify Phoenix score audit + `assert_clean_copy()`.
