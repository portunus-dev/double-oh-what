# 00-what

Secrets detection.

## Data prep

We want to prepare data with either `plain` or `secret` labels.

For `secret` data, we can use the included [keygen](keygen/README.md) tool to generate a good number of randomly generated keys (that can be considered as secret/password-like data).

Then we can use common shell/bash capabilities to prepare the data with ease, and make it comform to FastText requirements (what we would use as example to train the secret detection model). For example:

```shell
% node keygen/index.js  # by default generates 1 million keys per strength of total of 10 strengths
% cat keygen/data/*.txt | sed 's/^/__label__secret /' > data/secrets.txt
```

For `plain` data, we can use <https://github.com/dwyl/english-words> as a basis, and do the same thing:

```shell
% cat english-words/words.txt | sed 's/^/__label__plain /' > data/plain.txt
```

Then we would want to merge, shuffle and split the data into training (80%) and validation (20%) sets.
