---
title: 独立性および条件付き確率
postedAt: 2024-12-02
slug: '2024-12-02-probability'
description: None
tags: [math, probability]
---

:section[独立な$\sigma$-加法族系]

:::lem
$\Omega$を集合とし，$\left( S, \mathcal{S} \right)$を可測空間とする。写像$X: \Omega \to S$に対して，

$$
\begin{align*}
\sigma \left[ X \right] = \Set{ X^{-1} \left( A \right) | A \in \mathcal{S} }
\end{align*}
$$

は$\Omega$上の$\sigma$-加法族である。特に，$\sigma \left[ X \right]$は$X$が可測写像となる$\Omega$上の最小の$\sigma$-加法族であり，$X$で生成される$\sigma$-加法族という。
:::

:::proof
$\mathcal{S}$は$\sigma$-加法族なので，$\emptyset, S \in \mathcal{S}$である。したがって，

$$
\begin{align*}
\emptyset = X^{-1} \left( \emptyset \right) \in \sigma \left[ X \right]
\end{align*}
$$

であり，

$$
\begin{align*}
\Omega = \emptyset^c = \left( X^{-1} \left( \emptyset \right) \right)^c = X^{-1} \left( \emptyset^c \right) = X^{-1} \left( S \right)  \in \sigma \left[ X \right]
\end{align*}
$$

となる。したがって，$\emptyset, \Omega \in \sigma \left[ X \right]$を得る。

任意の$B \in \sigma \left[ X \right]$に対して，ある$A \in S$が存在して，$B = X^{-1} \left( A \right)$となるが，$\mathcal{S}$は$\sigma$-加法族であるから，$A^c \in \mathcal{S}$であり，

$$
\begin{align*}
B^c = \left( X^{-1} \left( A \right) \right)^c  = X^{-1} \left( A^c \right) \in \sigma \left[ X \right]
\end{align*}
$$

が得られる。

任意の集合列$B_i \in \sigma \left[ X \right] \left( i \geq 0 \right)$に対して，ある$A_i \in \mathcal{S}$が存在して，$B_i = X^{-1} \left( A_i \right)$となるが，$\mathcal{S}$は$\sigma$-加法族なので，$\bigcup_{i = 0}^\infty A_i \in \mathcal{S}$であり，

$$
\begin{align*}
\bigcup_{i = 0}^\infty B_i = \bigcup_{i = 0}^\infty X^{-1} \left( A_i \right) = X^{-1} \left( \bigcup_{i = 0}^\infty A_i \right) \in \sigma \left[ X \right]
\end{align*}
$$

を得る。

以上のことから，$\sigma \left[ X \right]$は$\sigma$-加法族である。また，$X$を可測写像にするような$\Omega$上の$\sigma$-加法族は全て$\sigma \left[ X \right]$を含むため，$\sigma \left[ X \right]$は$X$が可測写像となる$\Omega$上の最小の$\sigma$-加法族である。
:::

:::lem
$\Omega$を集合とし，$\left( S, \mathcal{S} \right)$を可測空間とする。$\Omega$上の$S$-値写像の族$\Set{ X_\lambda : \Omega \to S | \lambda \in \Lambda }$が可測になるような最小の$\sigma$-加法族は

$$
\begin{align*}
\sigma \left[ X_\lambda | \lambda \in \Lambda \right] = \sigma \left[ \bigcup_{\lambda \in \Lambda} \sigma \left[ X \right] \right]
\end{align*}
$$

である。
:::

:::proof
$\sigma$-加法族$\mathcal{F}$のもとで$\Set{ X_\lambda : \Omega \to S | \lambda \in \Lambda }$が可測になるためには，$\sigma \left[ X_\lambda \right] \subset \mathcal{F}$が必要である。したがって，$\sigma \left[ \bigcup_{\lambda \in \Lambda} \sigma \left[ X \right] \right] \subset \mathcal{F}$となるため，$\sigma \left[ X_\lambda | \lambda \in \Lambda \right]$は$\Set{ X_\lambda : \Omega \to S | \lambda \in \Lambda }$が可測になるような最小の$\sigma$-加法族である。
:::

:::prop
$\left( \Omega, \mathcal{F}, P \right)$を確率空間とする。$\mathcal{C}, \mathcal{D} \subset \mathcal{F}$が次の条件(1)と(2)を満たすとする。

1. 任意の$C_1, C_2 \in \mathcal{C}$と$D_1, D_2 \in \mathcal{D}$に対して，
   $$
   \begin{align*}
   C_1 \cap C_2 \in \mathcal{C}, D_1 \cap D_2 \in \mathcal{D}
   \end{align*}
   $$
   となる。
2. 任意の$C \in \mathcal{C}$と$D \in \mathcal{D}$に対して$P \left( C \cap D \right) = P \left( C \right)P \left( D \right)$となる。

このとき，$\sigma \left[ \mathcal{C} \right]$と$\sigma \left[ \mathcal{D} \right]$は独立である。
:::

:::proof
まず，$\mathcal{C}$と$\mathcal{D}$は$\pi$-系である。また，任意の$C \in \mathcal{C}$に対して，

$$
 \begin{align*}
 \mathcal{H}_C = \Set{ D \in \mathcal{F} | P \left( C \cap D \right) = P \left( C \right) P \left( D \right) }
 \end{align*}
$$

とすると，$\mathcal{D} \subset \mathcal{H}_C$であり，$\mathcal{H}_C$は$\lambda$-系であるから，$\pi$-$\lambda$定理により$\sigma \left[ \mathcal{D} \right] \subset \mathcal{H}_C$が成り立つ。同様にして，任意の$D \in \mathcal{D}$に対して，

$$
 \begin{align*}
 \tilde{\mathcal{H}}_D = \Set{ C \in \mathcal{F} | P \left( C \cap D \right) = P \left( C \right) P \left( D \right) }
 \end{align*}
$$

とすれば，$\sigma \left[ \mathcal{C} \right] \subset \tilde{\mathcal{H}}_D$となる。したがって，任意の$C \in \sigma \left[ \mathcal{C} \right]$と$D \in \sigma \left[ \mathcal{D} \right]$に対して，$C \in \tilde{\mathcal{H}}_D$であり，$D \in \mathcal{H}_C$であるから，$P \left( C \cap D \right) = P \left( C \right)P \left( D \right)$を得る。
:::
