---
title: タンパク質の言語モデルesmを使ってみる
postedAt: 2024-07-14
slug: '2024-07-14-esm'
description: None
tags: [dev, llm]
---

Facebookが開発しているタンパク質の言語モデルである[esm](https://github.com/facebookresearch/esm)を使ってみたので，その利用方法について記しておく。

esmはpipで非常に簡単にインストールできる。内部的にPyTorchも利用しているので一緒にインストールしておく。

```sh
pip install esm-fair torch
```

まずは，READMEにあるサンプルコードを参考にして，以下のコードを動かしてみる。

```python
import esm

model, alphabet = esm.pretrained.esm2_t33_650M_UR50D()
batch_converter = alphabet.get_batch_converter()
model.eval()

data = [
    ("protein1", "A"),
    ("protein2", "ARNDCQGEGHILKMFPSTWYV<mask>"),
]
batch_labels, batch_strs, batch_tokens = batch_converter(data)
batch_lens = (batch_tokens != alphabet.padding_idx).sum(1)

print(batch_labels)
print(batch_strs)
print(batch_tokens)
```

このときの出力は，以下のようになる。

```python
['protein1', 'protein2']
['A', 'ARNDCQGEGHILKMFPSTWYV<mask>']
tensor(
    [
        [ 0,  5,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 1,  1,  1,  1,  1,  1],
        [ 0,  5, 10, 17, 13, 23, 16,  6,  9,  6, 21, 12,  4, 15, 20, 18, 14,  8, 11, 22, 19,  7, 32,  2]
    ]
)
```


出力結果からわかるように，`batch_converter`は入力として，タンパク質のラベルとアミノ酸配列の組の配列を受け取り，それをタンパク質のラベル，アミノ酸配列の組およびアミノ酸のトークンIDに変換する。アミノ酸の開始トークンIDは`0`，アミノ酸の終了トークンIDは`2`，マスクトークンIDは`32`であり，出力のトークンID配列の長さを合わせるためにpaddingトークンがIDを`1`として加えられる。

これに続いて以下のコードを実行する。
```python
import torch
import esm

model, alphabet = esm.pretrained.esm2_t33_650M_UR50D()
batch_converter = alphabet.get_batch_converter()
model.eval()

data = [
    ("protein1", "A"),
    ("protein2", "ARNDCQGEGHILKMFPSTWYV<mask>"),
]
batch_labels, batch_strs, batch_tokens = batch_converter(data)
batch_lens = (batch_tokens != alphabet.padding_idx).sum(1)

with torch.no_grad():
    results = model(batch_tokens, repr_layers=[33], return_contacts=True)

token_representations = results["representations"][903]

sequence_representations = []
for i, tokens_len in enumerate(batch_lens):
    sequence_representations.append(token_representations[i, 1 : tokens_len - 1].mean(0))

print(sequence_representations)
```

出力結果は次のようになる。
```python
[
    # 1280次元のtensor
    tensor([-0.1559,  0.1949, -0.2425,  ..., -0.0135,  0.1261, -0.2430]),
    tensor([ 0.0099,  0.0371,  0.0562,  ..., -0.0352, -0.0953,  0.0270])
]
```

この出力結果からわかるように，`model`は入力されたアミノ酸配列を1280次元の特徴量ベクトルに変換している。`model`の引数`repr_layers`は出力に加える層の位置を受け取る。デフォルトでは最終層の33である。`return_contacts`の方はよくわからない。基本的に`True`でいいと思う。
