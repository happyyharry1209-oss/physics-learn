---
slug: 01-classical-mechanics
title: 古典力學（完整大學課程）
description: 轉動慣量張量、平行/垂直軸定理、阻尼 Q 因子、分析力學 Lagrangian/Noether 定理、混沌雙擺、流體力學 Navier-Stokes。
order: 1
topics: [向量, 運動學, 牛頓定律, 功與能, 動量, 轉動, SHM, Q因子, Lagrangian, 諾特定理, 混沌]
---

## 數學基礎

### 單位與量綱分析
SI 單位制：m, kg, s, A, K, mol, cd。量綱分析檢驗公式：$[v]=LT^{-1}$, $[a]=LT^{-2}$, $[F]=MLT^{-2}$, $[E]=ML^2T^{-2}$。

### 向量代數
$\vec{A}\cdot\vec{B}=AB\cos\theta$, $\vec{A}\times\vec{B}=AB\sin\theta\,\hat{n}$（右手定則）。

### 微積分基礎
$v=dx/dt$, $a=dv/dt$, $x=\int v\,dt$, $\frac{d}{dt}f(g(t))=f'(g(t))g'(t)$。

---

## 運動學 (Kinematics)

### 一維運動
$\bar{v}=\Delta x/\Delta t$, $\bar{a}=\Delta v/\Delta t$, $v=dx/dt$, $a=dv/dt$。

### 等加速五大公式
$v=v_0+at$, $x=x_0+v_0t+\frac12at^2$, $v^2=v_0^2+2a(x-x_0)$, $x-x_0=\frac{v_0+v}{2}t$, $\Delta x=aT^2$。

初速為零比例：$v_1:v_2:v_3=1:2:3$, $\Delta x_1:\Delta x_2:\Delta x_3=1:3:5$。

### 自由落體與豎直上拋
$v=gt$, $h=\frac12gt^2$, $v^2=2gh$。
豎直上拋：$v=v_0-gt$, $h=v_0t-\frac12gt^2$, $H_{\max}=v_0^2/2g$, $T=2v_0/g$。

### 拋體運動
$x=v_0\cos\theta\cdot t$, $y=v_0\sin\theta\cdot t-\frac12gt^2$。
$T=2v_0\sin\theta/g$, $H=v_0^2\sin^2\theta/2g$, $R=v_0^2\sin2\theta/g$。

### 等速圓周運動
$v=\omega r$, $a_c=v^2/r=\omega^2 r$, $\omega=2\pi/T$。

---

## 牛頓運動定律

$F=ma$, FBD 分析法。Atwood 機：$a=(m_2-m_1)g/(m_1+m_2)$, $T=2m_1m_2g/(m_1+m_2)$。
斜面：$a=g(\sin\theta-\mu_k\cos\theta)$。

---

## 功與能

$W=\int F\,dx$, $K=\frac12mv^2$, $W_{\text{net}}=\Delta K$。
$U_g=mgh$, $U_s=\frac12kx^2$, $\vec{F}=-\nabla U$。

---

## 動量與碰撞

$\vec{J}=\int\vec{F}\,dt=\Delta\vec{p}$, $v_{1f}=\frac{m_1-m_2}{m_1+m_2}v_{1i}+\frac{2m_2}{m_1+m_2}v_{2i}$, 火箭方程 $\Delta v=v_e\ln(m_0/m_f)$。

---

## 轉動 (Rotation)

### 轉動慣量張量

對於非對稱三維剛體，轉動慣量是二階張量：
$$
\mathbf{I} = \int (r^2 \mathbf{1} - \mathbf{r}\otimes\mathbf{r})\,dm = \begin{pmatrix}
I_{xx} & I_{xy} & I_{xz} \\
I_{yx} & I_{yy} & I_{yz} \\
I_{zx} & I_{zy} & I_{zz}
\end{pmatrix}
$$

其中 $I_{xx} = \int (y^2+z^2)dm$, $I_{xy} = -\int xy\,dm$，其餘分量類推。

**平行軸定理**（任意軸 $\parallel$ 通過質心軸，距離 $d$）：
$$
I = I_{CM} + Md^2
$$

**垂直軸定理**（適用於薄板，$z$ 軸垂直板面）：
$$
I_z = I_x + I_y
$$

### Euler 方程式
在主軸座標系中，剛體轉動方程：
$$
\tau_1 = I_1\dot{\omega}_1 - (I_2-I_3)\omega_2\omega_3,\quad \tau_2 = I_2\dot{\omega}_2 - (I_3-I_1)\omega_3\omega_1,\quad \tau_3 = I_3\dot{\omega}_3 - (I_1-I_2)\omega_1\omega_2
$$

---

## 簡諧運動 (SHM)

### 基本方程
$\frac{d^2x}{dt^2}+\omega^2x=0$, $x(t)=A\cos(\omega t+\phi)$, $\omega=\sqrt{k/m}$, $T=2\pi\sqrt{m/k}$。
$E=\frac12kA^2$。

### 阻尼振盪的 Q 因子 (Quality Factor)
運動方程 $m\ddot{x}+b\dot{x}+kx=0$。對於欠阻尼系統，定義**品質因子**：
$$
Q = \frac{\omega_0}{\Delta\omega} = \frac{\omega_0 m}{b}
$$
其中 $\Delta\omega$ 為共振峰的半高全寬 (FWHM)。$Q$ 值越高，共振峰越尖銳，能量耗散越慢。

| $Q$ 值 | 阻尼程度 | 共振尖銳度 | 例子 |
|:------:|:--------:|:----------:|:----:|
| $>1000$ | 極低 | 極尖銳 | 石英晶體振盪器 |
| $10-100$ | 低 | 尖銳 | 音叉、樂器弦 |
| $1-10$ | 中等 | 明顯 | 汽車避震器 |
| $<1$ | 高 | 無明顯共振 | 臨界/過阻尼 |

### 受迫振動
$m\ddot{x}+b\dot{x}+kx=F_0\cos(\omega_d t)$，共振時 $\omega_d\approx\omega_0$ 振幅最大。

---

## 萬有引力
$F=GMm/r^2$, $U(r)=-GMm/r$, $v_{\text{esc}}=\sqrt{2GM/R}$。
Kepler 定律：$T^2=4\pi^2 a^3/GM$。

---

## 流體力學
$P=P_0+\rho gh$, $F_b=\rho gV_{\text{排}}$, Bernoulli $P+\frac12\rho v^2+\rho gh=\text{const}$。
Navier-Stokes：$\rho\frac{D\vec{v}}{Dt}=-\nabla P+\mu\nabla^2\vec{v}+\rho\vec{g}$。

---

## 分析力學

### Lagrangian 力學

**最小作用量原理**：$\delta S = 0$，其中 $S = \int L\,dt$，$L = T - V$。

**Euler-Lagrange 方程**：
$$
\frac{d}{dt}\left(\frac{\partial L}{\partial\dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0
$$

### 經典範例：雙擺 (Double Pendulum)

考慮兩質量 $m_1,m_2$，兩擺長 $L_1,L_2$，廣義座標 $(\theta_1,\theta_2)$。

**動能**：$T = \frac12 (m_1+m_2)L_1^2\dot{\theta}_1^2 + \frac12 m_2 L_2^2\dot{\theta}_2^2 + m_2 L_1 L_2\dot{\theta}_1\dot{\theta}_2\cos(\theta_1-\theta_2)$

**位能**：$V = -(m_1+m_2)gL_1\cos\theta_1 - m_2 g L_2\cos\theta_2$

**Lagrangian**：$L = T - V$，代入 Euler-Lagrange 得到兩個耦合的二階非線性微分方程。此系統對初始條件極度敏感——這就是**混沌 (Chaos)** 的典型表現。

### Hamiltonian 力學

**廣義動量** $p_i = \partial L/\partial\dot{q}_i$，**Hamiltonian** $H = \sum p_i\dot{q}_i - L = T + V$。

**正則方程**：
$$
\dot{q}_i = \frac{\partial H}{\partial p_i},\quad \dot{p}_i = -\frac{\partial H}{\partial q_i}
$$

### 諾特定理 (Noether's Theorem)

若作用量 $S$ 在連續變換下不變（$\delta S=0$），則存在對應的守恆量：

| 對稱性 | 變換 | 守恆量 | 數學表達 |
|:------:|:----:|:------:|:--------:|
| 時間平移 | $t\to t+\epsilon$ | 能量 $H$ | $\frac{dH}{dt}=0$ |
| 空間平移 | $x\to x+\epsilon$ | 動量 $p$ | $\frac{dp}{dt}=0$ |
| 空間旋轉 | $\theta\to\theta+\epsilon$ | 角動量 $L$ | $\frac{dL}{dt}=0$ |

諾特定理是理論物理中最深刻的結果之一，連結了時空幾何與守恆律。

### 混沌雙擺模擬（詳見下方互動 Canvas）

雙擺運動由以下耦合微分方程描述：

$$
(m_1+m_2)L_1\ddot{\theta}_1 + m_2L_2\ddot{\theta}_2\cos(\theta_1-\theta_2) + m_2L_2\dot{\theta}_2^2\sin(\theta_1-\theta_2) + (m_1+m_2)g\sin\theta_1 = 0
$$
$$
m_2L_2\ddot{\theta}_2 + m_2L_1\ddot{\theta}_1\cos(\theta_1-\theta_2) - m_2L_1\dot{\theta}_1^2\sin(\theta_1-\theta_2) + m_2g\sin\theta_2 = 0
$$

此系統無解析解，需用 Runge-Kutta 數值積分。初始條件的微小差異會導致截然不同的運動軌跡。

---

## 例題

**例題 1**：用 Euler-Lagrange 方程推導單擺運動。

**解**：
廣義座標 $q=\theta$。
$L = T-V = \frac12 m L^2\dot{\theta}^2 - mgL(1-\cos\theta)$
$\frac{\partial L}{\partial\dot{\theta}} = mL^2\dot{\theta}$, $\frac{\partial L}{\partial\theta} = -mgL\sin\theta$

Euler-Lagrange：
$\frac{d}{dt}(mL^2\dot{\theta}) + mgL\sin\theta = 0$
$\ddot{\theta} + \frac{g}{L}\sin\theta = 0$

小角度近似 $\sin\theta\approx\theta$：$\ddot{\theta} + \frac{g}{L}\theta = 0$，得 $\omega = \sqrt{g/L}$, $T = 2\pi\sqrt{L/g}$。

**例題 2**：利用平行軸定理求均質細桿繞一端垂直軸的 $I$。

**解**：
$I_{CM} = \frac{1}{12}ML^2$，一端距離 $d=L/2$。
$I = I_{CM} + Md^2 = \frac{1}{12}ML^2 + M(L/2)^2 = \frac13ML^2$。

## 隨堂測驗

1. Euler-Lagrange 方程 $\frac{d}{dt}(\partial L/\partial\dot{q}_i) - \partial L/\partial q_i = 0$ 來自？
   - (A) Newton 第二定律
   - (B) 最小作用量原理 $\delta S=0$ ✓
   - (C) 能量守恆
   - (D) 動量守恆

2. 平行軸定理 $I = I_{CM} + Md^2$ 中 $d$ 代表？
   - (A) 物體的長度
   - (B) 兩軸之間的垂直距離 ✓
   - (C) 物體的半徑
   - (D) 質心到轉軸的距離

3. 阻尼振盪的品質因子 $Q = \omega_0 m/b$，$Q$ 值越大代表？
   - (A) 阻尼越強
   - (B) 共振峰越尖銳 ✓
   - (C) 頻率越低
   - (D) 振幅越小

4. 諾特定理指出，空間平移對稱性對應的守恆量是？
   - (A) 能量
   - (B) 動量 ✓
   - (C) 角動量
   - (D) 電量

5. 雙擺系統屬於什麼動力學行為？
   - (A) 線性
   - (B) 混沌 ✓（對初始條件極度敏感）
   - (C) 週期性
   - (D) 可解析求解

## 重點整理

- 轉動慣量張量 $\mathbf{I}$ 描述三維剛體轉動，平行/垂直軸定理簡化計算
- Q 因子 $Q = \omega_0 m/b = \omega_0/\Delta\omega$，高 $Q$ = 低耗散、高選擇性
- Lagrangian $L=T-V$，Euler-Lagrange 推導運動方程
- 諾特定理：對稱性 $\leftrightarrow$ 守恆律
- 雙擺是混沌系統的經典範例

## 延伸閱讀

- MIT 8.01/8.223: Classical Mechanics (ocw.mit.edu)
- Goldstein, *Classical Mechanics*
- [Noether 定理](https://zh.wikipedia.org/zh-tw/诺特定理)
- [混沌理論](https://zh.wikipedia.org/zh-tw/混沌理论)
