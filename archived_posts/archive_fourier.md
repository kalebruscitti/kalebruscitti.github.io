---
layout: post
title:  "Joseph Fourier Never Lets Me Down"
date:   2018-04-14
categories: problems
---
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=TeX-MML-AM_CHTML' async></script>

I came across this little challenge at work this week. I've been working on setting up this optoelectrical device called a Digital Micromirror Device. I will probably write some more details on that device later on, but essentially think of it as a device with small mirror pixels that can be modulate the phase and amplitude of light that reflects of it. We want to use the device to correct for phase abberations in our optical system. The way we'd do this is to measure the phase error on the light reflecting off each pixel, and set that pixel's phase to be the negative of the error, cancelling it out.

The challenge comes when you try to measure the phase error at each pixel. We put the DMD in the Fourier plane of a lens, which means that the collimated light from the DMD is being Fourier transformed by the lens, so that the light at the len's focus is the Fourier transform of the light reflecting from the DMD. This means that turning on one pixel of the DMD should give you a simple sine wave at the focus. (Really a very wide sinc function, since the pixels have some finite spatial extent.) The trick then is to turn on a reference pixel who we define to have 0 phase, and then turn on each other pixel one at the time, and measure the interference pattern caused by the overlapping sine wave from the pixel and the reference.

{: style="text-align:center"}
![Interference Pattern]({{ "/interference.png" }})

Now to measure the interference pattern, one of my co-workers suggested "just do a Fourier transform - it is the sum of two waves". Of course, an interference pattern of two waves, I should just take a Fourier transform and easily get the phase difference. It was so obvious I was a little embarrassed I hadn't thought of it. So I go into python and do a Fast-Fourier Transform on the data and get this:

Which is not the two nice little peaks I was expecting. Then I remembered that a beam profiler measures the light intensity, not the amplitude. The Fourier transform had failed me! The intensity is the square of the amplitude so we have the following:

$$I(x) = a^2 + b^2 + 2ab\cos\big(\frac{2\pi}{\lambda}(\sin(\gamma)x + (1-\cos(\gamma))z) + \phi\big)$$

Where the z term accounts for the constant phase that the light picks up while propagating from the DMD to the focus. If you are more observant I was, you might notice that this is in the form of a constant term, $$a^2 + b^2$$, and a cosine wave. In particular, the constant term explains the one big peak at $$k = 0$$. To get the phase difference of the cosine wave, we can look at the component of the Fourier spectrum where $$k = \frac{2\pi}{\lambda}\sin(\gamma)$$, the frequency of the cosine. This gives us the cosine phase, $$\phi_0$$, but what we really want is the phase difference $$\phi$$. So,

$$\phi_0 = \frac{2\pi}{\lambda}(1-\cos(\gamma))z + \phi$$

$$\phi = \phi_0 - \frac{2\pi}{\lambda}(1-\cos(\gamma))z$$

There we have it, the Fourier transform didn't fail me after all.


