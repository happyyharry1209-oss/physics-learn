---
slug: 07-circuits
title: 電路分析
description: KVL/KCL 系統分析法、戴維寧等效電路、RC 電路 ODE 推導、惠斯通電橋、時間常數與指數響應。
order: 7
topics: [電阻, Kirchhoff定律, 戴維寧定理, RC電路, 時間常數, 惠斯通電橋]
---

## 前言

前面學了基本的串並聯，現在要學會分析更複雜的電路——從 Kirchhoff 定律到戴維寧等效，從 RC 的指數響應到電橋量測。

## 等效電阻

**串聯**：$R_{eq} = R_1 + R_2 + R_3 + \cdots$（電流相同）
**並聯**：$\dfrac{1}{R_{eq}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dfrac{1}{R_3} + \cdots$（電壓相同）

> 兩電阻並聯：$R_{eq} = \dfrac{R_1 R_2}{R_1 + R_2}$（積和公式）

## Kirchhoff 定律系統分析法

### KCL（節點電流定律）

$$
\sum I_{\text{in}} = \sum I_{\text{out}}
$$

### KVL（迴路電壓定律）

沿封閉迴路，電位升降代數和為零：
$$
\sum \Delta V = 0
$$

**正負號規則**：
- 順著電流方向通過電阻：電位降 $-IR$
- 逆著電流方向通過電阻：電位升 $+IR$
- 從電池負極到正極（電流從正極流出）：電位升 $+\mathcal{E}$
- 從電池正極到負極：電位降 $-\mathcal{E}$

### 節點電壓法 (Nodal Analysis)

1. 選定參考節點（接地，$V=0$）
2. 對其他節點寫 KCL 方程（用節點電壓表示各支路電流）
3. 解聯立方程組

## 戴維寧等效電路 (Thevenin's Theorem)

任何線性雙端網路可簡化為一個等效電壓源 $V_{th}$ 串聯一個等效電阻 $R_{th}$：

**求解步驟**：
1. 移開負載電阻 $R_L$
2. $V_{th}$ = 開路時的端電壓
3. $R_{th}$ = 從端點看入的等效電阻（電壓源短路，電流源開路）

**應用**：快速計算不同負載 $R_L$ 下的電流 $I_L = V_{th}/(R_{th} + R_L)$。

## RC 電路的微積分推導

### 充電過程

由 KVL：$V_0 - IR - \frac{q}{C} = 0$，代入 $I = dq/dt$：

$$
R\frac{dq}{dt} + \frac{q}{C} = V_0
$$

分離變數法求解：
$$
\frac{dq}{V_0 C - q} = \frac{dt}{RC}
$$

兩邊積分：
$$
\int_0^q \frac{dq'}{V_0 C - q'} = \int_0^t \frac{dt'}{RC}
$$

$$
-\ln\left(\frac{V_0 C - q}{V_0 C}\right) = \frac{t}{RC}
$$

$$
q(t) = V_0 C\left(1 - e^{-t/RC}\right) = Q_0(1 - e^{-t/\tau})
$$

對時間微分得電流：
$$
I(t) = \frac{dq}{dt} = \frac{V_0}{R}e^{-t/RC}
$$

### 放電過程

$$
q(t) = Q_0 e^{-t/RC},\quad V_C(t) = V_0 e^{-t/RC},\quad I(t) = -\frac{V_0}{R}e^{-t/RC}
$$

### 時間常數

$$
\tau = RC
$$

- $t = \tau$：充電達 $63.2\%$（$1 - e^{-1}$），放電剩 $36.8\%$（$e^{-1}$）
- $t = 5\tau$：可視為完全充飽（$99.3\%$）

## 惠斯通電橋

當電橋平衡（檢流計讀數為零）時：

$$
\frac{R_1}{R_2} = \frac{R_3}{R_x} \quad\Rightarrow\quad R_x = \frac{R_2 R_3}{R_1}
$$

## 例題

**例題 1**：三個電阻 $2\Omega$、$3\Omega$、$6\Omega$ 並聯，求等效電阻。

**解**：
$\frac{1}{R_{eq}} = \frac12 + \frac13 + \frac16 = \frac{3+2+1}{6} = 1$
$R_{eq} = 1\ \Omega$

**例題 2**：RC 電路 $R = 1$ kΩ，$C = 100$ μF，求 $\tau$ 和充電完成時間。

**解**：
$\tau = RC = 1000 \times 100 \times 10^{-6} = 0.1$ s
$5\tau = 0.5$ s 可視為完全充飽

**例題 3**：雙迴路電路，$\mathcal{E}_1 = 12$ V，$\mathcal{E}_2 = 6$ V，$R_1 = 2\ \Omega$，$R_2 = 4\ \Omega$，$R_3 = 3\ \Omega$。求各支路電流。

**解**：
設 $I_1$ 從 $\mathcal{E}_1$ 流出，$I_2$ 從 $\mathcal{E}_2$ 流出，$I_3$ 通過 $R_3$ 向下。

KCL（節點 A）：$I_1 + I_2 = I_3$

KVL（左迴路）：$12 - 2I_1 - 3I_3 = 0$
KVL（右迴路）：$6 - 4I_2 - 3I_3 = 0$

由左式：$I_1 = (12 - 3I_3)/2$
由右式：$I_2 = (6 - 3I_3)/4$

代入 KCL：$\dfrac{12 - 3I_3}{2} + \dfrac{6 - 3I_3}{4} = I_3$

兩邊乘 4：$2(12 - 3I_3) + (6 - 3I_3) = 4I_3$
$24 - 6I_3 + 6 - 3I_3 = 4I_3$
$30 = 13I_3$
$I_3 = 30/13 \approx 2.31$ A
$I_1 = (12 - 3\times2.31)/2 \approx 2.54$ A
$I_2 = (6 - 3\times2.31)/4 \approx -0.23$ A（方向與假設相反）

## 隨堂測驗

1. KVL 的物理基礎是什麼？
   - (A) 電荷守恆
   - (B) 能量守恆 ✓
   - (C) 動量守恆
   - (D) 質量守恆

2. RC 電路的時間常數 $\tau =$？
   - (A) $R/C$
   - (B) $RC$ ✓
   - (C) $1/RC$
   - (D) $CR^2$

3. 戴維寧等效電路將複雜網路化簡為？
   - (A) $V_{th}$ 並聯 $R_{th}$
   - (B) $V_{th}$ 串聯 $R_{th}$ ✓
   - (C) $I_{th}$ 串聯 $R_{th}$
   - (D) 僅 $R_{th}$

4. RC 充電 $t = \tau$ 時，電容電壓達最終值的？
   - (A) $50\%$
   - (B) $63.2\%$ ✓（$1 - e^{-1}$）
   - (C) $86.5\%$
   - (D) $95\%$

5. 惠斯通電橋平衡時，檢流計讀數為？
   - (A) 最大
   - (B) 零 ✓
   - (C) 無限大
   - (D) 等於電源電壓

## 重點整理

- KCL（節點電流守恆）、KVL（迴路電壓守恆）
- 戴維寧定理：任何線性網路 → $V_{th}$ + $R_{th}$
- RC 充電 ODE：$R\frac{dq}{dt} + \frac{q}{C} = V_0$，解為 $q(t) = Q_0(1-e^{-t/RC})$
- 時間常數 $\tau = RC$，$5\tau$ 為完全充放電時間
- 惠斯通電橋平衡條件：$\frac{R_1}{R_2} = \frac{R_3}{R_x}$

## 延伸閱讀

- [Kirchhoff 定律 - 維基百科](https://zh.wikipedia.org/zh-tw/基尔霍夫电路定律)
- [戴維寧定理](https://zh.wikipedia.org/zh-tw/戴维南定理)
- [RC 電路](https://zh.wikipedia.org/zh-tw/RC电路)
