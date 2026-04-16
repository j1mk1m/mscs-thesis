# Background
With the recent surge in LLMs, people want to use them to solve harder and harder problems. The main approach to making LLMs better at hard problems is to teach them to "reason" [[Literature Review - Reasoning Models]].

Reasoning models are post-trained with SFT + RL or zero RL and people have been trying to understand the dynamic [[Literature Review - SFT vs RL]].

The big problem with early post-training methods was the sharpening effect, in which the model just places a higher probability mass on successful solutions that it already knows [[Literature Review - Sharpening]]. To combat sharpening/show that genuine discovery occurs, works have tried different methods to encourage exploration in post-training [[Literature Review - Post-training exploration]]. In an adjacent direction, other works have focused on the idea that RL allows the model to chain together reasoning steps to solve problems [[Literature Review - Extrapolation, Chaining, Compositional Generality]].

# Project
The goal of the project is to understand the dynamic between SFT vs RL in their role in the emergence of reasoning ability. In particular, we study the **emergence of compositional generality** (the ability to chain together multiple sub-skills to solve harder problems). We know that RL can teach models to compose ([Yuan et al](https://arxiv.org/pdf/2509.25123)), but can we move this to midtraining (SFT)? What are the components of RL, namely on-policyness and use of negative samples, that lead to the emergence of composition?

See [[Experiments]] document for detailed experiment set up

### Title
- Dissecting Reinforcement Learning: Mechanisms Behind Compositional Reasoning in LLMs
- On the Emergence of Compositional Generalization in Language Models: A Study of Supervised and Reinforcement Learning
- Compositional Generalization in Language Models: Disentangling the Effects of SFT and RL