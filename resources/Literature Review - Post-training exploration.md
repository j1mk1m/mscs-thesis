# Organization
RL techniques vs SFT/Mid-training techniques that lead to better performance after RL (priming model for RL)

RL techniques
- experience replay
- loss function changes (clip-higher, KL, etc)
- curriculum (e3, DeepScaleR)

SFT techniques
- mode-aware training for diverse outputs (ModC)
- weight extrapolation (WiSE-FT)
- prime model with sub-abilities like backward chaining, verification, backtracking, etc

# RL techniques
Early attempts: introduce token-mean objective, clip-higher bias model towards low prob positive rewards, preventing exploration collapse
- DAPO (March 2025)
- Dr. GRPO (March 2025)

🛑 (Expensive) [SimpleRL-Zoo](https://arxiv.org/pdf/2503.18892) (Mar 2025) 
- Method: Zero RL training from base model
- Finding:
	- problem difficulty is important
	- increasing output length does not necessarily mean reasoning behaviors
	- suggests RL exploration > sharpening
	- long CoT SFT diminishes RL exploration

🛑 (No code) [Retrospective Replay](https://arxiv.org/abs/2504.14363) (Dou et al) - April 
- Method: RRL method stores promising states explored in early stages of training and replay them later on. This preserves ability to explore, increasing ability to solve complex problems

[LUFFY](https://arxiv.org/pdf/2504.14945) (Yan et al, April)
- Task: math
- Train: OpenR1-Math-220k, Teacher: DeepSeek-R1
- Eval: AIME 24/25, AMC, Minerva, OlympiadBench, MATH500
- Compute: 8x77 hrs on A100s 
- Method: use trajectory from strong teacher model to mix in during GRPO, which improves capabilities over the abilities of base LLM

🛑 (Expensive) [ProRL: Prolonged RL](https://arxiv.org/pdf/2505.24864) (Liu et al 2025) - May 
- Task: collection of math, coding, STEM, logic, instruction tasks
- Method: Encourage exploration by increasing temperature, using DAPO (clip-higher), KL regularization

[E3-RL4LLMs: Enhancing efficiency and exploration in RL for LLMs](https://arxiv.org/abs/2505.18573)  - May
- Task: math reasoning
- Train: DeepScaleR training dataset
- Eval: AIME 24, AMC 23, MATH 500, OlympiadBench
- Compute: 8 x 36 hrs A100s (7B); 4x24 hrs A100s (1B)
- Method: 
	- dynamically adjust number of rollouts based on task difficulty
	- temperature scheduler

[ReCUT](https://arxiv.org/abs/2506.10822) - June
- Task: math reasoning
- Method
	- At each reasoning step, generate long and short traces with prompts
	- Pick optimal next step and move on
	- Create two preference datasets based on accuracy and length and train 2 models
	- Interpolate weight of two models to control accuracy vs reasoning length tradeoff

[ASTRO](https://www.semanticscholar.org/reader/13ac800d9b6206d2a0664340ce6cc3a3ec4a367e)
- MCTS -> reasoning trajectories with successes and recovery from failure 
- bootstraps model with explorative prior 

[RLEP](https://arxiv.org/pdf/2507.07451) (Zhang et al) - July
- Task: math 
- Method:
	- Experience collection: collect good trajectories from converged model with vanilla RL
	- Replay-based training: train model with fresh rollouts + collected trajectories

🛑 (task) [Reasoning four STaRs behavior](https://arxiv.org/pdf/2503.01307)  (Aug 2025)
- Task: Countdown (number game)
- Finding: models that can verify, subgoal set, backtrack, and backward chain are better reasoners (math) and is more compatible with RL

[Pass@k training](https://www.semanticscholar.org/reader/5bb3e1643f7c1aafaa1ad78c4c4be13838f0faa1)
- Use Pass@k to train model

🛑 (Expensive) [RL Grokking Recipe](https://arxiv.org/pdf/2509.21016) (Sun et al 2025) - Sep
- Task: synthetic coding problems + real life (competition, LEAN, SQL)
- Method: Staged warmup with dense rewards (partial credit) followed by regular RL 
- Finding: Grokking moment when model discovers how to solve a problem family
- Method: Accelerate grokking with experience replay, curriculum training, verification-in-the-loop

[Outcome-based Exploration for LLM Reasoning](https://www.semanticscholar.org/reader/0fe8f2f55046ad0b8d6337f57a78466790923264) - Song et al, Sep
- Task: math
- Findings
	- diversity degradation transfers from solved problems to unsolved problems
	- tractability of outcome space
- Method: assign exploration bonus based on final outcome

[Representation-Based Exploration](https://www.semanticscholar.org/reader/1ffbfbe4b76033313a07fe2f89bee1fe61e4c458) - oct
- Task: math
- Method: representation-based exploration bonus 

[ExGRPO](https://arxiv.org/abs/2510.02245)
- own experience as replay buffer, filter and sample appropriate problems	

[Beyond the 80/20 rule](https://arxiv.org/abs/2506.01939) 
- small fraction of tokens in CoT exhibit high entropy (forking); use only  20% of tokens to achieve comparable performance by only looking at high-entropy tokens

[Reasoning with Exploration: an entropy perspective](https://www.semanticscholar.org/reader/69535d3c6ff3238f8e7b2b29c1d40ea9d9d7914f)
- Method: add entropy term to loss

🛑 (task) [Meta-RL induces exploration in language agents](https://arxiv.org/pdf/2512.16848) (Jiang et al) - Dec
- Task: agentic tasks like web shopping, games
- Finding: cross-episode training encourages exploration and in-context policy adaptation by reflecting on environment feedback 

[Learning to Discover at Test-time](https://test-time-training.github.io/discover.pdf)
- Task: Erdos minimum overlap problem, GPU kernels, comp coding
- Method: per-problem RL during test time
- Finding: compared to base TTS (best-of-n), shifts distribution towards better performing outputs

[Self-play with Variational Problem Synthesis](https://arxiv.org/pdf/2508.14029)
- Method: use policy's correct solutions to synthesize variations of problem
- Finding
	- preserves policy entropy during training to mitigate entropy collapse
	- improves pass@k

[Policy-of-Thoughts](https://arxiv.org/pdf/2601.20379) - Jan 26
- Task: code
- Method: Popper's method of generating testable ideas via reasoning cycle, using these diverse solutions in GRPO

# SFT Techniques
[WiSE-FT](https://arxiv.org/pdf/2504.10478v1) (Dang et al 2025) - April
- Method: extrapolate model weights during SFT -> preserve output diversity in SFT phase
- Finding: Leads to better performance after RL as well

[ModC](https://arxiv.org/pdf/2512.01127)  (Chen Wu, Aditi) - Nov
- Method: SFT technique that conditions model on reasoning modes -> generate more diverse output
	- 1) train separate models for each mode
	- 2) train single model with mode-specific prefixes
- Tasks
	- Countdown: search problem with 2 modes (BFS, DFS)
	- Math reasoning: short and long CoT; modes are different teacher models
		- Train: NuminaMath: Eval: MATH500
		- Train: OpenThoughts-3; Eval: AIME 24
- Findings:
	- Standard training creates imbalance in mode of outputs while ModC maintains balance
	- ModC performs better with test-time scaling (pass@k as k increase)
	- Gradient clustering is used to automatically find "modes"
	- Models trained with ModC SFT perform better after RL training compared to regular SFT
		- Suggests diversity collapse in RL could be addressed in SFT phase


