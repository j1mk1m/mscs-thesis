![[modeling.jpeg]]



Focus: which components of training lead to compositionality?

Axis to consider
- On-policy vs off-policy
- Use of negative samples
- Other loss function components
	- group normalization
	- clipping
	- KL penalty
	- entropy penalty

Other considerations
- Adding components to SFT vs Removing components from GRPO
- The order in which we add/remove components

----
# Direction 1
What is a natural progression from SFT to GRPO through looking at the loss function?

![2026-3-25-sft-grpo.png](imgs/2026-3-25-sft-grpo.png)

- Ignoring clipping and KL penalty
- Change SFT to on-policy rollout data
- Orange part of the loss is the same
- Then, we can think of $\widehat{A}_i$ as 1 for positive samples and 0 for negative samples?
- To add negative samples: think of $\widehat{A}_i$ as 1 for positive samples and -1 for negative samples?
- Then, GRPO is just the above but samples are weighted by group-normalized advantage

Progression (SFT to GRPO)
0. Off-policy SFT
1. On-policy SFT
2. Reinforce: On-policy SFT with negative samples
3. Reinforce with baseline
4. GRPO: above + group normalized weights


# Direction 2: negative samples
Options

1. Add negative samples to SFT
	- [Unlikelihood training](https://arxiv.org/pdf/1908.04319): push down prob mass on incorrect generations
2. Remove negative samples from GRPO
	- GRPOMask proposed in [e3](https://arxiv.org/pdf/2506.09026): mask out negative gradients; this is similar to On-policy SFT + group normalized weights only for positive samples
3. DPO
 
$$\mathcal{L}_{\text{DPO}}(\theta) = - \mathbb{E}_{(x, y^+, y^-)} \left[ \log \sigma\left( \beta \left( \log \frac{\pi_\theta(y^+ \mid x)}{\pi_{\text{ref}}(y^+ \mid x)} - \log \frac{\pi_\theta(y^- \mid x)}{\pi_{\text{ref}}(y^- \mid x)} \right) \right) \right]$$


### SFT
$$ \ell(\theta) = - \mathbb{E}_{(x, y)} \left[ \frac{1}{T} \Sigma_{t = 1}^T \log \pi_\theta(y_t \vert x, y_{< t}) \right]$$

Route 1
- SFT
- On-policy SFT (train on only positive samples; cross-entropy loss)
- On-policy SFT + pos/neg samples ($\pm 1$ weights)
- On-policy SFT + pos/neg samples + Group normalization
- 

### GRPO

$$ \ell_{GRPO}(\theta) = - \mathbb{E}_{(x, \{ y\}^G)} \left[ \frac{1}{G} \Sigma_{i = 1}^G \widehat{A}_i \log \pi_\theta(y_i \vert x) \right] + \beta \cdot KL(\pi_{\theta} \vert \vert \pi_{ref}) $$


### DPO

$$\mathcal{L}_{\text{DPO}}(\theta) = - \mathbb{E}_{(x, y^+, y^-)} \left[ \log \sigma\left( \beta \left( \log \frac{\pi_\theta(y^+ \mid x)}{\pi_{\text{ref}}(y^+ \mid x)} - \log \frac{\pi_\theta(y^- \mid x)}{\pi_{\text{ref}}(y^- \mid x)} \right) \right) \right]$$


|            | Positive Only | Pos/Neg examples                                     |
| ---------- | ------------- | ---------------------------------------------------- |
| Off-policy | SFT (NO)      | DPO ()                                               |
| On-policy  | OSFT (NO)     | GRPO (YES), OSFT with neg samples (YES), Online DPO? |

