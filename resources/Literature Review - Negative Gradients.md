
[Smaug](https://arxiv.org/pdf/2402.13228)
- DPO on positive and negative samples can cause failure mode where likelihood of chosen samples are reduced
- Propose DPO-Positive: incentivize log prob of chosen > log prob of rejected AND log prob chosen > log prob chosen reference

[On the Effect of Negative Gradient in Group Relative Deep Reinforcement Optimization](https://openreview.net/forum?id=2K9QsDaqkM)
- Mask out negative gradients: surprisingly they show negative gradients reduce likelihood of correct responses (contradicts e3 finding?)
- Negative gradients are not inherently harmful
- negative gradients help at a token level

[e3](https://arxiv.org/pdf/2506.09026)
- Negative gradients increase asymmetries and response length
- Masking out negative gradients lead to decrease in performance

[Not all negative samples are the same](https://arxiv.org/html/2602.03516v2)
- Using high-quality negative samples that have expected format and coherence help more than average negative sample

[Learning From Mistakes: Negative Reasoning Samples Enhance OOD generalization](https://arxiv.org/html/2601.04992v1)
- using negative trajectories in SFT improve OOD generalization over positive-only training
- negative samples good intermediate steps with incorrect final answers