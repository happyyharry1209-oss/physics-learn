---
slug: 07-solid-state
title: 固態物理
description: 晶體結構與倒晶格、Bloch 定理、能帶理論與有效質量、半導體摻雜與 pn 接面、超導體 BCS 理論與磁性分類。
order: 7
topics: [晶體結構, 倒晶格, 能帶理論, 有效質量, 半導體, pn接面, 超導體, BCS理論, 磁性材料]
---

## 前言

固態物理研究固體材料中大量原子集體行為的物理性質。它是現代電子科技——從電晶體到 LED 到太陽能電池——的理論基礎。

## 晶體結構與倒晶格

### 晶格 + 基元 = 晶體

- **晶格**：空間中週期排列的點陣
- **基元**：附著在每個晶格點上的原子群
- **晶體** = 晶格 + 基元

### 倒晶格向量

給定正晶格基矢 $\mathbf{a}_1, \mathbf{a}_2, \mathbf{a}_3$，倒晶格基矢為：

$$
\mathbf{b}_1 = 2\pi\frac{\mathbf{a}_2 \times \mathbf{a}_3}{\mathbf{a}_1 \cdot (\mathbf{a}_2 \times \mathbf{a}_3)},\quad \mathbf{b}_2 = 2\pi\frac{\mathbf{a}_3 \times \mathbf{a}_1}{\mathbf{a}_1 \cdot (\mathbf{a}_2 \times \mathbf{a}_3)},\quad \mathbf{b}_3 = 2\pi\frac{\mathbf{a}_1 \times \mathbf{a}_2}{\mathbf{a}_1 \cdot (\mathbf{a}_2 \times \mathbf{a}_3)}
$$

滿足 $\mathbf{b}_i \cdot \mathbf{a}_j = 2\pi\delta_{ij}$，且任意倒晶格向量 $\mathbf{G} = h\mathbf{b}_1 + k\mathbf{b}_2 + l\mathbf{b}_3$ 滿足：

$$
\mathbf{G} \cdot \mathbf{R} = 2\pi n \quad (\mathbf{R}\text{ 為正晶格向量})
$$

**第一布里淵區 (1st Brillouin Zone)**：倒晶格中的 Wigner-Seitz 原胞——從原點到所有鄰近倒晶格點連線的中垂面所圍成的區域。

### X 射線繞射 (XRD)

**Bragg 定律**：
$$
2d\sin\theta = n\lambda
$$

**Laue 方程**（動量守恆條件）：
$$
\Delta\mathbf{k} = \mathbf{k}' - \mathbf{k} = \mathbf{G}
$$

## 能帶理論

### Bloch 定理

在週期性勢能 $V(\mathbf{r}) = V(\mathbf{r} + \mathbf{R})$ 中，電子波函數須滿足：

$$
\psi_{\mathbf{k}}(\mathbf{r}) = u_{\mathbf{k}}(\mathbf{r}) e^{i\mathbf{k}\cdot\mathbf{r}}
$$

其中 $u_{\mathbf{k}}(\mathbf{r})$ 具有與晶格相同的週期性。

### 近自由電子模型

在弱週期勢能微擾下，自由電子拋物線 $E = \hbar^2 k^2/2m$ 在布里淵區邊界 $k = \pm\pi/a$ 處打開能隙 $E_g$。

### 有效質量 (Effective Mass)

電子在晶格中運動的行為可由有效質量描述：

$$
m^* = \hbar^2 \left(\frac{d^2E}{dk^2}\right)^{-1}
$$

$m^*$ 可正可負（電洞即對應負有效質量）。

### 導體/半導體/絕緣體

| 類型 | 能隙 $E_g$ | 填滿情況 | 導電性 |
|:----:|:---------:|:--------:|:------:|
| 導體 | $0$（重疊） | 價帶部分填滿 | 高 |
| 半導體 | $0.1 \sim 3$ eV | 價帶填滿 | 可調控 |
| 絕緣體 | $> 3$ eV | 價帶填滿 | 極低 |

## 半導體物理

### 本質載子濃度

$$
n_i = \sqrt{N_c N_v}\, e^{-E_g/(2k_B T)}
$$

$n_i$ 隨溫度上升而急遽增加。

### 摻雜

- **n 型**：施體雜質（如 Si 摻 P），多出自由電子
- **p 型**：受體雜質（如 Si 摻 B），多出電洞

### pn 接面

內建電位：
$$
V_{bi} = \frac{k_B T}{e}\ln\left(\frac{N_a N_d}{n_i^2}\right)
$$

Shockley 二極體方程：
$$
I = I_0\left(e^{eV/(k_B T)} - 1\right)
$$

**應用**：二極體（整流）、太陽能電池（光伏效應）、LED（電致發光）。

## 超導體

### 基本性質

- **零電阻**：$T < T_c$ 時 $R = 0$
- **邁斯納效應**：完全抗磁性，磁場被排出超導體

### BCS 理論

電子通過晶格振動（聲子）形成**庫珀對 (Cooper Pairs)**。庫珀對作為玻色子可在 $T < T_c$ 時凝聚到基態，形成超導態。

### 超導體類型

| 類型 | 特徵 | 例子 |
|:----:|:----:|:----:|
| 第一類 | 單一臨界場 | Hg, Pb |
| 第二類 | 兩個臨界場，混合態 | NbTi, YBCO |

**約瑟夫森效應 (Josephson Effect)**：超導電流可穿過薄絕緣層（S-I-S 接面），應用於 SQUID 磁量計。

## 磁性材料

| 類型 | 原子磁矩排列 | 例子 | 特性 |
|:----:|:-----------:|:----:|:----:|
| 鐵磁性 | 平行排列 | Fe, Ni, Co | 自發磁化、磁滯 |
| 反鐵磁性 | 反平行（等大）| MnO | 淨磁矩為零 |
| 亞鐵磁性 | 反平行（不等大）| Fe₃O₄ | 淨磁矩不為零 |
| 順磁性 | 無序排列 | Al | 弱磁化 |
| 反磁性 | 產生反向磁矩 | Cu, 水 | 負磁化率 |

**居里-外斯定律**：$\chi = C/(T - T_c)$。

## 例題

**例題 1**：矽能隙 $E_g = 1.12$ eV，$T = 300$ K，求 $n_i$ 近似值。

**解**：
$n_i \propto \exp(-E_g/2k_B T) = \exp(-1.12/0.052) = e^{-21.5} \approx 4.6\times10^{-10}$（歸一化）

**例題 2**：Bragg 繞射 $d = 0.2$ nm，$\lambda = 0.1$ nm，求 $n=1$ 時的 $\theta$。

**解**：
$\sin\theta = \lambda/2d = 0.1/(2\times0.2) = 0.25$，$\theta \approx 14.5^\circ$

## 隨堂測驗

1. Bragg 繞射條件 $2d\sin\theta = n\lambda$ 中，$d$ 代表？
   - (A) 晶格常數
   - (B) 晶面間距 ✓
   - (C) 原子半徑
   - (D) 晶體厚度

2. 有效質量 $m^* = \hbar^2/(d^2E/dk^2)$，電洞對應？
   - (A) $m^* > 0$
   - (B) $m^* < 0$ ✓
   - (C) $m^* = 0$
   - (D) $m^* = m_e$

3. pn 接面內建電位 $V_{bi}$ 的來源是？
   - (A) 外加電壓
   - (B) 擴散電勢 ✓
   - (C) 磁場
   - (D) 光照

4. 超導體邁斯納效應是指？
   - (A) $R=0$
   - (B) 完全抗磁性 ✓
   - (C) 磁通量子化
   - (D) 約瑟夫森效應

5. BCS 理論中超導電性起源於？
   - (A) 電子-電子排斥
   - (B) 庫珀對（聲子中介）✓
   - (C) 磁疇
   - (D) 晶格缺陷

## 重點整理

- 倒晶格 $\mathbf{G}\cdot\mathbf{R}=2\pi n$，第一布里淵區
- Bragg 定律 $2d\sin\theta=n\lambda$，Laue 方程 $\Delta\mathbf{k}=\mathbf{G}$
- Bloch 定理 $\psi_{\mathbf{k}}(\mathbf{r}) = u_{\mathbf{k}}(\mathbf{r})e^{i\mathbf{k}\cdot\mathbf{r}}$
- 有效質量 $m^* = \hbar^2/(d^2E/dk^2)$
- pn 接面 $V_{bi} = (k_BT/e)\ln(N_aN_d/n_i^2)$
- 超導體：零電阻 + 邁斯納效應，BCS 庫珀對
- 五種磁性：順/反/鐵/反鐵/亞鐵磁

## 延伸閱讀

- Kittel, *Introduction to Solid State Physics*
- [能帶理論 - 維基百科](https://zh.wikipedia.org/zh-tw/能带理论)
- [BCS 理論](https://zh.wikipedia.org/zh-tw/BCS理论)
