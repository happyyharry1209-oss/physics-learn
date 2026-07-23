---
slug: 10-modern-physics
title: 近代物理
description: 相對論質能方程全貌、Bohr 模型完整推導、不確定性原理、Schrödinger 方程、放射性衰變 ODE、Fe-56 結合能頂峰。
order: 10
topics: [狹義相對論, 波耳模型, 不確定性原理, 薛丁格方程, 放射性衰變, 質能虧損, 結合能]
---

## 前言

二十世紀初，物理學發生了兩次革命：相對論和量子力學。它們徹底改變了人類對時空、物質和能量的理解。

## 狹義相對論

### Lorentz 變換
$x' = \gamma(x-vt)$, $t' = \gamma(t-vx/c^2)$, $\gamma = 1/\sqrt{1-v^2/c^2}$。

### 相對論動量與能量
$p = \gamma m_0 v$, $E = \gamma m_0 c^2$, $E_0 = m_0 c^2$。

**能量-動量關係**（質能方程全貌）：
$$
E^2 = (pc)^2 + (m_0 c^2)^2
$$

- 靜止粒子 ($p=0$)：$E = m_0 c^2$
- 光子 ($m_0=0$)：$E = pc = hf$

## Bohr 氫原子模型

### 軌道半徑與能階推導

庫侖力 $= F_c$：$\frac{ke^2}{r^2} = \frac{mv^2}{r}$。角動量量子化：$mvr = n\hbar$。

聯立得：
$$
r_n = \frac{n^2\hbar^2}{mke^2} = n^2 a_0,\quad a_0 \approx 0.529\ \text{Å}
$$
$$
E_n = -\frac{ke^2}{2a_0}\cdot\frac{1}{n^2} = -\frac{13.6}{n^2}\ \text{eV}
$$

### 里德伯公式
$\frac{1}{\lambda} = R_H(1/n_f^2 - 1/n_i^2)$, $R_H \approx 1.097\times10^7$ m⁻¹。

## 不確定性原理 (Heisenberg)

位置與動量無法同時被精確測量：
$$
\Delta x \cdot \Delta p \ge \frac{\hbar}{2}
$$

**並非儀器限制，而是自然法則**。位置確定性越高，動量不確定性越大。

**能量-時間不確定性**：
$$
\Delta E \cdot \Delta t \ge \frac{\hbar}{2}
$$

## Schrödinger 方程

### 一維不含時 Schrödinger 方程

量子力學的基本方程，描述微觀粒子的波函數 $\psi(x)$：

$$
-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V(x)\psi = E\psi
$$

- $\hbar = h/2\pi$：約化 Planck 常數
- $V(x)$：位能函數
- $E$：能量本徵值
- $|\psi(x)|^2$：粒子在 $x$ 處出現的機率密度

**無限位能井**（$V=0$ 當 $0<x<a$，$V=\infty$ 其他）：
$$
\psi_n(x) = \sqrt{\frac{2}{a}}\sin\left(\frac{n\pi x}{a}\right),\quad E_n = \frac{n^2\pi^2\hbar^2}{2ma^2}
$$

## 放射性衰變

**微分方程**：$\frac{dN}{dt} = -\lambda_d N \Rightarrow N(t) = N_0 e^{-\lambda_d t}$
**半衰期**：$\lambda_d = \ln 2/T_{1/2} \approx 0.693/T_{1/2}$

## 質能虧損與結合能

### 質量虧損
$\Delta m = [Zm_p + (A-Z)m_n] - m_{\text{nucleus}}$

### 結合能
$E_b = \Delta m \cdot c^2$，$1\ \text{u} \approx 931.5\ \text{MeV}$

### ${}^{56}\text{Fe}$ 結合能頂峰

**平均核子結合能** $E_b/A$ 隨質量數 $A$ 的變化曲線：
- 在 $^{56}\text{Fe}$ 附近達到**最大值**（約 8.8 MeV/核子）
- 鐵之前的元素可通過核融合釋能（恆星能源）
- 鐵之後的元素可通過核分裂釋能（核電廠）

**意義**：鐵是宇宙中最穩定的原子核，所有恆星最終都會在核心累積鐵元素。

## 例題

**例題 1**：光子波長 $\lambda = 500$ nm，求能量。

**解**：
$E = hc/\lambda = 1240/500 = 2.48$ eV
$p = E/c = 2.48\ \text{eV}/c$

**例題 2**：電子在 $a = 0.1$ nm 的無限位能井中，求基態能量。

**解**：
$E_1 = \pi^2\hbar^2/(2m_ea^2) \approx 37.5$ eV

## 隨堂測驗

1. 不確定性原理 $\Delta x \cdot \Delta p \ge \hbar/2$ 中的 $\hbar =$？
   - (A) $h$
   - (B) $h/2\pi$ ✓
   - (C) $h/2$
   - (D) $2\pi h$

2. 一維不含時 Schrödinger 方程的形式為？
   - (A) $-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V\psi = E\psi$ ✓
   - (B) $i\hbar\frac{\partial\psi}{\partial t} = H\psi$
   - (C) $\nabla^2\psi = 0$
   - (D) $E = hf$

3. ${}^{56}\text{Fe}$ 的結合能曲線地位是？
   - (A) 最低點
   - (B) 最高點 ✓（最穩定）
   - (C) 直線上升段
   - (D) 無特殊意義

4. 光子能量 $E = hf$ 中，若頻率變為 2 倍，能量變為？
   - (A) 不變
   - (B) 2 倍 ✓
   - (C) 4 倍
   - (D) $1/2$ 倍

5. 無限位能井中 $E_n \propto$？
   - (A) $n$
   - (B) $n^2$ ✓
   - (C) $1/n$
   - (D) $1/n^2$

## 重點整理

- $E^2 = (pc)^2 + (m_0c^2)^2$（相對論質能方程全貌）
- $\Delta x \cdot \Delta p \ge \hbar/2$（不確定性原理）
- $-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V\psi = E\psi$（Schrödinger 方程）
- $\frac{dN}{dt} = -\lambda_d N$，$\lambda_d = \ln 2/T_{1/2}$
- ${}^{56}\text{Fe}$ 平均結合能最大（8.8 MeV/核子）

## 延伸閱讀

- [Schrödinger 方程](https://zh.wikipedia.org/zh-tw/薛定谔方程)
- [不確定性原理](https://zh.wikipedia.org/zh-tw/不确定性原理)
- [結合能](https://zh.wikipedia.org/zh-tw/结合能)
- [Fe-56](https://zh.wikipedia.org/zh-tw/铁-56)
