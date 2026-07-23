---
slug: 02-dynamics
title: 動力學
description: 自由體圖 FBD 分析、斜面與 Atwood 機、靜/動摩擦力臨界變化、非勻速圓周運動、單擺 SHM 小角度近似推導。
order: 2
topics: [牛頓定律, 自由體圖, 摩擦力, Atwood機, 向心力, 簡諧運動, 單擺]
---

## 前言

動力學研究的是**力如何影響運動**。如果運動學是描述「怎麼動」，動力學就是解釋「為什麼這樣動」。

## 牛頓三大定律

### 第一定律（慣性定律）

物體若不受外力（或所受合力為零），靜者恆靜，動者恆作等速直線運動。**慣性**是物體抵抗運動狀態改變的性質，質量越大慣性越大。

### 第二定律（運動定律）

$$
\sum\vec{F} = m\vec{a}
$$

合力等於質量乘以加速度。這是**向量式**，需分別處理各方向分量：
$$
\sum F_x = ma_x,\quad \sum F_y = ma_y
$$

### 第三定律（作用反作用定律）

$$
\vec{F}_{AB} = -\vec{F}_{BA}
$$

作用力和反作用力作用在不同物體上，不會抵消。

## 自由體圖 (FBD) 分析

自由體圖是動力學最重要的工具——將物體從環境中隔離，畫出所有外力。

**步驟**：
1. 選定系統（物體）
2. 畫出所有外力（重力、正向力、張力、摩擦力、彈力等）
3. 建立座標系（通常讓加速度方向沿某一軸）
4. 將力分解到座標軸上，列出牛頓第二定律分量方程

### 斜面物體受力分析

物體質量 $m$ 置於傾角 $\theta$ 的斜面上：

**座標系**：$x$ 軸沿斜面向下，$y$ 軸垂直斜面向上

$$
\sum F_y = N - mg\cos\theta = 0 \quad\Rightarrow\quad N = mg\cos\theta
$$
$$
\sum F_x = mg\sin\theta - f = ma
$$

- 無摩擦：$a = g\sin\theta$
- 有動摩擦：$a = g(\sin\theta - \mu_k\cos\theta)$
- 臨界靜止條件：$\tan\theta \le \mu_s$

### Atwood 機（連體系統）

兩質量 $m_1, m_2$ 掛在滑輪兩側（設 $m_2 > m_1$）：

對 $m_1$：$T - m_1g = m_1a$
對 $m_2$：$m_2g - T = m_2a$

兩式相加消去 $T$：
$$
a = \frac{m_2 - m_1}{m_1 + m_2}\,g,\qquad T = \frac{2m_1m_2}{m_1 + m_2}\,g
$$

## 常見的力

### 重力
$F_g = mg$，方向指向地心。

### 正向力
支撐面給予物體的垂直向上的力。水平面 $N = mg$，斜面 $N = mg\cos\theta$。

### 張力
繩子傳遞的拉力，理想繩各處張力相等。

### 彈力（虎克定律）
$F = -kx$，$k$ 為彈性係數 (N/m)，負號表示與形變反向。

## 摩擦力與臨界變化

靜摩擦力是**被動響應力**——它隨外力調整，直到最大值：

$$
0 \le f_s \le f_{s,\max} = \mu_s N
$$

一旦外力超過 $f_{s,\max}$，物體開始滑動，摩擦力驟降至動摩擦：

$$
f_k = \mu_k N \quad (\mu_k < \mu_s)
$$

**外力 $F$ 與摩擦力 $f$ 的關係**：
- 當 $F \le \mu_s N$：$f = F$（靜摩擦，斜率 1）
- 當 $F = \mu_s N$：摩擦力達最大值
- 當 $F > \mu_s N$：$f = \mu_k N$（驟降並維持定值）

> 💡 推動重物時，剛開始很費力，一旦推動後反而感覺變輕——這就是靜摩擦轉為動摩擦的日常體驗。

## 向心力與非勻速圓周運動

### 勻速圓周運動

向心力 $F_c = m\dfrac{v^2}{r} = m\omega^2 r$，指向圓心。向心力不是新力，而是指向圓心的合力。

### 非勻速圓周運動

若速率改變，加速度有兩個分量：

**切向分量**（改變速率）：
$$
F_t = ma_t = m\frac{dv}{dt}
$$

**法向（向心）分量**（改變方向）：
$$
F_n = ma_n = m\frac{v^2}{r}
$$

**總力**：
$$
\vec{F} = \vec{F}_t + \vec{F}_n,\quad F = \sqrt{F_t^2 + F_n^2}
$$

## 簡諧運動與單擺

### SHM 基本關係

恢復力與位移成正比：$F = -kx$
運動方程：$x(t) = A\cos(\omega t + \phi)$，$\omega = \sqrt{k/m}$
週期：$T = 2\pi\sqrt{m/k}$

### 單擺小角度近似推導

單擺的恢復力來自重力的切向分量：

$$
F = -mg\sin\theta
$$

當 $\theta$ 很小時（$\theta < 10^\circ$），利用泰勒展開：

$$
\sin\theta \approx \theta - \frac{\theta^3}{6} + \cdots \approx \theta
$$

因此：
$$
F \approx -mg\theta
$$

弧長 $x = L\theta$，代入得：
$$
F \approx -mg\frac{x}{L} = -\left(\frac{mg}{L}\right)x
$$

這與虎克定律 $F = -kx$ 形式相同，等效彈性係數 $k = mg/L$。代入 SHM 週期公式：

$$
T = 2\pi\sqrt{\frac{m}{k}} = 2\pi\sqrt{\frac{m}{mg/L}} = 2\pi\sqrt{\frac{L}{g}}
$$

**結論**：單擺週期 $T$ 與擺錘質量 $m$ 和振幅 $A$ 無關，只取決於擺長 $L$ 和重力加速度 $g$。

## 例題

**例題 1**：$m = 5$ kg 的箱子在水平地面，$\mu_k = 0.3$，用 $F = 20$ N 水平力拉。求加速度。

**解**：
$N = mg = 5 \times 9.8 = 49$ N
$f_k = \mu_k N = 0.3 \times 49 = 14.7$ N
$F_{\text{net}} = 20 - 14.7 = 5.3$ N
$a = F_{\text{net}}/m = 5.3/5 = 1.06$ m/s²

**例題 2**：Atwood 機 $m_1 = 2$ kg，$m_2 = 3$ kg，求加速度和張力。

**解**：
$a = \dfrac{m_2 - m_1}{m_1 + m_2}\,g = \dfrac{1}{5} \times 9.8 = 1.96$ m/s²
$T = \dfrac{2m_1m_2}{m_1 + m_2}\,g = \dfrac{12}{5} \times 9.8 = 23.52$ N

**例題 3**：單擺擺長 $L = 0.5$ m，$g = 9.8$ m/s²，求週期。

**解**：
$T = 2\pi\sqrt{L/g} = 2\pi\sqrt{0.5/9.8} \approx 2\pi \times 0.226 \approx 1.42$ s

**例題 4**：質量 $m = 2$ kg 的物體在傾角 $\theta = 30^\circ$ 的斜面上，$\mu_s = 0.4$。求物體會否下滑？若 $\theta$ 增至 $45^\circ$ 呢？

**解**：
下滑力 $mg\sin\theta = 2 \times 9.8 \times \sin30^\circ = 9.8$ N
最大靜摩擦 $f_{s,\max} = \mu_s mg\cos\theta = 0.4 \times 2 \times 9.8 \times 0.866 \approx 6.79$ N
$9.8 > 6.79$ ⇒ **會下滑**

$\theta = 45^\circ$：下滑力 $= 2 \times 9.8 \times 0.707 \approx 13.86$ N
$f_{s,\max} = 0.4 \times 2 \times 9.8 \times 0.707 \approx 5.54$ N ⇒ 下滑更快

## 隨堂測驗

1. 靜摩擦係數 $\mu_s$ 與動摩擦係數 $\mu_k$ 的關係通常為？
   - (A) $\mu_s = \mu_k$
   - (B) $\mu_s > \mu_k$ ✓
   - (C) $\mu_s < \mu_k$
   - (D) 無關

2. Atwood 機 $m_1 = 1$ kg，$m_2 = 4$ kg，加速度 $a =$？
   - (A) $g$
   - (B) $3g/5$ ✓（$(4-1)/(4+1) = 3/5$）
   - (C) $g/2$
   - (D) $g/5$

3. 單擺週期與下列何者無關？
   - (A) 擺長 $L$
   - (B) 擺錘質量 $m$ ✓（$T = 2\pi\sqrt{L/g}$）
   - (C) 重力加速度 $g$
   - (D) 以上皆有關

4. 物體在斜面上靜止的臨界條件為？
   - (A) $\tan\theta = \mu_s$ ✓
   - (B) $\sin\theta = \mu_s$
   - (C) $\cos\theta = \mu_s$
   - (D) $\theta = 90^\circ$

5. 非勻速圓周運動中，改變速度大小的力為？
   - (A) 向心力 $F_n$
   - (B) 切向力 $F_t$ ✓
   - (C) 重力
   - (D) 正向力

## 重點整理

- FBD 步驟：隔離物體 → 畫力 → 建座標 → 列分量方程
- 斜面：$N = mg\cos\theta$，下滑力 $mg\sin\theta$
- Atwood 機：$a = \dfrac{m_2 - m_1}{m_1 + m_2}g$
- 摩擦力：$0 \le f_s \le \mu_s N$，$f_k = \mu_k N$，$\mu_k < \mu_s$
- 非勻速圓周：$F_t = m\frac{dv}{dt}$，$F_n = m\frac{v^2}{r}$
- 單擺小角度近似：$\sin\theta \approx \theta$，$T = 2\pi\sqrt{L/g}$

## 延伸閱讀

- [牛頓運動定律 - 維基百科](https://zh.wikipedia.org/zh-tw/牛顿运动定律)
- [阿特伍德機](https://zh.wikipedia.org/zh-tw/阿特伍德机)
- [簡諧運動](https://zh.wikipedia.org/zh-tw/简谐运动)
