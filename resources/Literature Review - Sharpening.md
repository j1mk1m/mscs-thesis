Sharpening is the phenomena in which training shifts the distribution of the model to put more probability mass on good generations (that it already knows). This improves pass@1 accuracy while potentially hurting pass@k. 

[Self-Improvement in LLMs: The Sharpening Effect](https://arxiv.org/abs/2412.01951)
- Models can improve by sharpening: putting more probability mass on good generations
- Can happen with SFT and RL
- SFT method is more optimal when there is sufficient coverage

[Does RL really incentivize reasoning capacity beyond base](https://arxiv.org/pdf/2504.13837) (Yue et al)
- RL trained models outperform base model at small k, but eventually base model overtakes
- Solutions found by RL models exist in the base model 

[The invisible leash](https://arxiv.org/abs/2507.14843) (Wu et al)
- RLVR operates as support-constrained optimization mechanism that restricts discovery of novel solutions
- entropy-reward tradeoff: progressively narrows exploration
- RLVR lowers answer-level entropy

[Echo Chamber](https://arxiv.org/abs/2504.07912) (Zhao et al)
- pretrain model from scratch on curated open source datasets (composed of different distributions) + post-train on math QA tasks 
- after post-training, model converges to dominant output distribution

[Reasoning four STaRs behavior](https://arxiv.org/pdf/2503.01307)  (Aug 2025)
- models that can verify, subgoal set, backtrack, and backward chain are better reasoners (math) and is more compatible with RL

[Reasoning with Sampling](https://arxiv.org/abs/2510.14901)
- Inspired by Markov chain Monte Carlo technique, sampling from base model can perform as well as RL trained model

[The Reasoning Boundary Paradox](https://www.semanticscholar.org/reader/82a1759629f4ec4b55b3326e86e5cf328d24cc64)
- negative inference: learning some problems reduce likelihood of correct solutions for other problems
- winner-take-all: RLVR disproportionally reinforce solutions w high likelihood
- Method: data collection algorithm to focus on low-likelihood solutions

[Outcome-based Exploration for LLM Reasoning](https://www.semanticscholar.org/reader/0fe8f2f55046ad0b8d6337f57a78466790923264) - Song et al, Sep
- Task: math
- Findings
	- diversity degradation transfers from solved problems to unsolved problems
	- tractability of outcome space
- Method: assign exploration bonus based on final outcome
