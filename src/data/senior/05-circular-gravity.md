---
slug: 05-circular-gravity
title: 圓周運動與萬有引力
description: 球殼定理與穿心隧道 SHM、第三宇宙速度、雙星系統、潮汐力與 Roche 極限、脫離速度推導、克卜勒定律與角動量守恆。
order: 5
topics: [萬有引力, 球殼定理, 穿心隧道, 雙星系統, 潮汐力, 脫離速度, 克卜勒定律]
---

## 前言

從蘋果掉落到月球繞地球運行，從 GPS 衛星到雙中子星合併——萬有引力主宰了宇宙尺度的一切運動。

## 萬有引力定律

$F = GMm/r^2$, $G = 6.67\times10^{-11}\ \text{N·m}^2/\text{kg}^2$, $g = GM/R^2 \approx 9.8\ \text{m/s}^2$。

## 球殼定理 (Shell Theorem)

Newton 證明了兩個關於球對稱質量分布的重要定理：

1. **球殼外部**：均勻球殼對外部物體的引力，等於球殼總質量集中在球心時的引力
2. **球殼內部**：均勻球殼對內部物體的引力為零

### 地球內部重力場

由球殼定理，在地球內部距離地心 $r$ 處，只有半徑 $r$ 以內的質量產生引力：

$$
g(r) = \frac{GM(r)}{r^2} = \frac{G}{r^2} \cdot \rho \cdot \frac43\pi r^3 = \frac{GM}{R^3}\,r
$$

其中 $M$ 為地球總質量，$R$ 為地球半徑。**地球內部重力場與 $r$ 成正比**。

### 穿心隧道 SHM

若在地球上開鑿一條穿過地心的隧道，物體所受恢復力 $F = -mg(r) = -\dfrac{GMm}{R^3}r$，與 $r$ 成正比——這是**簡諧運動**！

$$
\omega = \sqrt{\frac{GM}{R^3}} = \sqrt{\frac{g}{R}},\quad T = 2\pi\sqrt{\frac{R}{g}} \approx 2\pi\sqrt{\frac{6.37\times10^6}{9.8}} \approx 5065\ \text{s} \approx 84.4\ \text{min}
$$

> 💡 從地表掉落地心只需 $T/4 \approx 21$ 分鐘，且無論隧道是否通過地心，全程僅需相同時間！

## 重力位能與脫離速度

### 重力位能
$U(r) = -GMm/r$（零點在 $\infty$），積分推導：$U(r) = -\int_\infty^r F\,dr'$。

### 第一宇宙速度（環繞）
$v_1 = \sqrt{GM/R} \approx 7.9$ km/s。

### 第二宇宙速度（脫離地球）
$\frac12 mv_{\text{esc}}^2 - GMm/R = 0 \Rightarrow v_{\text{esc}} = \sqrt{2GM/R} \approx 11.2$ km/s。

### 第三宇宙速度（脫離太陽系）

從地球發射太空船脫離太陽引力，需克服地球引力 + 太陽引力：

$$
\frac12 mv_3^2 = \frac12 m(v_{\text{esc},\odot} - v_{\oplus})^2 + \frac{GM_{\oplus}m}{R_{\oplus}}
$$

近似值：$v_3 \approx 16.7$ km/s。

## 衛星能量

$K = GMm/2r$, $U = -GMm/r$, $E = -GMm/2r = -K = \frac12U$。

## 雙星系統 (Binary Star System)

兩質量 $m_1, m_2$ 繞共同質心作圓周運動，距離 $R = r_1 + r_2$：

$$
m_1 r_1 = m_2 r_2,\quad \frac{Gm_1m_2}{R^2} = m_1\omega^2 r_1 = m_2\omega^2 r_2
$$

**公轉週期**：
$$
T = 2\pi\sqrt{\frac{R^3}{G(m_1 + m_2)}}
$$

**應用**：天文學中通過觀測雙星軌道推斷恆星質量。

## 潮汐力與 Roche 極限

### 潮汐力

衛星對行星產生的潮汐力差異 $\Delta F$ 與距離立方成反比：

$$
\Delta F \propto \frac{1}{r^3}
$$

這就是為何月球靠近地球一側（漲潮）和遠離一側（也漲潮）產生兩次每日潮汐。

### Roche 極限

當衛星過於靠近行星，潮汐力超過衛星自身引力時，衛星會被撕裂。此臨界距離稱為**Roche 極限**：

$$
d_{\text{Roche}} \approx 2.44 R_{\text{planet}} \left(\frac{\rho_{\text{planet}}}{\rho_{\text{satellite}}}\right)^{1/3}
$$

**例子**：土星環位於 Roche 極限內，因此無法凝聚成衛星。

## Kepler 定律

1. **橢圓軌道**：行星軌道是橢圓，太陽在焦點
2. **等面積定律**：$\frac{dA}{dt} = L/2m$（角動量守恆）
3. **週期定律**：$T^2 = 4\pi^2 a^3/GM$

## 例題

**例題 1**：地球內部 $r = R/2$ 處的 $g$ 值為多少？

**解**：
$g(r) = \dfrac{g_0}{R}r = 9.8 \times 0.5 = 4.9$ m/s²

**例題 2**：雙星質量 $m_1 = 2M_\odot$, $m_2 = M_\odot$，距離 $R = 1$ AU。求週期。

**解**：
$T = 2\pi\sqrt{\dfrac{R^3}{G(m_1+m_2)}} = 2\pi\sqrt{\dfrac{(1.5\times10^{11})^3}{6.67\times10^{-11}\times 3\times2\times10^{30}}} \approx 1.15\times10^7$ s $\approx 133$ 天

## 隨堂測驗

1. 球殼定理指出，均勻球殼對內部物體的引力為？
   - (A) 最大
   - (B) 零 ✓
   - (C) 等於球殼總引力
   - (D) 與距離成正比

2. 穿心隧道 SHM 的週期約為？
   - (A) 42 分鐘
   - (B) 84 分鐘 ✓（$2\pi\sqrt{R/g} \approx 5065$ s）
   - (C) 24 小時
   - (D) 365 天

3. 第三宇宙速度約為？
   - (A) 7.9 km/s
   - (B) 11.2 km/s
   - (C) 16.7 km/s ✓
   - (D) 30 km/s

4. 潮汐力與距離的關係為？
   - (A) $\propto 1/r$
   - (B) $\propto 1/r^2$
   - (C) $\propto 1/r^3$ ✓
   - (D) $\propto 1/r^4$

5. 雙星系統的週期公式為 $T = 2\pi\sqrt{R^3/G(m_1+m_2)}$，這類似於 Kepler 第三定律但質量為？
   - (A) $m_1$
   - (B) $m_2$
   - (C) $m_1+m_2$ ✓
   - (D) $\sqrt{m_1m_2}$

## 重點整理

- 球殼定理：外部 $F=GMm/r^2$，內部 $F=0$
- 地球內部 $g(r) = g_0 r/R$，穿心隧道 $T=2\pi\sqrt{R/g} \approx 84.4$ min
- $v_1=7.9$, $v_2=11.2$, $v_3\approx16.7$ km/s
- 雙星 $T = 2\pi\sqrt{R^3/G(m_1+m_2)}$
- 潮汐力 $\propto 1/r^3$，Roche 極限撕裂衛星

## 延伸閱讀

- [球殼定理](https://zh.wikipedia.org/zh-tw/壳层定理)
- [雙星系統](https://zh.wikipedia.org/zh-tw/联星)
- [Roche 極限](https://zh.wikipedia.org/zh-tw/洛希极限)
- [宇宙速度](https://zh.wikipedia.org/zh-tw/宇宙速度)
