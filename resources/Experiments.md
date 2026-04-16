# Task
Compositional Generality: can models learn to compose atomic skills together

Setting: [String functions](https://arxiv.org/pdf/2509.25123)
- e.g. task
```
You are given a code: 

def main_solution(x): 
	return func_5(x, 'tt') 
		
Can you predict the output of `main_solution("icfh")` without writing any code? Please reason and put your final answer in the following json format: {"output": <your output>}, where <your output> should be the final string.
```
- e.g. answer
```
	  {"output": "tticfh"}
```

- We are looking at **compositional generalization**: how does the model perform when we scale the number of compositions in the task?
	- "level $i$" indicates that the task is to predict the output of $i$ composed functions
	
Model Training Overview
- **Stage 1 Training**: As baseline, we start with a model trained on Level 1 tasks, so the model can perform atomic tasks. This model is used as checkpoint for all future experiments.
- **Stage 2 Training**: We then train the model on Level 2 tasks on various settings (main experiments below)
- **Evaluation**: We evaluate the model on Level 1 to 8 tasks

Notes
- Does reasoning length also increase with performance on level $n \ge 2$ tasks?

----
# Experiments

### Experiment 1: SFT vs RL
Key questions: can SFT teach models to compose? How can we best split compute resources between SFT and RL stage?

Settings: given the same total compute (measured by number of generated samples during training)
- Off-policy SFT (rollouts generated from teacher model (RL-Checkpoint))
- RL (GRPO)
- SFT -> RL curriculum
	- 25/75 split
	- 50/50 split
	- 75/25 split

| Model               | Post-Training                           | Level 1 | Level 2 | Level 3 |
| :------------------ | :-------------------------------------- | ------- | ------- | ------- |
| Base (Llama-3.1-8B) | None                                    | 16.4    | 2.3     | 1.2     |
| ***Stage 1***       |                                         |         |         |         |
| Level 1 RFT         | Level 1 RFT                             | 71.9    | 14.8    | 3.5     |
| ***Stage 2***       |                                         |         |         |         |
| RFT-half            | Level 2 RFT (half compute)              | 63.3    | 33.6    | 9.4     |
| RFT-only            | Level 2 RFT (full-matched compute)      | 77.7    | 36.7    | 8.9     |
| RFT-half+RL-half    | Level 2 RFT (half) -> Level 2 RL (half) | 71.1    | 40.2    | 13.3    |
| RL-only             | Level 2 RL                              | 84.8    | 60.9    | 27.7    |

Conclusions
- RL significantly outperforms basic off-policy SFT (especially for Level $\ge 2$)
- SFT -> RL also doesn't perform well compared to zero-RL setting

#### Experiment 1.1: Filtering
Key question: can filtering techniques improve performance by filtering high quality samples?
##### Attempt 1: Basic filtering
- **max samples**: all correct samples vs one sample vs K samples per problem
- **max-correct-ratio**: filter "too easy" problems 

| Wandb                                                                     | Max Correct Ratio | max samples | Num Samples | Level 1 | Level 2 | Level 3 |
| ------------------------------------------------------------------------- | ----------------- | ----------- | ----------- | ------- | ------- | ------- |
|                                                                           | None              | all         | 270k        |         |         |         |
| [Link](https://wandb.ai/j1mk1m/string-task/runs/twvtraa0?nw=nwuserj1mk1m) | 1.0               | all         | 27k         | 77.7    | 36.7    | 8.9     |
| [Link](https://wandb.ai/j1mk1m/string-task/runs/sdjnf71e?nw=nwuserj1mk1m) | None              | 1           | 17k         | 75.8    | 42.2    | 13.7    |
| [Link](https://wandb.ai/j1mk1m/string-task/runs/yzmck5ni?nw=nwuserj1mk1m) | 0.8               | 3           | 2k          | 54.7    | 19.1    | 3.5     |
##### Attempt 2: Teacher is base model given string function code
- The RL checkpoint model outputs overly verbose reasoning traces. 
	- Average token length: 1758 
- Solution: Use the base model but with help (include gold code of string functions in the prompt) 
	- Average token length: 334 
	- We can also filter by min and max token length percentile (too short and too long responses are likely not good)

| Wandb                                                                     | Max Correct Ratio | max samples | Num Samples | Level 1 | Level 2 | Level 3 |
| ------------------------------------------------------------------------- | ----------------- | ----------- | ----------- | ------- | ------- | ------- |
|                                                                           | None              | all         | 35k         |         |         |         |
| [Link](https://wandb.ai/j1mk1m/string-task/runs/kg4h1kob?nw=nwuserj1mk1m) | None              | 1           | 6k          | 71.8    | 26.2    | 5.5     |
| [Link](https://wandb.ai/j1mk1m/string-task/runs/k9t2hh1y?nw=nwuserj1mk1m) | None              | 4           | 18k         | 74.2    | 24.2    | 5.8     |

##### Attempt 3: reasoning trace must include both function names involved (In Progress)
- some reasoning traces get "lucky" since some string functions are identity functions, so they can get the answer right without considering the composition
- Training samples after filtering from Teacher traces with code: 35k -> 19k

| Wandb                                                                               | Max Correct Ratio | max samples | Num samples | Level 1 | Level 2 | Level 3 |
| ----------------------------------------------------------------------------------- | ----------------- | ----------- | ----------- | ------- | ------- | ------- |
| [Link](https://wandb.ai/j1mk1m/string-task/runs/u57bfd6z?nw=nwuserj1mk1m) (Running) | None              | all         | 19k         |         |         |         |

Conclusions
- Different filtering strategies do not seem to help. Also, by filtering, the distribution becomes more and more off-policy. This is probably not the way to go.

#### Experiment 1.2: Curriculum Learning (Skip for now)
Key question: can a curriculum increase performance?

Method
- Each string function can be measured in difficulty based on models performance after Stage 1 (average success rate). 
- For Level 2 tasks, we calculate the compounded success rate by multiplying the functions' success rates. 
	- Check that compounded success rate correlates with actual difficulty (measured by RL-checkpoint model's performance)
- We group these compounded success rates into 3 groups and train easy -> medium -> hard.

Settings
- Mixed training
- Curriculum: easy -> hard
- Reverse curriculum: hard -> easy
- Only easy samples
- Only medium samples
- Only hard samples

Hypothesis
- curriculum easy -> hard achieves best performance

----
### Experiment 2 (Main focus)
Key question: which components of training lead to compositionality?
- Furthermore, how do these components impact reasoning length
#### Experiment 2.1: On-policy vs Off-policy
Key question: how important is using on-policy data over off-policy?

Settings
- Off-policy SFT
- On-policy SFT
- Off-policy -> On-policy curriculum
	- 25/75 split
	- 50/50 split
	- 75/25 split

Using reference code from this paper: [On-Policy Supervised Fine-Tuning for Efficient Reasoning](https://arxiv.org/pdf/2602.13407) (Zhao et al 2026)
- By removing KL divergence and group normalization from the GRPO objective, the new objective becomes equivalent to SFT objective but with on-policy data

OSFT 
- similar performance to SFT
- on-policy vs off-policy is not the issue?

#### Experiment 2.2: Negative samples 
Key question: how important is making use of negative samples?

Settings
- SFT (rejection fine tuning)
- [Unlikelihood training](https://arxiv.org/abs/1908.04319)
- Contrastive Fine Tuning: e.g. DPO

DPO

#### Experiment 2.3: Loss function
Key question: what other differences in the objective function lead to differences?

Ideas
- KL divergence
- Group normalization

well, OSFT with negative examples work, meaning KL divergence and group norm is not needed

### Experiment 2.4 Other factors
- max_response_length


----
### Experiment 3: Transfer 
Key question: Do our results transfer to more general reasoning tasks? Is compositional generality a key skill for general reasoning?

Benchmarks
- Math reasoning: MATH-500, AMC, AIME, OlympiadBench, etc
- Code reasoning
- General Reasoning
- Other toy tasks: e.g. Countdown game (used in original paper)

Setting 1 
- Compare base model vs model trained on String Function composition
- Does the "compositional" model perform better on general reasoning tasks?

Setting 2: training method generalization
- Compare RL training vs our best training method using general reasoning tasks
- Does our training method generalize and produce a better model?

----
### Experiment 4: Model generality
Key question: do our findings extend to other model families and model sizes?

- Llama-3.1-8B-Instruct (Main model)
	- Other Llama models
- Qwen3 Family
	- 14B, 8B, 4B, 1.7B, 0.6B
	
----