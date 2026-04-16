### SFT and RL

### Midtraining
Def: intermediate stage of supervised/self-supervised training between large pretraining and task-specific fine-tuning. Usually static curated high-quality dataset. Enforce abilities such as reasoning, coding, instruction following, etc. Also, increase context length.

[Mid-training survey](https://arxiv.org/pdf/2510.06826v1) (Oct 2025)
	- purpose: mitigate diminishing returns from noisy tokens, stabilize convergence, expand model capability
	- theory: shift model's learning dynamics from memorization to abstraction
	- data distribution: shift distribution towards math, code, reasoning, instruction-following that is useful 
	- long context extension: long CoT data to increase reasoning ability
	- learning rate scheduling: decreasing learning rate to "fine"-tune	

### Effects of SFT vs RL
- what effects do SFT and RL stages have on the model?

[Understanding effects of RLHF](https://arxiv.org/pdf/2310.06452)
- RL generalizes better than SFT
- RL reduces output diversity

[SFT memorizes, RL generalizes](https://arxiv.org/abs/2501.17161)
- Task: arithmetic reasoning card game
- SFT struggles to generalize for OOD
- RL contributes the models underlying capabilities
- SFT stables format, which makes RL training more stable

[SFT or RL? R1 like reasoning LVLM](https://www.semanticscholar.org/reader/2adbf228f96164e4780cbc19da9a0005cf8cde32)
- SFT can help model learn reasoning formats but in the long term, hurts ability to perform generalizable reasoning
 
[e3](https://matthewyryang.com/e3/): (Jun 2025)
- Task: math reasoning AIME 25, HMMT 25
- Findings:
	- test-time exploration happens when chaining asymmetries in extrapolation
	- negative gradients are important (you can't get this in SFT): drives up response length and in-context exploration
	- curriculum (easy to hard as training budget increase: enables gradual exploration
	
[SRFT: A Single-Stage Method with Supervised and Reinforcement Fine-Tuning for Reasoning](https://arxiv.org/abs/2506.19767)
- Date: June 2025
- Task: Math reasoning and OOD reasoning benchmarks
- Findings
	- SFT produces coarse, global distribution shifts; RL produces fine, selective adjustments
	- Entropy is a useful lens: SFT and RL differ in how they shape token-level uncertainty
	- Single-stage SRFT, combining SFT and RL with entropy-aware weights, outperforms two-stage pipelines
	- Achieves large gains on in‑domain and OOD math benchmarks over “zero‑RL” methods
- Method
	- Unified loss: SFT term on demonstrations + RL term on rollouts, with entropy-based weighting
	- One-stage optimization rather than SFT→RL
	- Extensive ablations on token entropy, weighting schemes, and data types

[Supervised Fine Tuning on Curated Data is Reinforcement Learning (and can be improved)](https://arxiv.org/abs/2507.12856)
- Date: July 2025
- Task: math reasoning
- Findings
	- SFT on curated data maximizes a lower bound on a sparse-reward RL objective
	- Importance-weighted SFT (iw‑SFT) tightens this bound and behaves more like RL
	- iw‑SFT matches or outperforms more complex RL algorithms on LLM reasoning and continuous control
- Method
	- Formal connection between BC/SFT and RL via sparse rewards and lower bounds
	- Introduce iw‑SFT and generalize it to quality-scored data
	- Empirical comparisons on AIME‑style math and control benchmarks

[RL is neither panacea or mirage](https://arxiv.org/pdf/2508.16546v1) (Aug 2025)
-  Task: a card game that tests arithmetic reasoning ability (regular version and OOD variant)
- Findings
	- OOD generalization peaks during early SFT but decays as ID improves
	- RL mitigates OOD decay from SFT up to a certain point (SFT can overfit too much)
	- Conclusion: RL counteracts SFT-induced directional drift to reduce catastrophic forgetting rather than finding new solutions

[On the Generalization of SFT](https://arxiv.org/abs/2508.05629)
- Date: August 2025
- Task: Math reasoning
- Findings
	- SFT implicitly has a problematic reward structure that hurts generalization
- Method:
	- Dynamic Fine-Tuning (DFT): dynamically rescale objective function with probability of each token
	
[RL Squeezes, SFT expands](https://arxiv.org/abs/2509.21128) - Sep
- Task: math reasoning 
- Findings:
	- Trajectory-level: RL decreases number of incorrect trajectories while SFT increases correct ones
	- Step-level: RL compresses incorrect trajectories while SFT expands correct ones
	
[One-Token Rollout: Guiding Supervised Fine-Tuning of LLMs with Policy Gradient](https://arxiv.org/abs/2509.26313)
- Date: September 2025
- Task: Math, code, and general reasoning fine-tuning with better generalization than SFT
- Findings
	- Performance gap between SFT and RL is largely due to off-policy vs on-policy data, not just loss form
	- OTR turns static SFT data into token-level on-policy training without full-sequence rollouts
	- Consistently outperforms standard SFT across diverse reasoning benchmarks
- Method
	- Treat each token as a single-step RL trajectory; sample multiple candidate tokens per step
	- Use ground-truth token to assign rewards to sampled tokens; optimize via policy gradient
	- Only update on sampled tokens, effectively reweighting SFT by on-policy exploration

[Anchored Supervised Fine-Tuning](https://arxiv.org/abs/2509.23753)
- Date: September 2025
- Task: Stable, generalizing SFT-style post-training across reasoning and knowledge tasks
- Findings
	- Re-analyzes Dynamic Fine-Tuning (DFT) in a reward-weighted regression (RWR) framework
	- Shows DFT tightens RL lower bounds but suffers from unanchored distributional drift and instability
	- Anchored SFT (ASFT) adds lightweight KL regularization, preserving tightness while stabilizing training
	- ASFT reliably outperforms SFT and DFT on math reasoning, medical knowledge, and code with small compute overhead
- Method
	- Theoretical derivation of SFT/DFT as RWR with auxiliary distributions and importance weights
	- Add KL “anchor” to base policy within the RWR objective
	- Experiments measuring task performance and KL drift vs base model across domains

[Retaining by Doing: The Role of On-Policy Data in Mitigating Forgetting](https://arxiv.org/abs/2510.18874)
- Date: October 2025
- Task: Post-training without catastrophic forgetting (instruction following, knowledge, arithmetic)
- Findings
	- RL post-training forgets significantly less than SFT at similar or better target-task performance
	- The key advantage is not KL or advantage estimation but use of (approximately) on‑policy data
	- Mode-seeking updates let RL preserve prior knowledge while fitting new tasks
- Method
	- Mixture model toy analysis: prior-distribution vs target-distribution components
	- Controlled comparisons of SFT vs RL across LLaMA/Qwen families and tasks
	- Ablations where on-policy data is replaced/approximated to isolate its effect 

[RL vs Distillation](https://www.semanticscholar.org/reader/2287c77e0e8c533647577c2ddc6dfa0d509db6bb) - Oct
- Task: math reasoning
- Findings
	- RLVR struggles to improve capability (pass@k) over base model because it focuses on "easy" problems 
	- RLVR produces new, high-quality trajectories not in the base model
	- RLVR responses are not necessarily longer in length and number of reflection keywords
	- Distillation from teacher model or RLVR-model performs better than self-distillation
		- distillation can only help capability if new knowledge is added 
 

 [The Path Not Taken: RLVR Provably Learns Off the Principals](https://arxiv.org/abs/2511.0856)
- Date: November 2025
- Task: Mechanistic analysis of RLVR parameter updates vs SFT
- Findings
	- Apparent sparsity of RLVR updates is a consequence of geometry-driven “off-principal” bias
	- Three-Gate Theory: KL anchor, model geometry, and precision jointly steer updates
	- RLVR preserves spectrum and principal subspace, while SFT distorts them and can underperform
	- Directly porting SFT-era PEFT/sparse schemes to RLVR can be misleading and suboptimal
- Method
	- Principal-component / spectral analysis of weight changes under RLVR vs SFT
	- Empirical measurement of subspace rotation, spectral drift, and update alignment
	- Case studies of sparse fine-tuning and LoRA-style PEFT under RLVR
	   
[PretrainZero: Reinforcement Active Pretraining](https://arxiv.org/abs/2512.03442)
- Date: December 2025
- Task: General reasoning improvement at pretraining stage (no labeled rewards)
- Findings
	- Naive RL pretraining on Wikipedia collapses or is inefficient due to low info density/noise
	- Active, on-policy selection of informative spans yields stable RL pretraining
	- RL pretraining alone (no SFT, no reward models) significantly boosts MMLU‑Pro, SuperGPQA, math
	- Gains persist after later RLVR post-training, acting as a “reasoning foundation”
- Method
	- RLPT baselines: next-token vs masked-span RL, random vs entropy-based masking
	- PretrainZero: on-policy mask-generation policy + masked-span prediction policy trained jointly with GRPO
	- Verification scaling: gradually more challenging masked spans during reinforcement pretraining 

[How and Why LLMs Generalize: A Fine-Grained Analysis of LLM Reasoning from Cognitive Behaviors to Low-Level Patterns](https://arxiv.org/abs/2512.24063)
- Date: December 2025
- Task: Analyze generalization of reasoning skills under SFT vs RL across domains
- Findings
	- Introduces a benchmark decomposing reasoning into core skills (calculation, retrieval, simulation, enumeration, diagnostic, etc.)
	- RL-tuned models maintain more stable profiles of these skills and avoid “reasoning skill collapse”
	- SFT produces sharper behavioral drift and overfits to surface patterns, degrading some core skills
	- Low-level statistics (distribution divergence, parameter changes) correlate with cognitive-level behaviors
- Method
	- Design atomic-skill tasks in math, science, and non-reasoning settings
	- Meta-probing across training stages to track skill emergence, transfer, and degradation
	- Joint analysis of behavioral metrics and parameter/distribution statistics

[Diversity or Precision? A Deep Dive into Next Token Prediction](https://arxiv.org/abs/2512.22955)
- Date: December 2025
- Task: Shape pretraining token distributions to better support downstream RL reasoning
- Findings
	- Reinterprets cross-entropy as single-step policy gradient with a specific reward shape
	- Proposes reward shaping that explicitly trades off diversity vs precision in next-token prediction
	- Finds that precision-oriented priors (sharper distributions) yield better exploration for later RL than high-entropy ones
- Method
	- Generalized pretraining objective: positive scaling of rewards and rank-aware treatment of negatives
	- Vary scaling and rank-aware penalties to reshape the base model’s output distribution
	- Evaluate how different pretraining distributions affect subsequent RL reasoning performance

[On the interplay of Pre-training, Mid-training, and RL](https://arxiv.org/pdf/2512.07783) (Dec 2025)
- synthetic reasoning task with atomic operations, parseable reasoning traces, manipulation of training distribution
- Test on extrapolation generalization (more complex tasks) and contextual generalization (across different contexts)
- Findings: 
	- edge of competence (RL works when base model is good enough but has lot of headroom)
	- Need small but sufficient exposure in pre-training for contextual generalization
	- Mid-training helps significantly given fixed training budget

[RL naturally mitigates forgetting](https://arxiv.org/abs/2507.05386)
- Task: multi-modal
- Findings
	- in continual post-training setting: SFT leads to catastrophic forgetting while RFT protects performance of previous skills
	
Summary
- SFT memorizes and RL generalizes better
- SFT creates larger change to distribution (it moves model towards data distribution) while RL makes more fine-grain changes

### SFT as pre-step for RL
- how can we use SFT to make the base model for compatible for RL?

[How much backtracking is enough?](https://www.semanticscholar.org/reader/def268940f3bc1f3541693fbc565ff32e0c0dbc9)
- setting: reasoning games and puzzles
- short CoT training in SFT moderately helps RL compared to zero RL
- longer CoT with backtracks induce better and stable RL training
- more challenging problems need more backtracks during SFT

[WiSE-FT](https://arxiv.org/pdf/2504.10478v1) (Dang et al 2025) - April
- Method: extrapolate model weights during SFT -> preserve output diversity in SFT phase
- Finding: Leads to better performance after RL as well

[OctoThinker](https://arxiv.org/abs/2506.20512) (June 2025)
- high quality mid-training data helps RL, long CoT, QA, instruction data improves performances, but long CoT can make responses verbose
- mid-training strategy to make base model more RL compatible

[Reasoning four STaRs behavior](https://arxiv.org/pdf/2503.01307)  (Aug 2025)
- Task: Countdown
- models that can verify, subgoal set, backtrack, and backward chain are better reasoners (math) and is more compatible with RL

[Mid-training bridges pre & posttraining distributions](https://www.arxiv.org/abs/2510.14865) (Oct 2025)
- mid-training helps bridge the gap between pre and post-training distributions
- helps most for code and math since there is syntactic gap
- midtraining reduces catastrophic forgetting
- timing of introducing midtraining data is important (earlier the better)
- midtraining outperforms continued pretraining, which shifts distribution abruptly to 100% post-training distribution
- proximity advantage (dist(pretrain, SFT) - dist(midtrain, SFT)): how much closer does midtraining bring model to target SFT distribution compared to training from pretrain model
	- linear relationship between performance and proximity advantage; but relationship weaker for larger models

[Reasoning Behavior for Web Agents](https://arxiv.org/pdf/2510.06534)  (Oct 2025)
- Task: web tasks
- behaviors such as verification and error recovery help web agents and can distill these behaviors via SFT before RL

[ModC](https://arxiv.org/pdf/2512.01127)  (Chen Wu, Aditi) - Nov
- Tasks
	- Countdown: search problem with 2 modes (BFS, DFS)
	- Math reasoning: short and long CoT; modes are different teacher models
		- Train: NuminaMath: Eval: MATH500
		- Train: OpenThoughts-3; Eval: AIME 24
- Method: SFT technique that conditions model on reasoning modes -> generate more diverse output
	- 1) train separate models for each mode
	- 2) train single model with mode-specific prefixes
- Findings:
	- Standard training creates imbalance in mode of outputs while ModC maintains balance
	- ModC performs better with test-time scaling (pass@k as k increase)
	- Gradient clustering is used to automatically find "modes"
	- Models trained with ModC SFT perform better after RL training compared to regular SFT
		- Suggests diversity collapse in RL could be addressed in SFT phase

### Combining SFT and RL
- can we combine SFT and RL to get best of both words?

[SASR](https://arxiv.org/pdf/2505.13026)
- step-wise adaptive hybrid training that combines SFT and RL
- combines SFT loss and GRPO loss and control weight based on schedule

[SRFT](https://arxiv.org/pdf/2506.19767)
- SFT induces coarse grained global changes vs RL performs fine-grained optimizations
- Supervised Reinforcement Fine Tuning (SRFT) simultaneously deploy SFT and RL
- entropy is a key indicator of training dynamic

[CHORD](https://arxiv.org/pdf/2508.11408)
- Combined SFT and RL with dynamically weighted auxiliary loss
- control influence of off-policy data while ensuring training stability

### On-Policy SFT
[Supervised Fine Tuning on Curated Data is Reinforcement Learning (and can be improved)](https://arxiv.org/abs/2507.12856)
- Date: July 2025
- Task: math reasoning
- Findings
	- SFT on curated data maximizes a lower bound on a sparse-reward RL objective
	- Importance-weighted SFT (iw‑SFT) tightens this bound and behaves more like RL
	- iw‑SFT matches or outperforms more complex RL algorithms on LLM reasoning and continuous control
- Method
	- Formal connection between BC/SFT and RL via sparse rewards and lower bounds
	- Introduce iw‑SFT and generalize it to quality-scored data
	- Empirical comparisons on AIME‑style math and control benchmarks
	
[One-Token Rollout: Guiding Supervised Fine-Tuning of LLMs with Policy Gradient](https://arxiv.org/abs/2509.26313)
- Date: September 2025
- Task: Math, code, and general reasoning fine-tuning with better generalization than SFT
- Findings
	- Performance gap between SFT and RL is largely due to off-policy vs on-policy data, not just loss form
	- OTR turns static SFT data into token-level on-policy training without full-sequence rollouts
	- Consistently outperforms standard SFT across diverse reasoning benchmarks
- Method
	- Treat each token as a single-step RL trajectory; sample multiple candidate tokens per step
	- Use ground-truth token to assign rewards to sampled tokens; optimize via policy gradient
	- Only update on sampled tokens, effectively reweighting SFT by on-policy exploration
	
[On-Policy Distillation (Kevin Lu, Thinking Machines Lab)](https://thinkingmachines.ai/blog/on-policy-distillation/)
- Date: October 2025 
- Task: Distillation of strong policies into smaller LLMs using on-policy data
- Findings
	- Targets distribution-mismatch issues in off-policy distillation by sampling from student policy
	- Aims to combine distillation efficiency with RL-style generalization
- Method
	- Student generates trajectories; teacher provides token/sequence-level guidance or rewards
	- On-policy updates align student with teacher on the student’s own state distribution

[Towards a Unified View of Large Language Model Post-Training](https://arxiv.org/abs/2509.04419)
- Date: September 2025
- Task: math
- Findings
	- SFT, RL, DPO-style, and hybrid objectives are all instances of a unified policy-gradient estimator
	- Four components—stabilization mask, reference denominator, advantage estimate, likelihood gradient—compose most methods
	- Clarifies bias–variance trade-offs of different recipes and when each signal is preferable
	- Hybrid Post-Training (HPT) using mixed signals improves math and OOD benchmarks over strong baselines
- Method
	- Derive a common objective and show various post-training algorithms as special cases
	- Define HPT that dynamically chooses among SFT-like and RL-like signals per update
	- Experiments across model scales and families on six math and two OOD suites

[On-Policy Supervised Fine-Tuning for Efficient Reasoning](https://arxiv.org/pdf/2602.13407) (Zhao et al)
- Date: Feb 2026
- Complex reinforcement learning components like KL regularization and group-wise normalization are unnecessary and often counterproductive for training efficient reasoning models.
- By removing the two components, training effectively just becomes On-Policy SFT
- Task: math reasoning
	- Reduces Chain-of-Thought length by up to 80% while maintaining accuracy, defining a new state-of-the-art performance-efficiency frontier. 
	- Optimize training: 50% lower GPU memory usage and 70% faster convergence compared to standard RL methods. 
- Success relies heavily on the use of self-generated on-policy data, as traditional off-policy supervised fine-tuning fails to achieve similar reasoning efficiency. 
