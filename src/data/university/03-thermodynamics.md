---
slug: 03-thermodynamics
title: 熱力學與統計力學
description: 熱力學四大定律、絕熱過程 PV^γ 推導、Carnot 循環與效率、Maxwell 關係式、配分函數與理想氣體狀態方程推導、量子統計比較（MB/FD/BE）。
order: 3
topics: [熱力學定律, 絕熱過程, Carnot循環, 熵, 自由能, 配分函數, 量子統計, 理想氣體]
---

## 前言

熱力學研究熱與功的宏觀轉換，統計力學則從微觀粒子運動推導宏觀行為——兩者相輔相成。本章從嚴格的微積分推導出發，深入熱力學的核心結構。

## 熱力學基本概念

### 系統分類

| 系統類型 | 能量交換 | 物質交換 | 範例 |
|:--------:|:--------:|:--------:|:----:|
| 孤立系統 | ✗ | ✗ | 隔熱密閉容器 |
| 封閉系統 | ✓ | ✗ | 有活塞的氣缸 |
| 開放系統 | ✓ | ✓ | 活細胞 |

### 狀態函數 vs 過程量（數學本質）

這是熱力學中最關鍵的數學區別：

- **狀態函數**（如 $U, S, F, G, H, P, V, T$）：其微小變化是**恰當微分 (Exact Differential)**。對狀態函數 $f$ 沿任意路徑的積分只取決於起終點：

$$
\oint df = 0 \quad\Longleftrightarrow\quad \int_A^B df = f(B) - f(A)
$$

數學上，$df = M\,dx + N\,dy$ 為恰當微分的充要條件是 $\partial M/\partial y = \partial N/\partial x$。

- **過程量**（如熱量 $\delta Q$、功 $\delta W$）：是**不恰當微分 (Inexact Differential)**。它們沿不同路徑的積分值不同，$\oint \delta Q \neq 0$。我們用 $\delta$ 而非 $d$ 來強調此差異。

**物理意義**：系統的內能 $U$ 是狀態函數（你只問「系統現在有多少內能」），但「系統吸收了多少熱量」取決於它如何從狀態 A 到 B——這就是 $\delta Q$ 不是恰當微分的原因。

## 熱力學四大定律

### 第零定律：熱平衡的傳遞性

若 A 與 B 熱平衡、B 與 C 熱平衡 ⇒ A 與 C 也熱平衡。這是溫度測量的基礎。

### 第一定律：能量守恆

$$
dU = \delta Q - \delta W
$$

對於可逆過程：$\delta W = PdV$，$\delta Q = TdS$，因此：
$$
dU = TdS - PdV
$$

### 第一定律在各類過程中的應用

| 過程 | 條件 | 第一定律形式 | 特性 |
|:----:|:----:|:------------:|:----:|
| 等容 | $dV = 0$ | $dU = \delta Q_V = C_V dT$ | $C_V = (\partial U/\partial T)_V$ |
| 等壓 | $dP = 0$ | $dH = \delta Q_P = C_P dT$ | $H = U + PV$，$C_P = (\partial H/\partial T)_P$ |
| 等溫 | $dT = 0$ | $\delta Q = \delta W$（理想氣體 $\Delta U=0$）| $Q = W = nRT\ln(V_2/V_1)$ |
| 絕熱 | $\delta Q = 0$ | $dU = -\delta W$ | $PV^\gamma = \text{const}$（見下方推導）|

#### 絕熱過程的微積分推導

對於理想氣體的**可逆絕熱過程**，$\delta Q = 0$，因此 $dU = -\delta W = -PdV$。

由理想氣體 $U = C_V T$ 及 $PV = nRT$：
$$
C_V dT = -PdV = -\frac{nRT}{V}dV
$$

分離變數：
$$
\frac{C_V}{T}dT = -\frac{nR}{V}dV
$$

定義 $\gamma \equiv C_P/C_V$，利用 $C_P - C_V = nR$：
$$
\frac{dT}{T} = -\frac{nR}{C_V}\frac{dV}{V} = -\frac{C_P - C_V}{C_V}\frac{dV}{V} = -(\gamma - 1)\frac{dV}{V}
$$

兩邊積分：
$$
\ln T = -(\gamma - 1)\ln V + \text{const} \quad\Rightarrow\quad TV^{\gamma-1} = \text{const}
$$

代入理想氣體狀態方程 $T = PV/nR$，得到更常見的形式：
$$
PV^\gamma = \text{const}, \quad \gamma = \frac{C_P}{C_V}
$$

對於單原子理想氣體，$C_V = \frac32R$，$C_P = \frac52R$，故 $\gamma = \frac53$。

### 第二定律：熵增原理

**Kelvin-Planck 陳述**：不可能從單一熱源吸熱完全轉化為功而不產生其他影響。
**Clausius 陳述**：熱不能自發從低溫物體傳向高溫物體。

**熵的宏觀定義**：
$$
dS \ge \frac{\delta Q}{T}
$$

- 可逆過程：$dS = \delta Q/T$
- 孤立系統：$\Delta S \ge 0$（這就是熵增原理）

### 第三定律：絕對零度不可達

當 $T \to 0$ K 時，完美晶體的熵 $S \to 0$。不可能通過有限步驟達到絕對零度。

## Carnot 循環（卡諾循環）

Carnot 循環由四個可逆過程組成，是熱力學第二定律的核心模型。

### 四段過程

| 步驟 | 過程 | 條件 | 特徵 |
|:----:|:----:|:----:|:----:|
| 1 → 2 | 等溫膨脹 | $T = T_H$ | 從高溫熱庫吸熱 $Q_H$ |
| 2 → 3 | 絕熱膨脹 | $\delta Q = 0$ | 溫度降至 $T_L$，對外做功 |
| 3 → 4 | 等溫壓縮 | $T = T_L$ | 向低溫熱庫放熱 $Q_L$ |
| 4 → 1 | 絕熱壓縮 | $\delta Q = 0$ | 溫度回升至 $T_H$，外界對系統做功 |

### 效率推導

**步驟 1→2（等溫膨脹）**：
$$
\Delta U = 0 \quad\Rightarrow\quad Q_H = W_{12} = \int_{V_1}^{V_2} PdV = nRT_H\ln\frac{V_2}{V_1}
$$

**步驟 2→3（絕熱膨脹）**：
$$
T_H V_2^{\gamma-1} = T_L V_3^{\gamma-1} \quad\Rightarrow\quad \frac{V_3}{V_2} = \left(\frac{T_H}{T_L}\right)^{1/(\gamma-1)}
$$

**步驟 3→4（等溫壓縮）**：
$$
Q_L = -W_{34} = nRT_L\ln\frac{V_3}{V_4}
$$

**步驟 4→1（絕熱壓縮）**：
$$
T_L V_4^{\gamma-1} = T_H V_1^{\gamma-1} \quad\Rightarrow\quad \frac{V_4}{V_1} = \left(\frac{T_H}{T_L}\right)^{1/(\gamma-1)}
$$

由以上關係可得 $V_2/V_1 = V_3/V_4$，因此：
$$
\frac{Q_H}{T_H} = \frac{Q_L}{T_L} \quad\Rightarrow\quad Q_L = Q_H\frac{T_L}{T_H}
$$

**Carnot 效率**：
$$
\eta \equiv \frac{W_{\text{net}}}{Q_H} = \frac{Q_H - Q_L}{Q_H} = 1 - \frac{Q_L}{Q_H} = 1 - \frac{T_L}{T_H}
$$

> 💡 **意義**：Carnot 效率只取決於高溫熱庫與低溫熱庫的溫度，任何實際熱機的效率都不可能超過 Carnot 效率。這是熱力學第二定律對熱機效率的**基本限制**。

## 熱力學勢與 Maxwell 關係式

### 四個勢函數

| 勢函數 | 定義 | 自然變量 | 微分形式 |
|:------:|:----:|:--------:|:--------:|
| 內能 $U$ | — | $S, V$ | $dU = TdS - PdV$ |
| 焓 $H$ | $U + PV$ | $S, P$ | $dH = TdS + VdP$ |
| Helmholtz 自由能 $F$ | $U - TS$ | $T, V$ | $dF = -SdT - PdV$ |
| Gibbs 自由能 $G$ | $H - TS$ | $T, P$ | $dG = -SdT + VdP$ |

### Maxwell 關係式

由勢函數的二階偏導對稱性 $\partial^2 f/(\partial x\partial y) = \partial^2 f/(\partial y\partial x)$ 導出：

$$
\left(\frac{\partial T}{\partial V}\right)_S = -\left(\frac{\partial P}{\partial S}\right)_V, \quad
\left(\frac{\partial T}{\partial P}\right)_S = \left(\frac{\partial V}{\partial S}\right)_P
$$

$$
\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial P}{\partial T}\right)_V, \quad
\left(\frac{\partial S}{\partial P}\right)_T = -\left(\frac{\partial V}{\partial T}\right)_P
$$

**應用範例**：利用第四個關係式，可從容易測量的 $(\partial P/\partial T)_V$ 得到難以直接測量的 $(\partial S/\partial V)_T$。

## 統計力學基礎

### 三大系綜

| 系綜 | 固定參數 | 對應熱力學勢 |
|:----:|:--------:|:-----------:|
| 微正則 (Microcanonical) | $E, V, N$ | $S(E,V,N) = k_B\ln\Omega$ |
| 正則 (Canonical) | $T, V, N$ | $F(T,V,N) = -k_BT\ln Z$ |
| 巨正則 (Grand Canonical) | $T, V, \mu$ | $\Omega(T,V,\mu) = -k_BT\ln\Xi$ |

### 配分函數

正則系綜的配分函數是統計力學的核心：
$$
Z = \sum_i e^{-\beta E_i}, \quad \beta = \frac{1}{k_B T}
$$

由 $Z$ 可導出所有熱力學量：
$$
F = -k_B T \ln Z, \quad U = -\frac{\partial \ln Z}{\partial \beta} = k_B T^2 \frac{\partial \ln Z}{\partial T}
$$
$$
S = -\left(\frac{\partial F}{\partial T}\right)_{V,N} = k_B(\ln Z + \beta U), \quad P = -\left(\frac{\partial F}{\partial V}\right)_{T,N}
$$

### 單原子理想氣體配分函數（具體計算）

對於 $N$ 個不可區分的單原子理想氣體分子，配分函數可分解為平動自由度的貢獻：

**單分子配分函數**：
$$
z = z_{\text{trans}} = \int e^{-\beta p^2/2m} \frac{d^3x\,d^3p}{h^3} = V\left(\frac{2\pi m k_B T}{h^2}\right)^{3/2}
$$

**$N$ 分子配分函數**（不可區分性修正 $\div N!$）：
$$
Z = \frac{z^N}{N!} = \frac{1}{N!}\left[V\left(\frac{2\pi m k_B T}{h^2}\right)^{3/2}\right]^N
$$

利用 Stirling 近似 $\ln N! \approx N\ln N - N$：
$$
\ln Z = N\ln V + \frac{3N}{2}\ln\left(\frac{2\pi m k_B T}{h^2}\right) - (N\ln N - N)
$$

**求壓力**：
$$
P = k_B T\left(\frac{\partial\ln Z}{\partial V}\right)_T = k_B T \cdot \frac{N}{V} = \frac{N k_B T}{V}
$$

因此得到 **理想氣體狀態方程** $PV = Nk_B T$！這就是統計力學的威力——從微觀粒子的配分函數推導出宏觀熱力學定律。

**求內能**：
$$
U = -\frac{\partial\ln Z}{\partial\beta} = \frac{3N}{2}k_B T = \frac32 nRT
$$

這與能量均分定理一致（單原子分子 3 個平動自由度，每個貢獻 $\frac12 k_B T$）。

### Maxwell-Boltzmann 分布

理想氣體分子速率分布：
$$
f(v)dv = 4\pi\left(\frac{m}{2\pi k_B T}\right)^{3/2} v^2 e^{-mv^2/2k_B T} dv
$$

特徵速率：
- 最概然速率：$v_p = \sqrt{2k_B T/m}$
- 平均速率：$\bar{v} = \sqrt{8k_B T/\pi m}$
- 方均根速率：$v_{\text{rms}} = \sqrt{3k_B T/m}$

## 量子統計（Quantum Statistics）

在低溫或高密度條件下，古典 Maxwell-Boltzmann 統計不再適用，必須考慮粒子的量子性質。

### 三大分佈比較

| 性質 | Maxwell-Boltzmann (MB) | Fermi-Dirac (FD) | Bose-Einstein (BE) |
|:----:|:----------------------:|:-----------------:|:-------------------:|
| **適用粒子** | 可區分的古典粒子 | 費米子（半整數自旋） | 玻色子（整數自旋） |
| **例子** | 理想氣體（高溫極限） | 電子、質子、中子 | 光子、聲子、$^4$He |
| **Pauli 原理** | 不適用 | ✓ 遵守（一個量子態最多一個粒子）| ✗ 不遵守（可多個粒子同態）|
| **分佈函數** | $f_{\text{MB}} = e^{-(\varepsilon-\mu)/k_B T}$ | $f_{\text{FD}} = \dfrac{1}{e^{(\varepsilon-\mu)/k_B T} + 1}$ | $f_{\text{BE}} = \dfrac{1}{e^{(\varepsilon-\mu)/k_B T} - 1}$ |
| **低溫行為** | 無限制 | 費米能階 $E_F$ 以下全填滿 | 所有粒子凝聚到基態（BEC）|

### 退化極限

- **FD 退化**（$T \to 0$）：$f_{\text{FD}} \to \Theta(\mu - \varepsilon)$，即階梯函數。所有 $\varepsilon < \mu$ 的態被佔滿，$\varepsilon > \mu$ 的態全空。這就是**電子簡併壓力**（支撐白矮星的力量）。
- **BE 退化**（$T \to T_c$）：宏觀數量的粒子佔據單一量子基態——這就是**玻色-愛因斯坦凝聚 (BEC)**。

### 古典極限的統一

當 $\lambda_{\text{dB}} = h/\sqrt{2\pi mk_B T} \ll$ 粒子平均間距時（即高溫低密度），量子效應可以忽略：

$$
e^{(\varepsilon-\mu)/k_B T} \gg 1 \quad\Rightarrow\quad f_{\text{FD}} \approx f_{\text{BE}} \approx f_{\text{MB}}
$$

此時三種分布趨於一致，回到古典統計力學。

## 相變理論

### 一級相變

體積和熵不連續變化（冰融化、水沸騰）。

**Clausius-Clapeyron 方程**：
$$
\frac{dP}{dT} = \frac{L}{T\Delta V}
$$

其中 $L$ 為潛熱，$\Delta V$ 為體積變化。

### 二級相變

比熱不連續，但體積連續（超導、超流、BEC）。

**Ehrenfest 分類**：二級相變中，自由能一階導連續、二階導不連續。

## 例題

**例題 1**：1 mol 單原子理想氣體從 $(P_1, V_1, T_1)$ 可逆絕熱膨脹到 $V_2 = 2V_1$。求 $T_2$、$P_2$ 和對外做的功。

**解**：
$\gamma = C_P/C_V = (5R/2)/(3R/2) = 5/3$

由 $TV^{\gamma-1} = \text{const}$：$T_1 V_1^{2/3} = T_2 (2V_1)^{2/3}$
$T_2 = T_1 / 2^{2/3} \approx 0.63 T_1$

由 $PV^\gamma = \text{const}$：$P_1 V_1^{5/3} = P_2 (2V_1)^{5/3}$
$P_2 = P_1 / 2^{5/3} \approx 0.315 P_1$

$W = -\Delta U = C_V(T_1 - T_2) = \frac32 R(T_1 - T_2)$

**例題 2**：Carnot 熱機的高溫熱庫 $T_H = 500$ K，低溫熱庫 $T_L = 300$ K。求效率；若此熱機從高溫熱庫吸熱 1000 J，求做功和排熱量。

**解**：
$\eta = 1 - T_L/T_H = 1 - 300/500 = 0.4 = 40\%$
$W = \eta Q_H = 0.4 \times 1000 = 400$ J
$Q_L = Q_H - W = 600$ J

## 重點整理

- 第一定律 $dU = \delta Q - \delta W$，狀態函數 vs 過程量（恰當 vs 不恰當微分）
- 絕熱過程 $PV^\gamma = \text{const}$，$\gamma = C_P/C_V$
- Carnot 效率 $\eta = 1 - T_L/T_H$——所有熱機效率的上限
- 配分函數 $Z$ 包含系統的所有熱力學信息
- 從理想氣體配分函數可推導 $PV = Nk_B T$ 和 $U = \frac32 Nk_B T$
- MB（古典）/ FD（費米子）/ BE（玻色子）在低溫下行為截然不同
- 高溫極限下三者統一回到古典統計

## 延伸閱讀

- Pathria, *Statistical Mechanics*
- Kittel & Kroemer, *Thermal Physics*
- [熱力學 - 維基百科](https://zh.wikipedia.org/zh-tw/热力学)
- [卡諾循環](https://zh.wikipedia.org/zh-tw/卡诺循环)
- [量子統計](https://zh.wikipedia.org/zh-tw/量子統計)
