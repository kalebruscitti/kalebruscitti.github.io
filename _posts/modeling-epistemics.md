---
layout: post
title: "Knowledge is a Correct, Verified Model"
---

Let me define what a mean by a *model*. A *model* is a
process for predicting some *output values* $\{y_i\}$, given
a set of *input values* $\{x_i\}$. A model comes with
*assumptions*, which are the conditions which must be met
for the model to be valid.

For example, let's describe a model for the position
of a moving object.

Model A
---------
For model A, our inputs will be the position vector of the
object at time $t_i$, $\vec{x}(t_i)$, and its speed $v$. The
output value is the position at a later time $t_f$. The
prediction process is to predict that $\vec{x}(t_f) =
\vec{x}(t_i) + (t_f-t_i)\vec{v}$.

The assumptions of this model are that 1. the object obeys
Newton's laws, and 2. the object is moving with constant
motion.

A *correct* mathematical model is one where the predictions
follow from the assumptions. That is, there is a
mathematical proof that if all the assumptions are true,
then the prediction is true.

A *verified* model is one that has been empirically checked.
One verifies a model by setting up an experiment with known
input values, using the model to predict the output values,
and then letting the process run and measuring the output
values. If the real output values match the predicted ones,
then the model is verified. (For stocastic models, one needs
to run the experiment repeatedly, and then we can say that
the model is verified up to some confidence level.)

Here I want to put forth the thesis that knowledge is a
correct, verified model. That is, we *know* something is
true, if we have a correct verified model which predicts it.

If we have a correct model, then we have a formal proof that
the conclusions of the model follow from the assumptions.
Therefore, if the assumptions are true, the conclusion is *a
priori* true. Therefore, we need a way to determine the
truth value of the assumptions.

note to self -- one cannot simply verify the assumptions
experimentally. Consider the following pathological
example:

Assumptions 0==1
Inputs $\emptyset$
Outputs (1+1 == 2)

If A implies B and B is true, is that evidence for A being
true? Surely it cannot be, as (false) => (true).

Given two sets of hypothesis H and H', one of the following
must be true:
If (H'=> A) then (H => P) --> yoneida lemma ??
there exists A s.t. (H => A) and (H'!=> A)
"distinguishing hypothesis problem...?"

Probably need to test if !H => P ?

