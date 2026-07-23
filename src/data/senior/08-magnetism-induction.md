---
slug: 08-magnetism-induction
title: 磁場與電磁感應
description: 安培定律與 Biot-Savart、動生電動勢與能量守恆、自感與互感、Maxwell-Faraday 方程、法拉第/冷次定律、交流發電。
order: 8
topics: [安培定律, 動生電動勢, 自感, 法拉第定律, 冷次定律, 交流發電, Maxwell方程]
---

## 前言

電與磁是密不可分的。電可以生磁，磁也可以生電。電磁感應是現代電力工業的基石——從發電廠到無線充電，從變壓器到感應爐。

## 電流的磁效應

### 安培定律

電流產生磁場的定量關係由安培定律描述。

**長直導線**（距離 $r$ 處）：
$$
B = \frac{\mu_0 I}{2\pi r}, \quad \mu_0 = 4\pi \times 10^{-7}\ \text{T·m/A}
$$

**螺線管內部**（$n = N/L$ 匝/m）：
$$
B = \mu_0 n I = \mu_0 \frac{N}{L} I
$$

**安培定律積分形式**：
$$
\oint \vec{B} \cdot d\vec{l} = \mu_0 I_{\text{enc}}
$$

## 磁場對電流的作用

### 安培力

$$
F = ILB\sin\theta
$$

佛來明左手定則：食指導線 = 磁場，中指 = 電流，拇指 = 受力。

### 帶電粒子在磁場中運動

$$
F = qvB\sin\theta
$$

垂直入射時作等速圓周運動：
$$
r = \frac{mv}{qB}, \quad T = \frac{2\pi m}{qB}
$$

## 動生電動勢與能量守恆

導體棒在磁場中以速度 $v$ 運動，切割磁力線產生動生電動勢：

$$
\mathcal{E} = BLv
$$

**能量守恆**：外力拉動金屬棒做功，轉化為電路中的電能。

$$
P_{\text{mech}} = Fv = BIL \cdot v, \quad P_{\text{elec}} = I^2 R
$$

由 $P_{\text{mech}} = P_{\text{elec}}$ 可得 $I = \dfrac{BLv}{R}$（與 Ohm 定律 $I = \mathcal{E}/R$ 一致）。

## 法拉第電磁感應定律

### 磁通量

$$
\Phi_B = BA\cos\theta
$$

### 法拉第定律

感應電動勢等於磁通量變化率的負值：
$$
\mathcal{E} = -N\frac{d\Phi_B}{dt}
$$

### 冷次定律

感應電流的方向總是**抵抗**磁通量的變化（負號的物理意義）。

> 💡 冷次定律本質上是能量守恆的表現——若感應電流不抵抗變化，能量將無中生有。

## 自感與互感

### 自感

當線圈中的電流變化時，線圈自身產生的感應電動勢：

$$
\mathcal{E}_L = -L\frac{dI}{dt}
$$

- $L$：自感係數 (H，亨利)
- 螺線管的電感：$L = \mu_0 n^2 A l$

**磁場儲能**：
$$
U_B = \frac12 L I^2
$$

### 互感

線圈 1 的電流變化在線圈 2 中產生的感應電動勢：
$$
\mathcal{E}_2 = -M\frac{dI_1}{dt}
$$

## Maxwell-Faraday 方程

變化的磁場產生**感應電場**（又稱渦旋電場），它是非保守場——不同於靜電場：

**積分形式**：
$$
\oint \vec{E} \cdot d\vec{l} = -\frac{d\Phi_B}{dt}
$$

**微分形式**：
$$
\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}
$$

這是 Maxwell 方程組的核心之一，揭示了電場與磁場的動態耦合：**變化的磁場產生電場**。

## 交流發電機

線圈在均勻磁場中勻速旋轉，產生正弦感應電動勢：

$$
\mathcal{E}(t) = NBA\omega\sin(\omega t)
$$

### 有效值

$$
V_{\text{rms}} = \frac{V_0}{\sqrt{2}}, \quad I_{\text{rms}} = \frac{I_0}{\sqrt{2}}
$$

家用 110 V 交流電，峰值 $V_0 = 110\sqrt{2} \approx 155.6$ V。

### 變壓器

$$
\frac{V_s}{V_p} = \frac{N_s}{N_p}, \quad I_p V_p = I_s V_s \ (\text{理想})
$$

升壓：$N_s > N_p$（發電廠輸電），降壓：$N_s < N_p$（充電器）。

## 例題

**例題 1**：長 $0.8$ m 導線有 $5$ A 電流，垂直於 $0.3$ T 磁場，求安培力。

**解**：
$F = ILB\sin 90^\circ = 5 \times 0.8 \times 0.3 = 1.2$ N

**例題 2**：$200$ 匝線圈在 $0.05$ s 內 $\Phi_B$ 從 $0.01$ Wb 變為 $0.06$ Wb，求平均感應電動勢。

**解**：
$\mathcal{E} = -N\Delta\Phi_B/\Delta t = -200 \times (0.06-0.01)/0.05 = -200$ V（大小 200 V）

**例題 3**：金屬棒長 $L = 0.5$ m，在 $B = 0.4$ T 的磁場中以 $v = 10$ m/s 運動，電路電阻 $R = 2\ \Omega$。求 $\mathcal{E}$、$I$、外力功率。

**解**：
$\mathcal{E} = BLv = 0.4 \times 0.5 \times 10 = 2$ V
$I = \mathcal{E}/R = 2/2 = 1$ A
$F = BIL = 0.4 \times 1 \times 0.5 = 0.2$ N
$P_{\text{mech}} = Fv = 0.2 \times 10 = 2$ W
$P_{\text{elec}} = I^2R = 1^2 \times 2 = 2$ W ✓（驗證能量守恆）

## 隨堂測驗

1. 螺線管內部磁場 $B =$？
   - (A) $\mu_0 I / 2\pi r$
   - (B) $\mu_0 n I$ ✓
   - (C) $\mu_0 I / r$
   - (D) $\mu_0 n^2 I$

2. 動生電動勢 $\mathcal{E} = BLv$ 中，若 $v$ 變為 2 倍，$\mathcal{E}$ 變為？
   - (A) $1/2$ 倍
   - (B) 2 倍 ✓
   - (C) 4 倍
   - (D) 不變

3. 電感儲能 $U_B =$？
   - (A) $\frac12 CV^2$
   - (B) $\frac12 LI^2$ ✓
   - (C) $LI$
   - (D) $\frac12 L^2 I$

4. $\nabla \times \vec{E} = -\partial\vec{B}/\partial t$ 中的負號代表？
   - (A) 靜電場
   - (B) 冷次定律 ✓
   - (C) 電荷守恆
   - (D) 能量守恆

5. 變壓器 $\frac{V_s}{V_p} = \frac{N_s}{N_p}$ 中升壓時 $N_s$ 應？
   - (A) $N_s < N_p$
   - (B) $N_s > N_p$ ✓
   - (C) $N_s = N_p$
   - (D) 與匝數無關

## 重點整理

- 安培定律：長直導線 $B = \mu_0 I / 2\pi r$，螺線管 $B = \mu_0 n I$
- 動生電動勢 $\mathcal{E} = BLv$，$P_{\text{mech}} = P_{\text{elec}}$
- 法拉第定律 $\mathcal{E} = -N d\Phi_B/dt$，冷次定律抵抗磁通量變化
- 自感 $\mathcal{E}_L = -LdI/dt$，儲能 $U_B = \frac12 LI^2$
- Maxwell-Faraday：$\nabla \times \vec{E} = -\partial\vec{B}/\partial t$
- 交流電 $V_{\text{rms}} = V_0/\sqrt{2}$，變壓器 $V_s/V_p = N_s/N_p$

## 延伸閱讀

- [法拉第電磁感應定律 - 維基百科](https://zh.wikipedia.org/zh-tw/法拉第电磁感应定律)
- [Maxwell 方程組](https://zh.wikipedia.org/zh-tw/麦克斯韦方程组)
- [交流電](https://zh.wikipedia.org/zh-tw/交流电)
