---
layout: post
title: "Studying for Undergraduate Mathematics Exams"
---

Undergraduate mathematics is quite different from high school math, at least here
in Canada. Study habits that give good grades in high school don't translate
well to university, *especially* for mathematics courses.

I did my bachelor's degree in physics, with a math minor, and am now a PhD
student in math. Over the first few years as an undergraduate, I learned how
to study for math (and math-heavy courses like physics) in a way that let me do
pretty well. Now I have another perspective, having taught and graded math
courses at McGill and UW. These experiences inform the method that I am laying
out here.

As many students have asked me for help learning how to learn and study in their
math courses, I have had to formalize my learned method more and more, and have
decided it makes sense to simply share it online for anyone to try.

Even the most noble students care about getting good grades. The goal of this
study programme is to find a balance between optimizing for the
highest grade, and optimizing for long-term, deep understanding of the
mathematics. There is a happy correlation between understanding the material and
getting good grades!

Finally, this method aims to front-load the work that gives you the best payoff
for your effort. If you're reading this the night before an important exam,
getting through only the first step or two will put you much better off. The
later steps have diminishing returns - often the hardest problems on an exam are
worth only 10-20% of the grade.


Step 1: Definitions
------------------------

The easiest and most important step to studying mathematics is to understand
definitions. Many problems on quizzes and exams simply boil down to writing the
definition of everything in the problem, and then performing some very simple
algebraic manipulation. Although memorization is anathema to math students,
memorizing definitions is a highly efficient way to begin studying for a math course.

Begin by skimming through your course or lecture notes, and making a list of all
the definitions in the course. For example, in a first calculus class, this
might include
> convergent sequence, cauchy sequence, continuous at x, derivative
> f'(x), even function, odd function,...

Then, for each item in your list, find the definition and write it down, in
full. For example, you should be able to write "A sequence $\{x_i\}$ in
$\mathbb{R}$ is convergent if there exists a $L\in\mathbb{R}$ such that, for
every $\epsilon>0$, there exists a natural number $N$ such that, for all $n>N$,
we have $|x_n -L| < \epsilon$."

You should write these in sequential order of the course, as many later
definitions will depend on earlier definitions.

One problem I see students fall into, is forgetting the original definition of
something, in favour of a simpler characterization given by some theorem. For
example, the *definition* of `f is increasing` is "for all
$y>x$, $f(y)>f(x)$", but many students will say f is increasing is "$f^\prime(x)>0$".
This latter statement is a *theorem* which is usually true, but not always.
At least at the University of Waterloo, there are often questions on assessments
designed to fit into the edge cases, testing if students know the proper
definitions.

Once you have written down definitions for all the ideas in your course, try to
memorize them. You don't have to memorize them completely before moving on to
step 2, as you'll be using them in the later steps, which will help them stay in
your memory.

Step 2: Key Theorems and Key Problem Types
-------------------------

After definitions, the second most important things in a math course are the
theorems. However unlike definitions, there are typically too many little
theorems to fully memorize -- we're trying to get the most out of our time here.
Thus, we need some method to determine the *key* theorems in the course.

To do this, we're going to make another pass over the course material. This
time, you want to make a list of theorems. Theorems with names, like
*Intermediate Value Theorem* are clearly important, but many key theorems do not
have names, such as `If f is differentiable at a, then f is continuous at
a.`

After making the list of theorems, now go over the assignment questions,
practice questions, and any quiz or midterm problems that you have access to.
Categorize the problems into types, and for each type of problem, write down
what theorems are needed in the solution.

For example, one type of question would be `find the derivative of a function`,
and the theorems used include `chain rule, product rule, linearity of the
derivative` and so on.

Now, the *key theorems* are the ones that appear in many types of question. Just
like with the definitions, you should now go and write down all the key theorems
in full. Make sure you write down the *hypotheses* of the theorem, and not just
the conclusion. For example, when I ask students to tell me the Mean Value
Theorem, many say "$f^\prime(c) = \frac{f(b)-f(a)}{b-a}$". This is only the conclusion;
the full theorem is

"Let $f$ be continuous on $[a,b]$ and differentiable on
$(a,b)$, $a<b$. Then there exists $c\in(a,b)$ such that $f^\prime(c)=\frac{f(b)-f(a)}{b-a}$."

Knowing the hypothesis is critical for true and false or multiple choice
questions -- often the answer boils down to checking the hypotheses for a
suitable theorem.

If you've made it this far, I am very confident that you will pass the course,
and probably with a decent grade.

Step 3: Grinding Problems
-----------------------------

This step is very straight-forward. Just get homework problems and practice
problems, and do them. When you work out these problems, try to do it in a
test-like environment. If your exam is not open book, don't do practice problems
with your notes on hand. Don't do them in a group, and preferably do them
without music or anything, just like you're writing the exam.

Many students jump straight into problems when they're studying for an exam.
However, if you don't know the course's theorems, and *especially* if you don't
know the definitions, many problems will be exceedingly difficult. This leads to
students frequently needing to look up solutions, and exhausting the pool of
questions they can study "fresh".

However, now that you **know** your theorems and definitions, your success rate
on the problems should be much better. If you don't know how to approach a given
problem, begin by writing down the definitions in the question. Often, that will
make you see the correct approach. If not, start thinking about all the theorems
that apply to that problem type, and if their hypotheses hold in your problem.

Let me show you one example of this approach.

>Question: Let $f(x)$ be differentiable on $\mathbb{R}$. Furthermore, let $f(x)$
>be positive and concave up. Then show that $g=(f(x))^2$ is concave up.

To solve this, we begin by writing all the definitions:

We know:

>$f$ diff'able - $f^{\prime}(x)$ exists for all $x\in\mathbb{R}$
>
>$f$ positive - $f(x) > 0$
>
>$f$ concave up - $f^{\prime\prime}(x) > 0$
>
>$g = f^2$

and we need to prove:

>$g$ concave up - $g^{\prime\prime}(x) >0$.

Now its clear that the question is asking us to show $g''(x) >0$. So far, we may
not see how to do the problem, or why we need all these conditions on $f$, but
we have a clear starting point -- compute $g''(x)$.

$$g'' = (f^2)'' = (2f(x)f'(x))' = 2(f'(x))^2 + 2f(x)f''(x)$$

We suddenly have $f^\prime(x)$, $f^\prime(x)$ and $f^{\prime\prime}(x)$ showing up! Now it is obvious
how we need to use the conditions in the question. We use $f^{\prime\prime}(x)>0$ and
$f(x)>0$ to say $2f(x)f^{\prime\prime}(x)>0$, and we know any real number squared is
positive. Thus we can conclude $g^{\prime\prime}(x) >0$, finishing the problem.

Bonus Step 4: Understanding Proofs
----------------------------------------

With the first three steps completed, you're probably more prepared for the exam
then most of your classmates, and have nothing to fear from the exam. However,
if you want to *ace* the test, or if you just want to deeply understand the
    course material, there is another step to take. To be completely clear,
    you're now in the realm of diminishing returns for your grades.
    However, this is the richest territory for *understanding* the
mathematics.

For each of the key theorems you learned in class, there should be an
accompanying proof. In this step, you are going to analyze these proofs, to
understand why the theorem is true. For each theorem, I suggest the following
approach to understanding the proof.

a) Read the proof, and make sure you understand why each step follows from the
last.

b) Try to pick out a *key idea* behind the proof. Often the bulk of the proof is
just simple algebra, but there is one or two clever steps that you probably
wouldn't think of on the spot.

For example, for the proof of `f differentiable at a implies f continuous at a`,
the key idea would be "multiply the definition of the derivative by $(x-a)$".
The rest of the steps are straightforward to come up with if you know that key step.

c) Next, you'll analyze the hypotheses of the theorem. For each condition in the
hypothesis, identify where it is being used in the proof. Try to come up with an
counter example that shows why that hypothesis is necessary. Doing this will
help you understand exactly the role of each piece of the proof.


Conclusion
----------------

If you implement this method for your math course, I would love to hear how it
went! It worked well for me in my math and physics education, but perhaps it
doesn't work for everybody. Any feedback is welcome [here.](https://kaleb.ruscitti.ca/contact)
