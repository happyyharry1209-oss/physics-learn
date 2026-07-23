---
slug: 02-electromagnetism
title: 電磁學（完整大學課程）
description: 邊界條件、影像法、Poisson/Laplace 方程、D/H/P/M 介質響應、磁向量勢與規範變換、複數阻抗與趨膚深度。
order: 2
topics: [靜電學, Gauss定律, 泊松方程, 介質響應, 磁向量勢, 規範變換, RLC諧振, 趨膚深度]
---

## Maxwell 方程組（微分形式）

$$
\nabla\cdot\mathbf{E} = \frac{\rho}{\varepsilon_0},\quad \nabla\cdot\mathbf{B} = 0
$$
$$
\nabla\times\mathbf{E} = -\frac{\partial\mathbf{B}}{\partial t},\quad \nabla\times\mathbf{B} = \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
$$

---

## E1 靜電學

### Coulomb 定律與電場
$F = kq_1q_2/r^2$, $\vec{E} = kQ\hat{r}/r^2$, $\oint\vec{E}\cdot d\vec{A} = Q_{\text{enc}}/\varepsilon_0$。

### 電位與電場梯度
$V_B - V_A = -\int_A^B \vec{E}\cdot d\vec{r}$, $\mathbf{E} = -\nabla V$, $\nabla^2 V = -\rho/\varepsilon_0$（Poisson 方程）。

### Poisson 方程與 Laplace 方程

由 Gauss 定律微分形式 $\nabla\cdot\mathbf{E} = \rho/\varepsilon_0$ 與 $\mathbf{E} = -\nabla V$ 得：

**Poisson 方程**：
$$
\nabla^2 V = -\frac{\rho}{\varepsilon_0}
$$

在無電荷區域（$\rho=0$）退化為 **Laplace 方程**：
$$
\nabla^2 V = 0
$$

**分離變數法**：在直角座標、球座標、柱座標中求解。

### 導體靜電平衡
$\mathbf{E}_{\text{in}}=0$, 電荷在表面, $E_{\text{surface}}=\sigma/\varepsilon_0$, 尖端放電。

### 邊界條件 (Boundary Conditions)

在兩種介質的介面上（1 和 2），電磁場滿足：

$$
E_{1t} = E_{2t} \quad (\text{切向電場連續})
$$
$$
D_{1n} - D_{2n} = \sigma_f \quad (\text{法向電位移差} = \text{自由面電荷密度})
$$

其中 $D_{1n} = \varepsilon_1 E_{1n}$, $D_{2n} = \varepsilon_2 E_{2n}$。

### 影像法 (Method of Images)

用虛擬電荷代替導體表面的感應電荷分布。

**範例**：點電荷 $q$ 距接地導體平面 $d$ → 用 $-q$ 置於平面另一側 $d$ 處替代。空間中任意點的電位：
$$
V(x,y,z) = \frac{kq}{\sqrt{x^2+y^2+(z-d)^2}} - \frac{kq}{\sqrt{x^2+y^2+(z+d)^2}}
$$

---

## E2 介質中的電磁場

### 電介質與電位移向量

介質極化 → 束縛電荷 $\rho_b = -\nabla\cdot\mathbf{P}$。

**電位移向量**：
$$
\mathbf{D} = \varepsilon_0\mathbf{E} + \mathbf{P} = \varepsilon\mathbf{E}
$$

Gauss 定律在介質中：$\nabla\cdot\mathbf{D} = \rho_f$（僅自由電荷）。

### 磁性材料與磁場強度

磁化 → 束縛電流 $\mathbf{J}_b = \nabla\times\mathbf{M}$。

**磁場強度**：
$$
\mathbf{H} = \frac{\mathbf{B}}{\mu_0} - \mathbf{M}
$$

Ampère 定律在介質中：$\nabla\times\mathbf{H} = \mathbf{J}_f$（僅自由電流）。

---

## E3 磁向量勢與規範

### 磁向量勢 $\mathbf{A}$

由 $\nabla\cdot\mathbf{B} = 0$ 可引入磁向量勢：
$$
\mathbf{B} = \nabla\times\mathbf{A}
$$

### 電磁位與規範變換

電磁位 $(\mathbf{A}, V)$ 與場的關係：
$$
\mathbf{B} = \nabla\times\mathbf{A},\quad \mathbf{E} = -\nabla V - \frac{\partial\mathbf{A}}{\partial t}
$$

**規範變換 (Gauge Transformation)**：
$$
\mathbf{A}' = \mathbf{A} + \nabla\chi,\quad V' = V - \frac{\partial\chi}{\partial t}
$$

電磁場 $(\mathbf{E}, \mathbf{B})$ 在規範變換下不變。

**常用規範**：
- **Coulomb 規範**：$\nabla\cdot\mathbf{A} = 0$（簡化靜磁問題）
- **Lorenz 規範**：$\nabla\cdot\mathbf{A} + \frac{1}{c^2}\frac{\partial V}{\partial t} = 0$（相對論協變）

---

## E4 交流電路與電磁波

### 複數阻抗 (Phasor Impedance)

交流電路中，電壓和電流用複數表示：
$$
\tilde{V} = \tilde{I} Z
$$

**阻抗**：
- 電阻：$Z_R = R$
- 電感：$Z_L = j\omega L$（電壓領先電流 $90^\circ$）
- 電容：$Z_C = \frac{1}{j\omega C} = -\frac{j}{\omega C}$（電壓落後電流 $90^\circ$）

**RLC 串聯**：$Z = R + j(\omega L - \frac{1}{\omega C})$
**諧振頻率**：$\omega_0 = 1/\sqrt{LC}$

### 趨膚深度 (Skin Depth)

高頻交流電在導體中傳播時，電流集中在表面。

**趨膚深度** $\delta$（電流密度降至 $1/e$ 的深度）：
$$
\delta = \sqrt{\frac{2}{\omega\mu\sigma}}
$$

| 頻率 | 銅的 $\delta$ | 應用 |
|:----:|:------------:|:----:|
| 50 Hz | 9.3 mm | 電力輸送 |
| 1 kHz | 2.1 mm | 音頻訊號 |
| 1 MHz | 66 μm | 無線電 |
| 1 GHz | 2.1 μm | 微波/5G |

---

## 重點整理

- Poisson 方程 $\nabla^2 V = -\rho/\varepsilon_0$，Laplace 方程 $\nabla^2 V = 0$
- 邊界條件：$E_{1t}=E_{2t}$, $D_{1n}-D_{2n}=\sigma_f$
- 影像法：用虛電荷代替感應電荷
- 介質中：$\mathbf{D} = \varepsilon_0\mathbf{E}+\mathbf{P}$, $\mathbf{H} = \mathbf{B}/\mu_0 - \mathbf{M}$
- 磁向量勢 $\mathbf{B} = \nabla\times\mathbf{A}$，規範變換不改變場
- 複數阻抗 $Z_R=R$, $Z_L=j\omega L$, $Z_C=1/j\omega C$
- 趨膚深度 $\delta = \sqrt{2/\omega\mu\sigma}$

## 延伸閱讀

- Griffiths, *Introduction to Electrodynamics*
- Jackson, *Classical Electrodynamics*
- [Poisson 方程](https://zh.wikipedia.org/zh-tw/泊松方程)
- [規範變換](https://zh.wikipedia.org/zh-tw/规范场论)
- [趨膚深度](https://zh.wikipedia.org/zh-tw/集膚效應)
