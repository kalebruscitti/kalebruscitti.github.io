---
layout: post
title: LLMs as a Search Interface for Mathematics Research 
---
### Contents
1. [Searching for Evidence with Perplexity](#evidence-search)
2. [An Example](#an-example)
3. [Effective Usage Requires Expertise](#expertise)
4. [Hallucination Risks and Responsible Usage](#responsible-usage)
5. [Conclusion](#conclusion)

Over the last 6 weeks, I have been using [Perplexity](https://perplexity.ai) as a search
engine to help me with my PhD research. I have been very impressed with how
useful it is, and would like to share how I use it, and how it benefits me.
Before continuing, I should disclose that this is not a paid ad, but everyone in
my university did recieve a 1-year free trial of Perplexity, which I am using.

In terms of Baron's *search-inference* framework for thinking[^1], Perplexity
greatly speeds up the search for *evidence*, and possibly also the search for
*possibilities*. However, it isn't very useful in the *inference* portion of
thinking.

[^1]: *Thinking and Deciding*, Jonathan Baron, 2008

The search-inference framework splits the process of thinking up into **searching**
for goals, possibilities, and evidence, and using the evidence to **infer**
    which possibilities best achieve the goals. As Baron notes, we already use
    tools to aid the search-process, including traditional search engines, and
    it is here that I think LLMs can improve our thinking process.

### Searching for Evidence with Perplexity {#evidence-search}

For me, thinking about mathematics research roughly looks like:
1. Find a goal, which can be a vague research goal or a specific lemma to
       prove.
2. Search for possible approaches that could solve the goal. 
3. For each approach, look for evidence that it could succeed or fail. For
       example, this could be papers that use the approach to solve similar
       problems.
4. Sit down and try applying the most promising approach to solve the
       problem (I.e. *infer* if the approach solves the goal)
5. Repeat steps 2-4 until the goal is solved or I give up.

It is step 3 that I have found the most success with LLM-powered search. I can
imagine it being useful for step 2 as well, but I haven't tried it very much
yet.

#### An Example
Now let me give a specific example, and show how Perplexity helped me with 
step 3. The *Grauert Direct Image Theorem* tells us when there is an isomorphism
between fibres of a flat family of coherent sheaves. In my current project, I
am using this theorem to show two vector spaces are isomorphic, but the
definition of the isomorphism is very abstract. I want to understand how the
isomorphism is constructed, so I can apply it to a specific example.

After reading the relevant section in Hartshorne (Chapter III Section 12), I was
still not clear on how to geometrically interpret this isomorphism. Thus, I used Perplexity
to search for other people's interpretations online. You can see the entire
search session for yourself [by clicking on this link.](https://www.perplexity.ai/search/state-the-grauert-direct-image-fwLsRK0dSXyaqLl4m0b96w)

The key part of the session came when I asked `Can you find how people
geometrically interpret the residue field at a point?` To which I got the
answer:
>The residue field at a point in algebraic geometry has several geometric interpretations:
>
>1. **Natural codomain for functions**: The residue field can be viewed as the natural codomain for functions defined at a given point on the scheme[3]. This interpretation aligns with the idea that the residue field represents the possible values that functions can take at the point.
>
>2. **Evaluation of sections**: For any local section s ∈ 𝒪X(U) and any point x ∈ U, we can consider the "value of s at x" as sx = s̄ ∈ κ(x), where κ(x) is the residue field. This allows us to evaluate sections at points of the scheme[3].
>
>3. **Coordinates of points**: The residue field is sometimes described as the "natural domain" for the coordinates of the point[2]. This interpretation is particularly relevant for closed points of varieties over algebraically closed fields.
>
>4. **Field of rational functions**: For the generic point of a variety, the residue field can be interpreted as the field of rational functions on the variety[3]. This field consists of "coherent collections of values at closed points" that extend to compatible germs, which then glue to rational functions.
>
>5. **Fiber over a point**: When considering morphisms between schemes, the residue field plays a crucial role in understanding the fiber over a point. For a morphism f: X → Y and a point y ∈ Y, the fiber f^(-1)(y) is closely related to the residue field κ(y)[5].
>
>6. **Geometric points**: A morphism Spec(K) → X, where K is a field, is equivalent to giving a point x ∈ X and an extension K/κ(x)[2]. This interpretation allows us to think of geometric points as field-valued points of the scheme.
>
>These interpretations collectively demonstrate how the residue field bridges the gap between the algebraic structure of schemes and their geometric properties, providing a crucial tool for understanding the local behavior of schemes at individual points[5].
>
>Citations:
>
>[1] https://ncatlab.org/nlab/show/residue+field
>
>[2] https://en.wikipedia.org/wiki/Residue_field
>
>[3] https://math.stackexchange.com/questions/4271962/what-is-the-meaning-of-the-residue-field-of-a-point-in-scheme
>
>[4] https://math.stanford.edu/~vakil/725/class10.pdf
>
>[5] https://www.math.fsu.edu/~agashe/ag/lec22_24.pdf

The second interpretation stood out, as the morphism defined by evaluation of
sections plays an important role in the problem I am studying. Before jumping
into the references to understand exactly what was meant, I decided to ask for a
bit more clarification: `Point 2 in your response is interesting. If I have a
coherent sheaf over a scheme, can I evaluate sections of that sheaf using
residue fields?` 

In response to this, I got a mathematical explanation of how to use the residue
field to evaluate sections. This is where it is important to be responsible --
LLMs are not built to accurately do technical mathematics. However, in this
case, I've seen this construction before, and I know enough to be comfortable
that the answer is correct enough to accept. **Critically** when I wrote up this
section of my paper, I went to the original sources and worked through the steps
myself, to ensure that they're correct. 

#### Effective Use Requires Expertise {#expertise}

In my experience, this tool is more of a force-multiplier then something which
solves problems on its own. The domain-expertise of the human operator is a key
component of using Perplexity effectively. I find it most effective for two
specific types of query, both very common in my research:
1. *Reminding me of technical details*. 
    Often I come across a situation where I know that I've learned some
    mathematical results which may be useful for my goal, but I can't remember
    the specific details. Perplexity can very quickly find the exact statement
    in the online literature, much faster than I could look it up in a textbook
    or lecture notes myself.

2. *Finding standard results*.
    Based on my mathematical intuition, I sometimes expect there to be a result
    of a specific form in the standard literature. In this case, I'll ask
    Perplexity `Are there any results for object X that relate property A
    and property B?`, and if there is a standard result, it finds it quickly.
    Again, this is much faster than the alternative of looking in textbooks,
    online course notes and asking colleagues.

These two types of query essentially perfectly play into the strengths of LLMs,
being that they read much faster than me, and are good at providing summaries
of natural-language documents. These are also queries with very low risk of
causing you to make mistakes in your work. This is because the LLMs essentially
acts as a search engine, pointing you to the primary sources that you can then
evaluate as you would if you found them on Google or in a library.

However both of these query types require you to have some expertise in the
subject area already! Without the years of math training I have, I would have no
intuition and no previous knowledge suggesting what I should be asking the LLM.
For these reasons, if you're just beginning your research journey in math or
science, I strongly suggest that you avoid using LLM/AI tools and focus instead
on building your own expertise, at least while you're doing course work.

### Hallucination Risks and Responsible Usage {#responsible-usage}

I would be remiss to speak positively about the usage of LLM tools in academia
without discussing the possibility for inappropriate usage. I think the usage
I've laid out above is equivalent, from an academic integrity perspective, to
using Google or similar to find online articles, reading them yourself, and then
using that information in your research.

Just like how you shouldn't take a claim from StackExchange and paste it into a
research paper without independently understanding and verifying the claim, you
should also not take a statement from Perplexity and paste it into your paper.
Responsible usage of these tools requires you to do the legwork verifying what
you found, with the original sources.

Compared with other LLM tools like ChatGPT, Perplexity makes responsible use
easier, which is why I am much more optimistic about it than other tools I've
tried. It seems that Perplexity has some safeguards against hallucinations -- in
the search session about Grauert's theorem above, I asked 
`How does $phi_p$ (the isomorphism) act on a single element?`, and got a very
wordy reply that essentially said `I don't know, I can't find it in the search results.`

Combining this with direct links to the sources, which I **always** check before
making use of anything I find on Perplexity, I feel confident that I can use LLM
search responsibly. However again, this requires the *expertise* to evaluate the
results and the primary sources.

Having said that, I can easily imagine someone less responsible may take results
directly from Perplexity and putting them in their work. This could lead them to
plagarise work without citation, or to simply making false claims. In my
opinion, this is about the same as someone copy-pasting from StackOverflow or
similar, although Perplexity definitely speeds up the process.

### Conclusion

If you do research and have some expertise in your domain, give Perplexity a try
to speed up the search portion of your research. Use it like you would Google or
StackOverflow -- be skeptical and verify what you find. Even if you're
LLM-skeptic, I think LLM powered search is one of the *actual*, non-hype
*viable* use cases for LLMs.

If you're an aspiring
researcher, focus more on building your expertise. The tools will keep evolving,
and who knows what the best tools will be when you're a researcher yourself.
Knowledge of tools is easy to obtain and gets obsoleted quickly. On the other
hand, domain expertise and independent thinking skills are hard to obtain and
probably won't be obsoleted any time soon.

