---
layout: post
title: "applied invariant theory"
---


### Motivation 

Consider a plane moving in a fixed direction with velocity $p$, and let $w$ be the wind velocity  in the same direction. 
Let $V = \{ (p, w) \in \mathbb{R}^2 \}$ denote the vector space of possible values for $p$ and $w$. 
We've all learned how statements like "p=100" are physically meaningless, as theyre lacking units. Instead one must say something like "p=100 km/h". 
How can we understand units as a rigourous mathematical model? Choosing a unit of speed gives us a choice of basis for the vector space $V$. 
For example, if we choose m/s as our unit, then the velocity $p \text{ m/s}$ is equal to $p \cdot (1 \text{ m/s})$, and any vector in $V$ can be written as 

$$
    \begin{bmatrix}
        p \text{ m/s} \\
        w \text{ m/s}
    \end{bmatrix} = 
    p \cdot \underbrace{\begin{bmatrix}
        1 \text{ m/s}\\
        0 
    \end{bmatrix}}_{e_1} +
    w \cdot \underbrace{\begin{bmatrix}
        0 \\
        1 \text{ m/s}
    \end{bmatrix}}_{e_2}.
$$

These vectors $e_1$ and $e_2$ give us a basis of $V$ determined by the unit m/s.
If we instead decided to use km/h, we'd obtain a similar basis which we can call $b_1$ and $b_2$. As $1\text{ m/s} = 3.6 \text{ km/h}$, we know that

$$
\begin{bmatrix}
    1 \text{ m/s}\\
    0 
\end{bmatrix} = 
3.6
\begin{bmatrix}
    1 \text{ km/h}\\
    0 
\end{bmatrix},
$$

that is, $e_1 = 3.6 ~b_1$ and similarly $e_2 = 3.6 ~b_2$. More generally, for any non-zero scalar $t\in\mathbb{R}^\ast$, we can define a new unit $u:=t \text{ m/s}$ and get a new basis $te_1, te_2$ for $V$.

Now any function $f(p,w):V\to \mathbb{R}$ should take units into consideration. For example, if the plane has mass $m$ (say in kg) then its kinetic energy using m/s is 

$$E_{\text{m/s}}(p,w) = \frac{1}{2}m (p\text{ m/s})^2 = \frac{1}{2}mp^2 (\text{m/s})^2.$$ 

If we instead worked with our unit $u = t \text{ m/s}$, then we would instead have a speed of

$$E_{u}(p,w) = \frac{1}{2}m (p~u)^2 = \frac{1}{2}mp^2 t^2 (\text {m/s})^2.$$

As $E_{u}(p,w) = t^2 E_{\text{m/s}}(p,w)$, we see that to convert the energy of the plane from units of $\text{kg} \text{ m}^2/\text{s}^2$ to units of $\text{kg }u^2$, we must multiply by $t^2$.
However certain quantities don't require any unit conversion factors. For example, let $R(p,w) = p/w$ be the ratio of the plane speed to the wind speed. Then

$$R_{u}(p,w) = \frac{p~t\text{ m/s}}{w~t\text{ m/s}} = \cancel{\frac{t}{t}}\left(\frac{p \text{ m/s}}{w \text{ m/s}}\right) = \left(\frac{p \text{ m/s}}{w \text{ m/s}}\right) = R_{\text{m/s}}(p,w).$$

In physics, they'd call $R$ a *dimensionless quantity*, but in pure mathematics we'd call it an *invariant*.

### Invariants and Semi-Invariants


#### Group actions
Let's formalize this. Let $X$ be any set (such as $V$ from before) and let $G$ be any group (such as $\mathbb{R}^\ast$ from before). 
An *action* of $G$ on $X$ is a map $\mu:X\times G \to X$ that tells us how we "apply an element of $G$ to $X$". 
In the velocity example, an element $t\in \mathbb{R}^\ast$ is "applied" to an element $v=(p,w) \in V$ by multiplying, which we encode as $\mu:\mathbb{R}^\ast \times X\to X$ given by $\mu(t, v) = tv$. When we are only working with one group action $\mu$, we will write $\mu(g,x)$ as $g\cdot x$.

If you've never seen group actions before, they're worth learning about in their own right. Group actions formalize our understanding of symmetry as it is used in applied mathematics. Given an action $\mu$ of $G$ on $X$, one should think of $G$ as a 'group of symmetries' for objects in the set $X$. 
For example, let $G=\mathbb{Z}/2\mathbb{Z}$ be the group with two elements $1$ and $-1$, and let $X=\{f:\mathbb{R}\to \mathbb{R}\}$ be the set of functions $y=f(x)$. 
Then we can define an action $\mu:G\times X\to X$ by defining $\mu(1,f)(x) = f(x)$ and $\mu(-1,f)(x) = f(-x)$; in our $\cdot$ notation that is $(1\cdot f)(x) = f(x)$ and $(-1\cdot f)(x) = f(-x)$.
The graph of $(-1\cdot f)$ is the graph of $f$ flipped over the $y$-axis, and a function $f$ is symmetric over the $y$-axis if $(-1\cdot f) = f$. 


#### Characters of a group

Now suppose that we have an action of $G$ on $X$, and we are interested in real valued functions $X\to \mathbb{R}$. Let $F$ denote the ring of such functions under pointwise addition and multiplication. 
You should have in mind the energy and ratio functions $E$ and $R$ from our velocity example, with $X=V$ and $G=\mathbb{R}^\ast$. We saw that applying a change of units to an element $v\in V$ required us to make a corresponding change of units to the function $E(v)$; the change of units from $\text{m/s}$ to $u$ took $E_{\text{m/s}}$ and gave us a new function $E_u$.