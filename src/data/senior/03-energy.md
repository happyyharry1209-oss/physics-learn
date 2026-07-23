---
slug: 03-energy
title: 能量與功
description: 功的線積分定義、功-動能定理微積分推導、保守力與位能梯度、重力/彈力位能、力學能守恆、非保守力耗能。
order: 3
topics: [功, 功率, 動能, 位能, 保守力, 力學能守恆, 能源]
---

## 前言

能量的概念貫穿整個物理學。從舉起書包到發電廠發電，從雲霄飛車到核能——都是能量的轉換與傳遞。

## 功

### 定力做功

$$
W = F \cdot d \cdot \cos\theta
$$

- $\theta = 0^\circ$：$W = Fd$（做正功）
- $\theta = 90^\circ$：$W = 0$（不做功）
- $\theta = 180^\circ$：$W = -Fd$（做負功）

> ⚠️ 沒有位移就沒有做功！推牆壁推到滿頭汗，但牆壁沒動——物理學上你沒有做功。

### 變力做功（線積分）

當力隨位置變化時（如彈簧），功由**線積分**定義：

$$
W = \int_{r_1}^{r_2} \vec{F} \cdot d\vec{r} = \int_{x_1}^{x_2} F(x)\,dx
$$

**幾何意義**：$F$-$x$ 圖中曲線與 $x$ 軸所圍面積 = 做功 $W$。

**範例**：彈簧拉伸 $x$，$F = kx$：
$$
W = \int_0^x kx'\,dx' = \frac12 kx^2
$$

## 功率

**平均功率**：$P = \dfrac{W}{t}$
**瞬時功率**：$P = \vec{F} \cdot \vec{v} = Fv\cos\theta$

單位：瓦特 (W)，$1\ \text{W} = 1\ \text{J/s}$。

## 動能與功-動能定理

### 動能

$$
K = \frac12 mv^2
$$

### 功-動能定理的微積分推導

從 Newton 第二定律出發：
$$
F = ma = m\frac{dv}{dt}
$$

合力做功：
$$
W_{\text{net}} = \int F\,dx = \int m\frac{dv}{dt}\,dx = \int_{v_i}^{v_f} mv\,dv
$$

$$
W_{\text{net}} = \left[\frac12 mv^2\right]_{v_i}^{v_f} = \frac12 mv_f^2 - \frac12 mv_i^2 = \Delta K
$$

**結論**：合力對物體做的功等於物體動能的變化。

## 位能與保守力

### 保守力的定義

若力做功與路徑無關、只與起終點有關，則稱為**保守力**。其沿任意閉合路徑做功為零：
$$
\oint \vec{F}_{\text{cons}} \cdot d\vec{r} = 0
$$

**保守力**：重力、彈力、靜電力
**非保守力**：摩擦力、空氣阻力

### 保守力與位能梯度的關係

位能 $U$ 與保守力 $\vec{F}$ 的關係：
$$
\vec{F} = -\nabla U \quad (\text{一維：} F = -\frac{dU}{dx})
$$

**物理意義**：保守力指向位能**降低**最快的方向。負號表示力總是趨向使系統位能減少。

### 重力位能

$$
U_g = mgh
$$

$h$ 為相對於參考面的高度，參考面的選擇不影響物理結果（因為可測量的是位能差 $\Delta U$）。

### 彈力位能

$$
U_s = \frac12 kx^2
$$

$k$ 為彈性係數 (N/m)，$x$ 為形變量 (m)。

## 力學能守恆

只有保守力做功時，力學能守恆：
$$
K_1 + U_1 = K_2 + U_2
$$

$$
\frac12 mv_1^2 + mgh_1 = \frac12 mv_2^2 + mgh_2
$$

> 💡 雲霄飛車利用力學能守恆——最高點位能最大，最低點動能最大。

### 非保守力耗能

若有摩擦力等非保守力做功：
$$
W_{\text{nc}} = \Delta E = E_2 - E_1
$$

## 能源概述

- **可再生能源**：太陽能、風能、水力、地熱
- **不可再生能源**：煤炭、石油、天然氣、核能
- 能量守恆定律：能量只能轉換，不能消滅

## 例題

**例題 1**：2 kg 物體從 10 m 高處自由落下（$g=10$），求落地速度。

**解**：
力學能守恆：$mgh = \frac12 mv^2$
$v = \sqrt{2gh} = \sqrt{2 \times 10 \times 10} = \sqrt{200} \approx 14.1$ m/s

**例題 2**：100 N 水平力推箱子 5 m，力與水平夾角 $30^\circ$，求做功。

**解**：
$W = Fd\cos\theta = 100 \times 5 \times \cos 30^\circ = 500 \times 0.866 \approx 433$ J

**例題 3**：彈簧常數 $k = 500$ N/m，物體質量 $m = 2$ kg，從 $h = 0.5$ m 高處落下壓在彈簧上。求彈簧最大壓縮量 $x$。

**解**：
力學能守恆：$mg(h+x) = \frac12 kx^2$
$2 \times 9.8(0.5 + x) = \frac12 \times 500 \times x^2$
$9.8 + 19.6x = 250x^2$
$250x^2 - 19.6x - 9.8 = 0$
$x = \dfrac{19.6 \pm \sqrt{19.6^2 + 4 \times 250 \times 9.8}}{2 \times 250} = \dfrac{19.6 \pm \sqrt{384.16 + 9800}}{500}$
$x \approx \dfrac{19.6 + 100.9}{500} \approx 0.241$ m

## 隨堂測驗

1. 下列何者為保守力？
   - (A) 摩擦力
   - (B) 重力 ✓
   - (C) 空氣阻力
   - (D) 張力

2. 功-動能定理 $W_{\text{net}} = \Delta K$ 是從哪個定律推導的？
   - (A) Newton 第二定律 ✓
   - (B) 能量守恆定律
   - (C) 動量守恆定律
   - (D) 萬有引力定律

3. 彈簧的彈力位能 $U_s =$？
   - (A) $\frac12 mv^2$
   - (B) $mgh$
   - (C) $\frac12 kx^2$ ✓
   - (D) $kx$

4. 物體從光滑斜面頂端滑下，何者守恆？
   - (A) 動能
   - (B) 位能
   - (C) 力學能 ✓
   - (D) 動量

5. 保守力 $\mathbf{F}$ 與位能 $U$ 的關係為？
   - (A) $\mathbf{F} = \nabla U$
   - (B) $\mathbf{F} = -\nabla U$ ✓
   - (C) $\mathbf{F} = \nabla \times U$
   - (D) $\mathbf{F} = \nabla \cdot U$

## 重點整理

- 功 $W = \int \vec{F} \cdot d\vec{r}$，$F$-$x$ 面積 = 功
- 功-動能定理：$W_{\text{net}} = \Delta K$，從 $F=ma$ 微積分推導
- 保守力 $\oint \vec{F} \cdot d\vec{r} = 0$，$\vec{F} = -\nabla U$
- 重力位能 $U_g = mgh$，彈力位能 $U_s = \frac12 kx^2$
- 力學能守恆：僅保守力做功時 $K+U = \text{const}$

## 延伸閱讀

- [能量守恆 - 維基百科](https://zh.wikipedia.org/zh-tw/能量守恒定律)
- [功與能](https://zh.wikipedia.org/zh-tw/功)
- [保守力](https://zh.wikipedia.org/zh-tw/保守力)
