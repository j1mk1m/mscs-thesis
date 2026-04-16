# Setting
Math Benchmarks
- AMC, AIME
- MATH500
- GSM8k
- Minerva Math
- Olympiad
General reasoning
- GPQA-Diamond: graduate level, google-proof multiple-choice questions in biology, physics, chemistry (Diamond set is subset of highest quality samples)
- [SuperGPQA](https://supergpqa.github.io/): extends GPQA to 285 graduate-level disciplines
- [TheoremQA](https://arxiv.org/abs/2305.12524): QA dataset that tests application of theorems from Math, physics, finance, etc

# Reasoning Models
[DeepSeek-R1](https://www.nature.com/articles/s41586-025-09422-z#Sec5) (Jan 2025)
- introduced Zero RL framework: rl from base model
- cold-start SFT on base model then RL performs better

[DeepScaleR](https://pretty-radio-b75.notion.site/DeepScaleR-Surpassing-O1-Preview-with-a-1-5B-Model-by-Scaling-RL-19681902c1468005bed8ca303013a4e2) (Feb 2025)
- small 1.5B model trained via RL outperforms o1-preview on math
- increase context length throughout training

Qwen QwQ-32B
- cold-start followed by 2 stages of RL (math, code RL then general RL)
- achieves similar performance to DeepSeek-R1

[SimpleRL-Zoo](https://arxiv.org/pdf/2503.18892) (Mar 2025)
- zero RL training from base model
- problem difficulty is important
- increasing output length does not necessarily mean reasoning behaviors
- suggests RL exploration > sharpening
- long CoT SFT diminishes RL exploration

[Open-Reasonder-Zero](https://arxiv.org/pdf/2503.24290) (May 2025)
- trained R1 like reasoning model with less training using PPO and GAE, minimal reward function, no KL penalty

[Light-R1](https://arxiv.org/abs/2503.10460) (May 2025)
- curriculum training with increasing difficulty + multi-stage post-training
- filter problems based on difficulty (< $\alpha$ pass rate)
- 2 phases of SFT then DPO

[General-Reasoner](https://arxiv.org/pdf/2505.14652) (June 2025)
- collected all-domain reasoning dataset from web 
- trained compact all-domain answer verifier for short answers using CoT via SFT on Gemini-2.0 trajectories

[Llama-Nemotron](https://arxiv.org/pdf/2505.00949) 
- introduce series of reasoning models NVIDIA
- more efficient during inference
- model learns to toggle reasoning on and off
- SFT + RL

[All roads lead to likelihood](https://arxiv.org/abs/2503.01067) (Oct 2025)
- on problems with generation-verification gap, can easily train RM then RL can just search over generator space

[Scaling behavior of LLM RL post-training](https://arxiv.org/pdf/2509.25300) (Dec 2025)
- Qwen2.5 model series on math reasoning
- Larger models demonstrate better learning efficiency but saturates eventually
- Power law models test loss, data, compute
- in data-constrained regimes, reusing high quality data helps

[Reasoning Models Generate Society of Thought](https://arxiv.org/pdf/2601.10825)
- Finding
	- reasoning models demonstrate diversity in perspective such as multiple personalities/domains of expertise in their CoT
	- training for reasoning accuracy increase conversational behavior
	- training on conversational data improves reasoning acc than monologue data
	