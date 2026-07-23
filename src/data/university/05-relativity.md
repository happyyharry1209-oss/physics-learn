---
slug: 05-relativity
title: 狹義與廣義相對論
description: Lorentz 變換與四維時空、相對論動力學、等效原理、愛因斯坦場方程、Schwarzschild 解與黑洞、重力波。
order: 5
topics: [Lorentz變換, 四維時空, 等效原理, 時空彎曲, Schwarzschild解, 黑洞, 重力波, 霍金輻射]
---

## 前言

愛因斯坦的相對論徹底改變了人類對時空的理解。狹義相對論（1905）統一了空間與時間，廣義相對論（1915）將重力解釋為時空彎曲的幾何效應。

## 狹義相對論

### 兩個基本假設

1. **相對性原理**：物理定律在所有慣性系中形式相同
2. **光速不變原理**：真空光速恆為 $c$，與光源運動無關

### Lorentz 變換

慣性系 $S'$ 以速度 $v$ 沿 $x$ 方向相對 $S$ 運動，$\gamma = 1/\sqrt{1-v^2/c^2}$：

$$
x' = \gamma(x - vt), \quad t' = \gamma\left(t - \frac{v}{c^2}x\right)
$$

### 四維時空

**四維位置向量**：$x^\mu = (ct, x, y, z)$

**時空間隔**（Lorentz 不變量）：
$$
ds^2 = -c^2dt^2 + dx^2 + dy^2 + dz^2
$$

- $ds^2 < 0$：**類時**（有因果關係，可通過低於光速的粒子連接）
- $ds^2 = 0$：**類光**（光錐面，僅光子可達）
- $ds^2 > 0$：**類空**（無因果關係，需超光速才能連接）

### 相對論動力學

**四維動量**：$p^\mu = (E/c, \mathbf{p})$

**能量-動量關係**：$E^2 = p^2c^2 + m^2c^4$

| 粒子狀態 | 能量 | 動量 |
|:--------:|:----:|:----:|
| 靜止 ($v=0$) | $E_0 = mc^2$ | $0$ |
| 低速 ($v\ll c$) | $E \approx mc^2 + \frac12mv^2$ | $p \approx mv$ |
| 極高速 ($v\rightarrow c$) | $E \rightarrow \infty$ | $p \rightarrow \infty$ |
| 光子 ($m=0$) | $E = pc = hf$ | $p = h/\lambda$ |

## 廣義相對論

### 等效原理

**弱等效原理**：慣性質量 = 重力質量（實驗精度 $10^{-13}$）。

**愛因斯坦等效原理**：在局部範圍內，無法區分重力場和加速系。自由落體電梯中的觀察者無法分辨自己是處於失重狀態還是在無重力的太空中。

### 時空彎曲

物質告訴時空如何彎曲，彎曲的時空告訴物質如何運動。

### 愛因斯坦場方程

$$
G_{\mu\nu} = R_{\mu\nu} - \frac12 g_{\mu\nu}R = \frac{8\pi G}{c^4}T_{\mu\nu}
$$

- 左邊 $G_{\mu\nu}$：時空曲率（幾何）
- 右邊 $T_{\mu\nu}$：物質分布（物理）
- $g_{\mu\nu}$：度規張量——描述時空結構的核心

這是一組 10 個獨立的非線性偏微分方程，解析解極其有限。

## Schwarzschild 解與黑洞

### 史瓦西度規

球對稱不旋轉質量的外部時空：

$$
ds^2 = -\left(1 - \frac{r_s}{r}\right)c^2dt^2 + \left(1 - \frac{r_s}{r}\right)^{-1}dr^2 + r^2d\Omega^2
$$

其中 **Schwarzschild 半徑** $r_s = 2GM/c^2$。

### 黑洞無毛定理

黑洞僅由**三個參數**完整描述：質量 $M$、電荷 $Q$、角動量 $J$。

### 四大經典驗證

1. **水星近日點進動**：Newton 引力無法解釋的每世紀 43 角秒
2. **光線彎曲**：星光經過太陽附近偏折 $1.75$ 角秒（1919 年日食證實）
3. **重力紅移**：光在重力場中逃逸時頻率降低（Pound-Rebka 實驗）
4. **重力波**：時空曲率的漣漪，2015 年 LIGO 首次探測到

### 霍金輻射

量子效應使黑洞蒸發：

$$
T_H = \frac{\hbar c^3}{8\pi GM k_B}
$$

超大質量黑洞的溫度僅 $\sim 10^{-7}$ K，幾乎不輻射；微型黑洞溫度極高，會快速蒸發。

## 宇宙學應用

### Friedmann 方程

$$
\left(\frac{\dot{a}}{a}\right)^2 = \frac{8\pi G}{3}\rho - \frac{k}{a^2} + \frac{\Lambda}{3}
$$

- $a(t)$：宇宙尺度因子
- $\Lambda$：宇宙常數（暗能量）
- $k$：空間曲率（$-1,0,1$）

### Hubble 定律

$v = H_0 d$，$H_0 \approx 70$ km/s/Mpc

## 例題

**例題 1**：粒子以 $v=0.8c$ 運動，求 $\gamma$ 和 $p$。

**解**：
$\gamma = 1/\sqrt{1-0.8^2} = 5/3 \approx 1.667$
$p = \gamma mv = 1.667 \times 0.8mc = 1.333 mc$

**例題 2**：太陽的 $r_s$？（$M_\odot \approx 2\times10^{30}$ kg）

**解**：
$r_s = 2GM/c^2 \approx 2.96$ km

## 隨堂測驗

1. 時空間隔 $ds^2 < 0$ 對應？
   - (A) 類空
   - (B) 類時 ✓
   - (C) 類光
   - (D) 無意義

2. 愛因斯坦場方程 $G_{\mu\nu} =$？
   - (A) $8\pi G T_{\mu\nu}/c^2$
   - (B) $8\pi G T_{\mu\nu}/c^4$ ✓
   - (C) $4\pi G T_{\mu\nu}/c^4$
   - (D) $8\pi G T_{\mu\nu}$

3. 黑洞無毛定理指出黑洞由幾個參數描述？
   - (A) 1
   - (B) 2
   - (C) 3 ✓（$M, Q, J$）
   - (D) 無限多

4. 霍金輻射溫度 $T_H \propto$？
   - (A) $M$
   - (B) $1/M$ ✓（$T_H \propto 1/M$）
   - (C) $M^2$
   - (D) $\sqrt{M}$

5. 2015 年 LIGO 首次直接探測到？
   - (A) 黑洞
   - (B) 重力波 ✓
   - (C) 暗物質
   - (D) 希格斯粒子

## 重點整理

- Lorentz 變換 $\gamma = 1/\sqrt{1-v^2/c^2}$，四維動量 $p^\mu = (E/c,\mathbf{p})$
- 時空間隔 $ds^2 = -c^2dt^2 + d\mathbf{r}^2$（類時/類光/類空）
- 等效原理：局域重力 $\Leftrightarrow$ 加速系
- Einstein 場方程 $G_{\mu\nu} = 8\pi G T_{\mu\nu}/c^4$
- Schwarzschild 半徑 $r_s = 2GM/c^2$
- 黑洞無毛定理：$M, Q, J$；霍金輻射 $T_H \propto 1/M$
- 重力波證實了時空彎曲的最終預言

## 延伸閱讀

- [廣義相對論 - 維基百科](https://zh.wikipedia.org/zh-tw/广义相对论)
- [Schwarzschild 解](https://zh.wikipedia.org/zh-tw/史瓦西度规)
- [LIGO 重力波探測](https://www.ligo.org)
