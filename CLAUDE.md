# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a CMU Master's thesis in LaTeX. The thesis is titled **"Dissecting Reinforcement Learning: Mechanisms Behind Compositional Reasoning in LLMs"** by Gyeongwon James Kim (advisor: Chenyan Xiong), targeting May 2026 submission.

The thesis investigates why RL outperforms SFT for compositional generalization in LLMs, using a controlled string-function task setting to isolate the contributions of on-policy data, negative samples, and objective design.

## Building

```bash
# Compile the thesis (run twice for cross-references/TOC)
pdflatex cmuthesis_template.tex
bibtex cmuthesis_template
pdflatex cmuthesis_template.tex
pdflatex cmuthesis_template.tex
```

The main entry point is `cmuthesis_template.tex`. The bibliography file is `main.bib`.

## File Structure

- `cmuthesis_template.tex` — Main thesis document (all chapters are inline, not separate files)
- `cmuthesis.cls` — CMU thesis LaTeX class (provides title page, abstract, acknowledgments, draft stamp)
- `main.bib` / `references.bib` — Bibliography sources
- `resources/` — Research notes and planning documents (not compiled into the thesis):
  - `1-Project Document.md` — Project background and research goals
  - `Experiments.md` — Detailed experiment design with results tables and WandB links
  - `Literature Review - *.md` — Literature notes by topic

## Thesis Structure

The document follows this chapter order:
1. Introduction (background, problem statement, contributions)
2. Related Work (reasoning model post-training, SFT vs RL, compositional generalization, exploration/sharpening)
3. Compositional Generalization (task definition, naive SFT results, RL results)
4. Components of Reinforcement Learning (on-policy vs off-policy, negative samples)
5. Bridging the Gap (SFT → GRPO progression)
6. Transfer and Generality (task and model-family transfer)
7. Conclusion

## Key Research Context

- **Task**: String function composition — models must predict outputs of composed string transformations; "level i" means composing i functions
- **Training protocol**: Stage 1 on level-1 tasks → Stage 2 on level-2 tasks → evaluate levels 1–8
- **Main finding**: RL (GRPO) substantially outperforms off-policy SFT at higher composition levels; filtering strategies do not close the gap; on-policy data and negative samples are the critical components
- **Primary model**: Llama-3.1-8B-Instruct; secondary: Qwen3 family
- **Experiment tracking**: WandB project `j1mk1m/string-task`

## LaTeX Notes

- The `\todo{}` command renders in red — used to mark incomplete sections
- `\draftstamp{\today}{DRAFT}` adds a draft watermark; remove before final submission
- The class file uses `natbib` with `plainnat` style and `\bibliography{main}`
- Generated files (`.aux`, `.pdf`, `.log`, etc.) are gitignored
