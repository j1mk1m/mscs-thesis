# Datasets/Case Studies on Compositional Generality
Summary: models struggle with compositional generality even when strong on atomic skills, but have potential to generalize.

[OMEGA](https://www.semanticscholar.org/paper/OMEGA%3A-Can-LLMs-Reason-Outside-the-Box-in-Math-and-Sun-Hu/295e2586a549790c96c5dfe99886a723bc315a09)
- Task: math
- Benchmark testing generalization across exploratory, compositional, transformative axis
- Finding: 
	- Strong performance on isolated skills but struggles with compositional generalization
	- RL helps for familiar structures but struggle to create novel reasoning strategies

[Compositional-ARC](https://arxiv.org/abs/2504.01445) (Mondorf et al) - Sep
- Task: compositions of geometric transformations
- Systemic generalization: ability to understand novel combinations of known components
- Compositional-ARC: dataset, task is generalizing geometric transformations
- Small model trained via meta learning for compositionality can perform systemic generalization, outperforming SOTA LLMs

[Does RL induce skill composition: Case Study on Countdown](https://www.semanticscholar.org/paper/How-Does-RL-Post-training-Induce-Skill-Composition-Park-Kaur/793db7d7dc7e124dfc5a9c88d15540445af49158)
- Task: countdown
- Method: 
	- Model solutions = expression trees, each subtree is a skill
- Findings:
	- Models generalize to larger trees
	- OOD generalization to unseen tree shapes
	- models master shallow balanced trees before deep unbalanced ones

[Characterizing Pattern Matching and Its Limits on Compositional Task Structures](https://arxiv.org/abs/2505.20278)
- Task: synthetic logic task in a graph
- Finding (more theoretical paper)
	- Training data required for two-hop generalization increase quadratically
	- Models struggle with path ambiguity: tasks where outcome of first task affect computation path of next
	- Neural networks generalize through: structure-based (bounded by coverage), property-based (leverage algebraic invariances), and shared-operator (through function reuse)

# Analyzing Reasoning Steps
[Topology of Reasoning](https://www.semanticscholar.org/reader/e8d625a3feb4ac5cd30f4653b3379b66db1ed4ef)
- Reasoning graph based on computation steps
- Analyze properties of graph like cycles, diameter

[Steering Vectors](https://www.semanticscholar.org/reader/07ed0dc37f6d3d38bd4ee2c738736987fc82b5f8)
- Task: 10 categories including math, logic, science, pattern recognition, etc
- Method: Extract *steering vectors* that control behaviors like backtracking and uncertainty estimation

[Thought Anchors](https://www.semanticscholar.org/reader/ab60ca888dfe60bc7a50f47bd483737523943682)
- Certain sentences have big impact on outcome of the trajectory called *thought anchors*
- Generally, planning or uncertainty management sentences 
- Sentence-sentence causal links can be used to understand model behavior, task difficulty, reasoning type
	
[RL Squeezes, SFT expands](https://arxiv.org/abs/2509.21128) 
- Task: math reasoning 
- Findings:
	- Trajectory-level: RL decreases number of incorrect trajectories while SFT increases correct ones
	- Step-level: RL compresses incorrect trajectories while SFT expands correct ones
		- Extract "steps" by clustering sentence embeddings

[Think Deep, Not just Long](https://arxiv.org/pdf/2602.13517) (Feb 2026)
- increased generation doesn't necessarily mean better performance (overthinking)
- quantify inference-time effort by identifying deep thinking tokens: tokens where internal predictions undergo significant change
- deep thinking ratio is good predictor of solution quality 
- Think@n: test-time scaling strategy

# SFT/RFT on compositional data
Summary: using CoT data for SFT helps models with compositional generalization

[Learning Composable Chains of Thought](https://arxiv.org/abs/2505.22635) 
- Task: string operations, language reasoning
- Methods
	- Model merging: 1) train separate models per atomic task and merge weights 2) train one model via multitask learning
	- Use data augmentation method to get compositional CoT data and use this to SFT/RFT on merged model

[T-CotMechanism](https://arxiv.org/pdf/2502.04667v2) 
- Task: NL reasoning
- Finding
	- CoT-trained models have structural advantage: internalizing reasoning into a two stage generalizing circuit
	- CoT-training effective for OOD generalization

# RL for compositional generalization
Summary: DeepSeek-R1 paper showed that the response length increase throughout training, implicitly showing how RL training encourages the model to "reason more". Similarly, DeepScaleR uses iterative lengthening (increase task difficulty with context length), also implying that longer reasoning length means more reasoning steps. The e3 paper formalized this as the chaining of asymmetries (e.g. generation-verification), in which RL training helps the model in-context explore solutions. 

The last 3 works (Yuan et al, Motwani et al, Cheng et al) take a specific task with multiple *atomic* skills and show how models compose these subskills.

[Demystifying Long CoT](https://arxiv.org/pdf/2502.03373)
- Task: math reasoning
- Findings:
	- SFT on long CoT data helps with RL to achieve better overall performance
	- Cosine-length-reward with repetition penalty stabilizes CoT while encouraging reasoning behaviors like branching and backtracking
	- Core reasoning behaviors are inherently present in base models, but we need to carefully craft RL incentives to take advantage of it

[DeepScaleR](https://pretty-radio-b75.notion.site/DeepScaleR-Surpassing-O1-Preview-with-a-1-5B-Model-by-Scaling-RL-19681902c1468005bed8ca303013a4e2)
- For small models, SFT distillation is important followed by RL 
- Iterative lengthening: increase context length with dataset difficulty
	- Note: this is implicitly saying that more "difficult" problems require more reasoning steps, so we increase max output length with difficulty
	
[e3](https://arxiv.org/pdf/2506.09026) (Setlur et al) 
- Task: math reasoning
- Findings:
	- test-time exploration happens when chaining asymmetries in extrapolation
	- negative gradients are important (you can't get this in SFT): drives up response length and in-context exploration (i.e. number of asymmetries)
	- curriculum (easy to hard as training budget increase): enables gradual exploration


[From f(x) and g(x) to f(g(x)): LLMs learn new skills by composing old ones](https://arxiv.org/abs/2509.25123) (Yuan et al) 
- Task: synthetic string transformation functions
- Finding: RL enables model to solve unseen composition of functions h(x) = g(f(x))

[H1: bootstrapping LLMs to reason over long horizons via RL](https://arxiv.org/abs/2510.07312) (Motwani et al)
- Task: math
- Method:
	- Synthetically compose simple problems into complex one with multiple steps (GSM8K)
	- Train model with outcome rewards under curriculum (increase compositional steps with context length)
- Finding: improvement even at high pass@k

[From atomic to composite](https://www.semanticscholar.org/reader/3a7b9d4db1cd8901a58266cc3d67a3d627a27ede) (Cheng et al)
- Task: NL QA reasoning (requiring 2 atomic skills: parametric reasoning & contextual reasoning)
- Findings
	- Models SFT on composite data do not generalize well to OOD
	- RL acts as reasoning synthesizer, but only when atomic skills are mastered through SFT

[Think Longer to Explore Deeper](https://arxiv.org/pdf/2602.11748) (Feb 2026)

