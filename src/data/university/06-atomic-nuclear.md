---
slug: 06-atomic-nuclear
title: 原子與核物理
description: 精細結構常數與自旋-軌道耦合、Zeeman/Stark 效應、Bethe-Weizsäcker 公式、殼層模型與魔數、核分裂/融合、放射性定年。
order: 6
topics: [精細結構, Zeeman效應, 液滴模型, Bethe-Weizsäcker公式, 殼層模型, 核融合, 核分裂, 放射性衰變]
---

## 前言

原子物理研究電子結構與光譜，核物理探索原子核的組成、穩定性和反應。兩者共同構成近代物理的重要基石。

## 原子精細結構

### 精細結構常數

$$
\alpha = \frac{e^2}{4\pi\varepsilon_0\hbar c} \approx \frac{1}{137}
$$

這個無量綱常數在量子電動力學中至關重要。

### 自旋-軌道耦合

電子自旋與軌道角動量的相互作用導致能階分裂：

$$
\Delta E_{SO} \propto \frac{\mathbf{L}\cdot\mathbf{S}}{r^3}
$$

總角動量 $\mathbf{J} = \mathbf{L} + \mathbf{S}$，$j = |l-s|, \dots, l+s$。

精細結構修正：
$$
E_{fs} = E_n\left[1 + \frac{\alpha^2}{n}\left(\frac{1}{j+1/2} - \frac{3}{4n}\right)\right]
$$

### 超精細結構與 21 cm 譜線

核自旋 $\mathbf{I}$ 與電子總角動量 $\mathbf{J}$ 耦合產生超精細分裂。氫原子基態超精細躍遷波長 21 cm——這是天文學繪製星系氫氣分布的關鍵工具。

## 原子在電磁場中

### Zeeman 效應

原子在磁場 $B$ 中譜線分裂：
$$
\Delta E = \mu_B g_J m_j B
$$

| 類型 | 條件 | 特徵 |
|:----:|:----:|:----:|
| 正常 Zeeman | 自旋為 0 | 分裂成 3 條 |
| 異常 Zeeman | 自旋 $\neq 0$ | 分裂成多條 |
| Paschen-Back | 強磁場 | 耦合被打破 |

### Stark 效應

原子在電場中的譜線偏移與分裂。

### 選擇定則

允許的電偶極躍遷：$\Delta l = \pm 1$，$\Delta j = 0, \pm 1$，$\Delta m_j = 0, \pm 1$。

## 原子核結構

### 液滴模型與 Bethe-Weizsäcker 公式

原子核被視為不可壓縮的帶電液滴，結合能由五項貢獻構成：

$$
B = a_V A - a_S A^{2/3} - a_C\frac{Z(Z-1)}{A^{1/3}} - a_A\frac{(A-2Z)^2}{A} + \delta(A,Z)
$$

| 項 | 名稱 | 公式 | 意義 |
|:--:|:----:|:----:|:----:|
| $a_V A$ | 體積項 | $a_V \approx 15.5$ MeV | 核力飽和性，與體積成正比 |
| $-a_S A^{2/3}$ | 表面項 | $a_S \approx 16.8$ MeV | 表面核子受力較少，能量降低 |
| $-a_C Z(Z-1)/A^{1/3}$ | 庫侖項 | $a_C \approx 0.72$ MeV | 質子間電斥力 |
| $-a_A (A-2Z)^2/A$ | 對稱項 | $a_A \approx 23$ MeV | 質子數 ≈ 中子數最穩定 |
| $\delta$ | 配對項 | $\pm a_P A^{-1/2}$ | 成對核子更穩定 |

### 殼層模型與魔數

核子填充離散的能階（類似電子殼層）。**魔數 (Magic Numbers)** 處的原子核特別穩定：

$$
2, 8, 20, 28, 50, 82, 126
$$

具有魔數個質子或中子的原子核，其結合能異常高，穩定性遠高於鄰近核種。

## 放射性衰變

### 衰變類型

| 類型 | 粒子 | 穿透力 | 屏蔽 |
|:----:|:----:|:------:|:----:|
| $\alpha$ 衰變 | $^4$He 核 | 弱（~cm 空氣） | 紙張 |
| $\beta^-$ 衰變 | 電子 + $\bar{\nu}_e$ | 中（~mm Al） | 鋁板 |
| $\beta^+$ 衰變 | 正電子 + $\nu_e$ | 中 | 鋁板 |
| $\gamma$ 衰變 | 高能光子 | 強（~cm Pb） | 鉛、混凝土 |

### 衰變定律

$N(t) = N_0 e^{-\lambda t}$，半衰期 $T_{1/2} = \ln 2/\lambda \approx 0.693/\lambda$。

### $\alpha$ 衰變的量子穿隧

$\alpha$ 粒子藉由量子穿隧效應穿過庫侖障壁逃離原子核——這是由 Gamow 首先提出的理論。

## 核反應

### 核分裂

$^{235}\text{U} + n \rightarrow ^{236}\text{U}^* \rightarrow \text{碎片} + 2\text{-}3n + \sim 200$ MeV

- 連鎖反應：分裂中子引發更多分裂
- 臨界質量：維持自持續鏈反應的最小質量

### 核融合

$^2\text{H} + ^3\text{H} \rightarrow ^4\text{He} + n + 17.6$ MeV

**太陽的 p-p 鏈**（質子-質子鏈反應）：
$$p + p \rightarrow ^2\text{H} + e^+ + \nu_e + 0.42\ \text{MeV}$$

後續反應最終產生 $^4$He，釋放約 26.7 MeV。

## 例題

**例題 1**：$^{235}$U 半衰期 $7.04\times10^8$ 年，求衰變常數。

**解**：
$\lambda = \ln 2/T_{1/2} = 0.693/7.04\times10^8 \approx 9.84\times10^{-10}$ yr⁻¹

**例題 2**：初始 $10^{20}$ 個 $^{235}$U 原子，21.12 億年後剩餘數量。

**解**：
21.12 億年 = 3 個半衰期，$N = 10^{20} \times (1/2)^3 = 1.25\times10^{19}$

## 隨堂測驗

1. 精細結構常數 $\alpha \approx$？
   - (A) $1/137$ ✓
   - (B) $1/100$
   - (C) $1/1000$
   - (D) $1/50$

2. Bethe-Weizsäcker 公式中的 $a_S A^{2/3}$ 項代表？
   - (A) 體積項
   - (B) 表面項 ✓
   - (C) 庫侖項
   - (D) 對稱項

3. 魔數 (Magic Number) 不包括？
   - (A) $2$
   - (B) $126$
   - (C) $100$ ✓（魔數：2,8,20,28,50,82,126）
   - (D) $82$

4. $\alpha$ 衰變穿過庫侖障壁的機制是？
   - (A) 熱激發
   - (B) 量子穿隧 ✓
   - (C) 相對論效應
   - (D) 電磁感應

5. 核融合 D-T 反應產物是？
   - (A) $^3$He + n
   - (B) $^4$He + n ✓
   - (C) $^4$He + p
   - (D) $^3$H + p

## 重點整理

- 精細結構常數 $\alpha \approx 1/137$，自旋-軌道耦合 ${\bf L\cdot S}$
- Zeeman 效應 $\Delta E = \mu_B g_J m_j B$
- Bethe-Weizsäcker 公式：體積 + 表面 + 庫侖 + 對稱 + 配對
- 魔數：$2,8,20,28,50,82,126$
- $\alpha$ 衰變利用量子穿隧，$\beta$ 衰變涉及微中子
- 核融合是太陽和未來能源的方向

## 延伸閱讀

- [核物理 - 維基百科](https://zh.wikipedia.org/zh-tw/原子核物理学)
- [Bethe-Weizsäcker 公式](https://zh.wikipedia.org/zh-tw/贝特-魏茨泽_公式)
- [核融合 - ITER](https://www.iter.org)
