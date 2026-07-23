---
slug: 06-electrostatics
title: 靜電學
description: Coulomb 定律、Gauss 定律與對稱性分析、電場與電位梯度關係、導體靜電平衡、介電質與電容、平行板偏轉。
order: 6
topics: [Coulomb定律, 電場, Gauss定律, 電位, 導體平衡, 電容, 介電質]
---

## 前言

靜電學研究靜止電荷之間的相互作用。從庫侖定律到高斯定律，從電容器到粒子加速器——靜電學是電磁學的基石。

## Coulomb 定律

兩點電荷間的靜電力與電荷量乘積成正比，與距離平方成反比：

$$
F = k\frac{q_1 q_2}{r^2} = \frac{1}{4\pi\varepsilon_0}\frac{q_1 q_2}{r^2}
$$

- $k = 8.99 \times 10^9$ N·m²/C²
- $\varepsilon_0 = 8.85 \times 10^{-12}$ C²/N·m²（真空介電常數）

## 電場

### 定義

$$
\vec{E} = \frac{\vec{F}}{q}
$$

點電荷 $Q$ 產生的電場：$\vec{E} = k\frac{Q}{r^2}\hat{r}$

### 常見電荷分布的電場

| 分布 | 位置 | 電場強度 |
|:----:|:----:|:--------:|
| 點電荷 $Q$ | 距離 $r$ | $E = kQ/r^2$ |
| 無限長直線（線密度 $\lambda$）| 距離 $r$ | $E = 2k\lambda/r$ |
| 無限大平板（面密度 $\sigma$）| 附近 | $E = \sigma/2\varepsilon_0$ |
| 平行板電容器內部 | 板間 | $E = \sigma/\varepsilon_0 = V/d$ |

## Gauss 定律

### 積分形式

$$
\Phi_E = \oint \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}
$$

**核心思想**：通過封閉曲面的電通量只與曲面內的淨電荷有關，與曲面外電荷無關。

### 對稱性分析

Gauss 定律最大的威力在於利用對稱性簡化電場計算：

| 對稱類型 | 高斯面選擇 | 範例 |
|:--------:|:----------:|:----:|
| 球對稱 | 同心球面 | 點電荷、帶電球殼/球體 |
| 圓柱對稱 | 同軸圓柱面 | 無限長帶電直線/圓柱 |
| 平面對稱 | 穿過平板的圓柱 | 無限大帶電平板 |

**範例**：點電荷 $Q$，選半徑 $r$ 的同心球面為高斯面：
$$
\oint \vec{E} \cdot d\vec{A} = E \cdot 4\pi r^2 = \frac{Q}{\varepsilon_0} \quad\Rightarrow\quad E = \frac{Q}{4\pi\varepsilon_0 r^2}
$$

## 電位

### 電場與電位的關係

**積分形式**：
$$
V_B - V_A = -\int_A^B \vec{E} \cdot d\vec{r}
$$

**微分形式**（一維）：$E = -\dfrac{dV}{dx}$
**三維梯度形式**：$\mathbf{E} = -\nabla V$

**物理意義**：電場方向指向電位**降落最快**的方向。電荷在電場中會自發從高電位向低電位運動。

### 點電荷的電位

$$
V(r) = \frac{kQ}{r} \quad (\text{令 } V(\infty)=0)
$$

## 導體靜電平衡

導體達到靜電平衡時的四大特性：

1. **導體內電場為零**：$\mathbf{E}_{\text{in}} = 0$（若不等於零，電荷會繼續移動）
2. **淨電荷分布在表面**：內部無淨電荷（$Q_{\text{enc}} = 0$）
3. **表面為等位面**：表面電場垂直於表面，$E_{\text{surface}} = \dfrac{\sigma}{\varepsilon_0}$
4. **尖端放電**：曲率越大處表面電荷密度 $\sigma$ 越大 → 電場越強 → 空氣游離放電

**應用**：法拉第籠（靜電屏蔽）—— 中空導體內部不受外部電場影響。

## 電容與介電質

### 電容定義

$$
C = \frac{Q}{V}
$$

平行板電容器：$C_0 = \dfrac{\varepsilon_0 A}{d}$

### 插入介電質

插入相對介電常數 $\kappa$（或 $\varepsilon_r$）的介電質後：

$$
C = \kappa C_0 = \frac{\kappa \varepsilon_0 A}{d}
$$

**微觀機制**：介電質在外電場中發生**極化 (Polarization)**——分子內正負電荷中心分離，產生反向電場削弱內部電場，使板間電位差降低，從而使電容增加。

### 電容器儲能

$$
U = \frac12 CV^2 = \frac12 QV = \frac{Q^2}{2C}
$$

## 例題

**例題 1**：兩點電荷 $q_1 = 2\ \mu\text{C}$，$q_2 = 3\ \mu\text{C}$ 相距 $0.1$ m，求庫侖力。

**解**：
$F = kq_1q_2/r^2 = 9\times10^9 \times 2\times10^{-6} \times 3\times10^{-6} / 0.1^2$
$= 5.4\times10^{-2} / 0.01 = 5.4$ N

**例題 2**：$10\ \mu\text{F}$ 電容器充電至 $100$ V，求儲存電量和能量。

**解**：
$Q = CV = 10\times10^{-6} \times 100 = 10^{-3}$ C
$U = \frac12 CV^2 = \frac12 \times 10^{-5} \times 10000 = 0.05$ J

**例題 3**：平行板電容器板間電壓 $V = 500$ V，板距 $d = 5$ mm。一電子（$m_e = 9.11\times10^{-31}$ kg，$q_e = 1.6\times10^{-19}$ C）以 $v_0 = 2\times10^7$ m/s 水平射入平行板中央。求電子穿出極板時的豎直偏轉位移。

**解**：
$E = V/d = 500/0.005 = 10^5$ V/m
$a = qE/m = 1.6\times10^{-19} \times 10^5 / 9.11\times10^{-31} \approx 1.76\times10^{16}$ m/s²
板長 $L = 0.05$ m，穿出時間 $t = L/v_0 = 0.05 / 2\times10^7 = 2.5\times10^{-9}$ s
$y = \frac12 a t^2 = \frac12 \times 1.76\times10^{16} \times (2.5\times10^{-9})^2 \approx 0.055$ m $= 5.5$ cm

## 隨堂測驗

1. Gauss 定律 $\oint \vec{E}\cdot d\vec{A} = Q_{\text{enc}}/\varepsilon_0$ 中，高斯面上的電場由誰決定？
   - (A) 僅由 $Q_{\text{enc}}$ 決定
   - (B) 由 $Q_{\text{enc}}$ 和外部電荷共同決定 ✓
   - (C) 僅由外部電荷決定
   - (D) 與 $Q_{\text{enc}}$ 無關

2. 導體靜電平衡時，內部電場為？
   - (A) 最大
   - (B) 零 ✓
   - (C) 等於表面電場
   - (D) 隨深度變化

3. 插入介電常數 $\kappa$ 的介電質後，平行板電容變為？
   - (A) $C_0/\kappa$
   - (B) $\kappa C_0$ ✓
   - (C) $C_0$
   - (D) $\kappa^2 C_0$

4. 電場 $\mathbf{E}$ 與電位 $V$ 的微分關係為？
   - (A) $E = \nabla V$
   - (B) $E = -\nabla V$ ✓
   - (C) $E = \nabla \times V$
   - (D) $E = \nabla \cdot V$

5. 平行板電容器內部電場 $E$ 與下列何者無關？
   - (A) 板間電壓 $V$
   - (B) 板面積 $A$ ✓（$E = V/d = \sigma/\varepsilon_0$，$C = \varepsilon_0 A/d$ 中 $A$ 影響 $C$ 但不直接影響 $E$）
   - (C) 板間距 $d$
   - (D) 介電常數 $\varepsilon_0$

## 重點整理

- Coulomb 定律 $F = kq_1q_2/r^2$
- Gauss 定律 $\oint \vec{E} \cdot d\vec{A} = Q_{\text{enc}}/\varepsilon_0$，利用對稱性求 $E$
- $\mathbf{E} = -\nabla V$（電場指向電位降落方向）
- 導體靜電平衡：$\mathbf{E}_{\text{in}} = 0$，電荷在表面
- 電容 $C = \kappa\varepsilon_0 A/d$，儲能 $U = \frac12 CV^2$
- 帶電粒子在均勻電場中作拋物線偏轉：$a = qE/m$，$y = \frac12 at^2$

## 延伸閱讀

- [Coulomb 定律 - 維基百科](https://zh.wikipedia.org/zh-tw/库仑定律)
- [Gauss 定律](https://zh.wikipedia.org/zh-tw/高斯定律)
- [電容](https://zh.wikipedia.org/zh-tw/电容)
