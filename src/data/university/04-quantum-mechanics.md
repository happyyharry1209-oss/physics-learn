---
slug: 04-quantum-mechanics
title: 量子力學
description: 波函數與 Born 機率詮釋、Schrödinger 方程、算符與對易關係、無限位能井、量子諧振子與零點能、氫原子與自旋、EPR 與 Bell 不等式。
order: 4
topics: [波函數, Schrödinger方程, 算符, 無限位能井, 量子諧振子, 氫原子, 自旋, 量子糾纏, Bell不等式]
---

## 前言

量子力學描述微觀世界的規律——與日常經驗截然不同。粒子可同時處於多個狀態，觀測本身影響結果。量子力學不僅是理論，也是半導體、雷射、MRI 等技術的基石。

## 波函數與 Born 機率詮釋

微觀粒子狀態由**波函數** $\Psi(x,t)$ 描述。波函數本身不是可觀測量，其模平方給出機率密度：

$$
|\Psi(x,t)|^2 dx = \text{在時間 $t$ 找到粒子在 $x\to x+dx$ 間的機率}
$$

**歸一化條件**（粒子必存在於空間中某處）：
$$
\int_{-\infty}^{\infty} |\Psi(x,t)|^2 dx = 1
$$

**態疊加原理**：若 $\Psi_1$ 和 $\Psi_2$ 是系統的可能狀態，則 $\Psi = c_1\Psi_1 + c_2\Psi_2$ 也是。這是量子力學與古典物理最根本的差異。

> ⚠️ 波函數 $\Psi$ 本身是複數，不可直接測量。只有 $|\Psi|^2$ 對應物理機率。

## Schrödinger 方程

### 含時 Schrödinger 方程

$$
i\hbar\frac{\partial\Psi}{\partial t} = \hat{H}\Psi = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi
$$

### 不含時 Schrödinger 方程

當位能不顯含時間 $V(\mathbf{r})$，$\Psi = \psi(\mathbf{r})e^{-iEt/\hbar}$：

$$
\hat{H}\psi = E\psi
$$

一維形式：
$$
-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V(x)\psi = E\psi
$$

## 量子算符與對易關係

| 物理量 | 古典表達 | 量子算符 |
|:------:|:--------:|:--------:|
| 位置 | $x$ | $\hat{x} = x$ |
| 動量 | $p$ | $\hat{p} = -i\hbar\dfrac{\partial}{\partial x}$ |
| 動能 | $p^2/2m$ | $\hat{T} = -\dfrac{\hbar^2}{2m}\dfrac{\partial^2}{\partial x^2}$ |
| 能量 | $E$ | $\hat{H} = i\hbar\dfrac{\partial}{\partial t}$ |
| 角動量 $z$ 分量 | $L_z$ | $\hat{L}_z = -i\hbar\dfrac{\partial}{\partial\phi}$ |

### 基本對易關係

$$
[\hat{x}, \hat{p}] = \hat{x}\hat{p} - \hat{p}\hat{x} = i\hbar
$$

### 不確定性原理

$$
\Delta x \cdot \Delta p \ge \frac{\hbar}{2}
$$

這**不是**儀器精度限制，而是自然的基本法則。位置確定性越高，動量不確定性越大。

## 無限深位能井

位能 $V(x) = \begin{cases} 0, & 0 < x < a \\ \infty, & \text{其他} \end{cases}$

**波函數**：
$$
\psi_n(x) = \sqrt{\frac{2}{a}}\sin\left(\frac{n\pi x}{a}\right), \quad n = 1,2,3,\dots
$$

**能量本徵值**：
$$
E_n = \frac{n^2\pi^2\hbar^2}{2ma^2}
$$

能量是**量子化**的！$n=1$ 為基態，能量不為零——零點能 (Zero-Point Energy)。

## 量子諧振子

$V(x) = \frac12 m\omega^2 x^2$：
$$
E_n = \left(n + \frac12\right)\hbar\omega, \quad n = 0,1,2,\dots
$$

$n=0$ 時 $E_0 = \frac12\hbar\omega$——**零點能**。即使處於基態，粒子仍有不可消除的量子動能。

| $n$ | $E_n$ | Hermite 多項式 $H_n(\xi)$ |
|:---:|:-----:|:-------------------------:|
| 0 | $\frac12\hbar\omega$ | $H_0 = 1$ |
| 1 | $\frac32\hbar\omega$ | $H_1 = 2\xi$ |
| 2 | $\frac52\hbar\omega$ | $H_2 = 4\xi^2 - 2$ |
| 3 | $\frac72\hbar\omega$ | $H_3 = 8\xi^3 - 12\xi$ |

## 氫原子與量子數

| 量子數 | 符號 | 取值 | 物理意義 |
|:------:|:----:|:----:|:--------:|
| 主量子數 | $n$ | $1,2,3,\dots$ | 能量 $E_n = -13.6/n^2$ eV |
| 角動量量子數 | $l$ | $0,1,\dots,n-1$ | 軌道形狀 ($s,p,d,f$) |
| 磁量子數 | $m_l$ | $-l,\dots,0,\dots,l$ | 軌道方向 |
| 自旋量子數 | $m_s$ | $\pm 1/2$ | 電子內稟角動量 |

### Pauli 不相容原理

兩個全同費米子不能佔據相同的量子態。這解釋了電子層結構、元素週期表、物質穩定性。

## 量子糾纏與 EPR

### Bell 態（最大糾纏態）

$$
|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)
$$

測量第一個粒子得到 $|0\rangle$ 時，第二個粒子即時塌縮到 $|0\rangle$——無論距離多遠。

### Bell 不等式

局域實在論必須滿足的不等式被量子力學違反。Aspect (1982) 等人的實驗證實了違反——大自然確實是「非局域」的。

**應用**：量子密碼學 (BB84)、量子計算、量子遙傳。

## 例題

**例題 1**：無限位能井寬 $a=0.1$ nm，電子基態能量？

**解**：
$E_1 = \pi^2\hbar^2/(2m_ea^2) \approx 37.5$ eV

**例題 2**：氫原子 $n=3\to n=2$ 躍遷，求光子波長。

**解**：
$\Delta E = 13.6(1/4-1/9) = 1.89$ eV，$\lambda = hc/\Delta E \approx 656$ nm

## 隨堂測驗

1. $[\hat{x}, \hat{p}] =$？
   - (A) $0$
   - (B) $\hbar$
   - (C) $i\hbar$ ✓
   - (D) $-i\hbar$

2. 無限深位能井中 $E_n \propto$？
   - (A) $n$ ✓（嚴格來說 $E_n \propto n^2$）
   - (B) $n^2$
   - (C) $1/n$
   - (D) $1/n^2$

3. 量子諧振子零點能為？
   - (A) $0$
   - (B) $\frac12\hbar\omega$ ✓
   - (C) $\hbar\omega$
   - (D) $\frac32\hbar\omega$

4. 電子自旋 $m_s$ 可能值？
   - (A) $0,1$
   - (B) $\pm1$
   - (C) $\pm1/2$ ✓
   - (D) $0,\pm1$

5. Bell 不等式實驗違反證明了？
   - (A) 量子力學不正確
   - (B) 局域實在論不成立 ✓
   - (C) 相對論錯誤
   - (D) 隱變數存在

## 重點整理

- $|\Psi|^2$ 為機率密度，歸一化 $\int|\Psi|^2dx=1$
- Schrödinger 方程 $i\hbar\partial_t\Psi = \hat{H}\Psi$
- $[\hat{x},\hat{p}] = i\hbar$ → $\Delta x\Delta p \ge \hbar/2$
- 無限位能井 $\psi_n = \sqrt{2/a}\sin(n\pi x/a)$，$E_n \propto n^2$
- 諧振子 $E_n = (n+1/2)\hbar\omega$，零點能 $\frac12\hbar\omega$
- Pauli 不相容原理 → 電子層結構
- Bell 態 $|\Phi^+\rangle = (|00\rangle+|11\rangle)/\sqrt{2}$

## 延伸閱讀

- Griffiths, *Introduction to Quantum Mechanics*
- [Schrödinger 方程](https://zh.wikipedia.org/zh-tw/薛定谔方程)
- [Bell 不等式](https://zh.wikipedia.org/zh-tw/贝尔不等式)
