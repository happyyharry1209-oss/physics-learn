---
slug: 09-waves-optics
title: 波動與光學
description: 正弦波方程與繩波波速、雙狹縫干涉強度分佈、單狹縫繞射、薄膜干涉、光電效應與截止電壓、物質波。
order: 9
topics: [波動, 干涉, 繞射, 薄膜干涉, 光電效應, 物質波, 半波損失]
---

## 前言

波動是能量傳遞的一種形式。光既是波也是粒子——這種雙重性開啟了近代物理的大門，從雷射到量子力學都源於此。

## 波的性質

### 正弦波方程

一維簡諧波沿 $x$ 方向傳播：
$$
y(x,t) = A\sin(kx - \omega t + \phi)
$$

- $A$：振幅
- $k = 2\pi/\lambda$：波數
- $\omega = 2\pi f$：角頻率
- $\phi$：相位常數

**波速**（由波動方程導出）：
$$
v = \frac{dx}{dt} = \frac{\omega}{k} = f\lambda
$$

### 繩波波速

波在張緊繩上的傳播速度：
$$
v = \sqrt{\frac{T}{\mu}}
$$

- $T$：繩張力 (N)
- $\mu$：繩的線密度 (kg/m)

## 疊加原理與干涉

兩波相遇時位移相加——這是**疊加原理**。

### 條件

- **建設性干涉**（亮紋）：路徑差 $= n\lambda$，$n=0,\pm1,\pm2,\dots$
- **破壞性干涉**（暗紋）：路徑差 $= (n+\frac12)\lambda$

### 楊氏雙狹縫干涉

**亮紋間距**：
$$
\Delta y = \frac{\lambda L}{d}
$$

**干涉強度分佈**（$d$ 為狹縫間距）：
$$
I(\theta) = I_0 \cos^2\left(\frac{\pi d \sin\theta}{\lambda}\right)
$$

**相干性 (Coherence)**：兩束光頻率相同、相位差恆定才能產生穩定干涉條紋。

### 薄膜干涉 (Thin-Film Interference)

光從折射率 $n$ 的薄膜上下表面反射時產生干涉：

**光程差**（垂直入射）：
$$
2 n t = \begin{cases}
(m+\frac12)\lambda & \text{建設性（半波損失奇數次）} \\
m\lambda & \text{破壞性（半波損失偶數次）}
\end{cases}
$$

**半波損失 (Phase Change on Reflection)**：光從折射率小的介質射向折射率大的介質時，反射光相位反轉（$\pi$ 相位跳變）。

**應用**：肥皂泡彩色條紋、抗反射鍍膜（相消干涉消除反射）。

## 繞射 (Diffraction)

波通過狹縫或障礙物時會彎曲擴散。

### 單狹縫繞射

**暗紋條件**：$a\sin\theta = n\lambda$，$n = \pm1, \pm2, \dots$

**中央亮帶寬度**：
$$
\Delta y_0 = \frac{2\lambda L}{a}
$$
中央亮帶寬度為其他亮帶的**兩倍**。

**光強分佈**（$a$ 為狹縫寬度）：
$$
I(\theta) = I_0 \left(\frac{\sin\alpha}{\alpha}\right)^2,\quad \alpha = \frac{\pi a\sin\theta}{\lambda}
$$

> 💡 繞射限制了光學儀器的解析度——這就是為什麼顯微鏡無法看到無限小的物體。

## 光電效應

光照射金屬表面使電子逸出，愛因斯坦提出**光子**概念解釋：

$$
hf = \phi + K_{\max}
$$

- $h = 6.63 \times 10^{-34}$ J·s（普朗克常數）
- $\phi$：功函數（金屬的束縛能）
- $K_{\max}$：逸出電子的最大動能

### 截止電壓 (Stopping Potential)

利用反向電壓 $V_s$ 使最大動能的電子恰好無法到達陽極：

$$
eV_s = K_{\max} = hf - \phi
$$

**$V_s$-$f$ 圖分析**：
- 斜率 = $h/e$（可測定普朗克常數）
- 與 $f$ 軸交點 = 底限頻率 $f_0 = \phi/h$

**重要結論**：
- 光的頻率 $<$ 底限頻率 → 無論光多強都不產生光電效應
- 光強度只影響電子數量，不影響電子動能

## 物質波（德布羅意波）

德布羅意提出：所有物質都具有波粒二象性。

**德布羅意波長**：
$$
\lambda = \frac{h}{p} = \frac{h}{mv}
$$

**電子波長**（經電壓 $V$ 加速後）：
$$
\lambda = \frac{h}{\sqrt{2m_e eV}} = \frac{h}{\sqrt{2m_e K}}
$$

質量越大的物體物質波長越短，波動性越不明顯。

## 例題

**例題 1**：雙狹縫 $d = 0.5$ mm，$L = 2$ m，$\lambda = 500$ nm。求 $\Delta y$。

**解**：
$\Delta y = \lambda L/d = 500 \times 10^{-9} \times 2 / (0.5 \times 10^{-3}) = 2$ mm

**例題 2**：光頻率 $6 \times 10^{14}$ Hz，功函數 $2.0$ eV，求 $K_{\max}$。

**解**：
$K_{\max} = hf - \phi = 4.14 \times 10^{-15} \times 6 \times 10^{14} - 2.0 = 2.48 - 2.0 = 0.48$ eV

**例題 3**：電子經 $100$ V 電壓加速，求德布羅意波長。（$m_e = 9.11\times10^{-31}$ kg，$e = 1.6\times10^{-19}$ C，$h = 6.63\times10^{-34}$ J·s）

**解**：
動能 $K = eV = 1.6\times10^{-17}$ J
$\lambda = \dfrac{h}{\sqrt{2m_e K}} = \dfrac{6.63\times10^{-34}}{\sqrt{2 \times 9.11\times10^{-31} \times 1.6\times10^{-17}}}$
$= \dfrac{6.63\times10^{-34}}{\sqrt{2.92\times10^{-47}}} = \dfrac{6.63\times10^{-34}}{5.40\times10^{-24}} \approx 1.23\times10^{-10}$ m $= 0.123$ nm

## 隨堂測驗

1. 雙狹縫干涉中，相鄰亮紋間距 $\Delta y =$？
   - (A) $\lambda d/L$
   - (B) $\lambda L/d$ ✓
   - (C) $Ld/\lambda$
   - (D) $dL\lambda$

2. 光電效應中，截止電壓 $V_s$ 與頻率 $f$ 的關係圖斜率為？
   - (A) $h$
   - (B) $h/e$ ✓
   - (C) $e/h$
   - (D) $\phi/e$

3. 單狹縫繞射中央亮帶寬度為其他亮帶的？
   - (A) 相等
   - (B) 2 倍 ✓
   - (C) 3 倍
   - (D) $1/2$ 倍

4. 電子經 $100$ V 加速後，其德布羅意波長約為？
   - (A) $1.23$ nm
   - (B) $0.123$ nm ✓
   - (C) $12.3$ nm
   - (D) $0.0123$ nm

5. 薄膜干涉中，半波損失發生在？
   - (A) 折射率小 → 折射率大時反射 ✓
   - (B) 折射率大 → 折射率小時反射
   - (C) 穿透光
   - (D) 所有光

## 重點整理

- 正弦波 $y = A\sin(kx - \omega t + \phi)$，$v = f\lambda = \sqrt{T/\mu}$
- 雙狹縫干涉 $\Delta y = \lambda L/d$，$I(\theta) = I_0\cos^2(\pi d\sin\theta/\lambda)$
- 單狹縫繞射 $a\sin\theta = n\lambda$，$I(\theta)=I_0(\sin\alpha/\alpha)^2$
- 薄膜干涉 $2nt = (m+\frac12)\lambda$（建設性），考慮半波損失
- 光電效應 $hf = \phi + K_{\max}$，$eV_s = hf - \phi$
- 德布羅意波長 $\lambda = h/p = h/\sqrt{2mK}$

## 延伸閱讀

- [光電效應 - 維基百科](https://zh.wikipedia.org/zh-tw/光电效应)
- [雙狹縫干涉](https://zh.wikipedia.org/zh-tw/双缝实验)
- [薄膜干涉](https://zh.wikipedia.org/zh-tw/薄膜干涉)
- [波粒二象性](https://zh.wikipedia.org/zh-tw/波粒二象性)
