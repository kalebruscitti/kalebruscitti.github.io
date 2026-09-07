---
layout: post
title: "Statistical Analysis of the Hunllef Fight"
abstract: An analysis of T1 versus T2 prep, the importantance of combat stats, and the effect of player skill on the fight time.
---

With the [2026 Summer Sweep Up](https://oldschool.runescape.wiki/w/Update:Summer_Sweep-Up_2026) changing Corrupted Gauntlet's preparation phase, I decided to start my Corrupted Gauntlet grind in Old School Runescape, and like any good MMO playing mathematician, I wanted to optimize my performance as much as possible. 
To do this, I've used the [Gauntlet Performance Tracker](https://runelite.net/plugin-hub/show/gauntlet-performance-tracker) RuneLite plugin to save various performance metrics about my runs, allowing me to analyze them. 
I've also written a [Hunllef fight simulator](/cg-sim/), so that I can measure how much the different factors in the fight affect the average fight time.

Using this combination of empirical and theoretical analysis, we can find an informed answer to the following questions:

- [How much does player skill affect DPS?](#player-skill-and-dps)
- [Should you do T1 or T2 Prep?](#should-you-do-t1-or-t2-prep)
- [Do Ranged and Magic levels matter?](#do-ranged-and-magic-levels-matter)
- [Does Defense level Matter?](#do-defense-levels-matter)
- [How much GP/hr is realistic while learning CG?](#gold-per-hour)

The answers I came to won't be shocking to any experienced OSRS PvMers, as they align with conventional wisdom that I've seen on Reddit and YouTube. 
Despite that, getting at these answers in a more rigourous fashion can help mathematically-minded players like me get a better understanding of PvM mechanics.


## Empirical Data

To start my grind, I did 49 successful runs (KC) with T2 prep (Tier 2 armor + two Tier 3 weapons). 
This took a total of 74 runs, not counting the runs I did in January to get my first 1KC after unlocking the Gauntlet initially, which were not tracked.
These runs took place between August 22nd and September 5th, with a median of 8 runs a day on the days that I played Runescape.
My character's combat stats were 84 Attack, 87 Strength, 89 Ranged, 83 Defense, 84 Magic and 77 Prayer, and I have both Rigour and Augury. 
I've since swapped to T1 prep runs, but as I've only done 14 T1 runs so far I haven't included this data for analysis.

### Estimated Winrate
The first statistic we can look at is the estimated probability that I will win the next run. Improving your winrate is the most effective way to reduce the length of your Gauntlet grind, since every lost run is a wasted ~9-11 minutes.

<figure float="center">
  <img src="{{site.baseurl}}/images/Winrate.png" width="80%"/>
  <figcaption> Estimated probability of winning the next run, given the series of runs beforehand. The predictions are made using a Kalman filter. </figcaption>
</figure>

At the beginning of the dataset, I wasn't very familiar with the Hunllef fight, so my probability of winning is under 0.5. 
As you'd expect, as I got more experienced my winrate climbed, with the final estimate being that I have an 87% chance of winning my next CG run. I expect that if I continued for another 10-20 runs, this winrate would probably begin to plateau somewhere around 90%.

For difficult content like the Gauntlet, I find that trying to push my winrate higher and higher is a really great motivator. If you go 50 KC with no armor seed drop, it can feel like the 50 KC was pointless (I was not so unlucky). But when you see how much your winrate has improved over that 50 KC, it helps you realize how much quicker the next 50 KC will be.

### Defensive Performance

  For our simulator, I want to get some statistics on the defensive performance of a learner (i.e. me for the first ~20 KC) and a proficient player (i.e. me for the rest of the data). 
  The first thing we can look at is the DPS taken in each fight, which goes down consistently as I improved.

  <figure float="center">
    <img src="{{site.baseurl}}/images/DPS taken.png" width="80%"/>
    <figcaption> DPS taken during each Hunllef fight. Colour indicates whether the run was won or lost. </figcaption>
  </figure>

For the simulator, I want to have some empirical averages for the defensive performance of a leaning player and a proficient player. I'll use the data from my first 30 runs for the learning player, and the data from my last 30 runs as the proficient player. 
For the first 30 runs, here is are the averages of my defensive performance:

|        | Wrong defensive prayer | Tramples | Tornado hits | Floor tile hits |
|--------|------------------------|----------|--------------|-----------------|
| Median |            3           |     0    |       3      |        1        |
| Mean   |          3.53          |   0.70   |     4.30     |       1.40      |

  And here are the averages for my last 30 runs:

|        | Wrong defensive prayer | Tramples | Tornado hits | Floor tile hits |
|--------|------------------------|----------|--------------|-----------------|
| Median |            0           |    0    |       1      |        1        |
| Mean   |          0.77          |   0.25   |     2.45     |       1.45      |

This gives us two nice presets for our simulator, as well as a 'perfect play' preset representing no defensive mistakes.

## Fight Simulator

In addition to my empirical data, I wanted to understand theoretically how much my combat stats and fight performance was affecting my winrate and time taken in the Hunllef fight. 
I also wanted to be able to get some theoretical data on the fight-time difference between T1 prep and T2 prep. 

Instead of fully simulating the Hunllef fight tick-by-tick, I used the following approach:

1. Roll player attacks until reaching 1000 damage dealt, alternating between ranged and magic every 5 attacks.
2. Compute the "pre-food" fight length $L$ as 4 ticks * the number of attacks in step 1 * the Used ticks percentage.
3. Now roll $\lfloor L/5.5 \rfloor$ many Hunllef attacks and `n_tornado_hits` many Tornado hits, adding the damage together to get damage $D$.
4. Compute the number of food `n_food` needed to survive $D$ damage, and add 3`n_food` ticks to the fight length.
5. If the number of ticks added in step 4 is greater than 5.5, roll more Hunllef attacks, and repeat steps 3 and 4 until the number of ticks added is less than 5.5.

The Hunllef has a 5 tick attack speed, but it does a stomp when it summons tornados,  reducing its average attack speed. From my empirical data I computed that, on average, the Hunllef attacks every 5.5 ticks; this is where the 5.5 in step 3 comes from.

Although this is an approximation of a proper fight simulator, when I use my own player combat levels, the output statistics of the simulator match my empirical statistics well. One big limitation is that I haven't implemented melee attacks for the player. After implementing attack roll calculations for magic and ranged and then manually punching in all the stats of Hunlleff and the crystal weapons, I didn't feel like doing a *third* combat style. I only rarely used the Halberd during my runs so far, so it doesn't feel worth the effort.

If you want to use the simulator to follow along with the article, [it is available here](/cg-sim/) (the webpage was vibe coded but the simulator itself was not).


## Player Skill and DPS

It is obvious that player skill is important for fighting the Hunllef; if you can't swap your overhead prayers and dodge tornados, you will just die. It is less obvious that player skill affects DPS. 
Other than swapping your weapon, your character just attacks, and the DPS is determined by your weapon and combat stats, right? 

<figure float="center">
  <img src="{{site.baseurl}}/images/DPS.png" width="80%"/>
  <figcaption> DPS dealt to Hunllef in each run. The black line is a Gaussian rolling average (sigma=5). </figcaption>
</figure>

There is a lot of variance in the DPS every run, just due to the RNG nature of Runescape combat. However, the black line shows a rolling average of DPS, and that average slowly but steadily increased as I got better at the fight. 

The "DPS calculator" theoretical DPS with my stats is about 5.32. However, I never broke 5 DPS, and usually had between 3 and 4 DPS in my successful runs. 
This should be expected as there are multiple factors that cause us to lose DPS in the fight. Eating food causes attack delay and drops DPS, attacking with the wrong offensive style, and losing ticks while moving to dodge tornados all lower our DPS.

By far the most important of these factors is the DPS lost to "wasted ticks", meaning ticks that we could have been attacking but weren't. This is tracked as "Tick loss" in the Gauntlet Performance Tracker. If you only use 85% of the possible ticks during which you could be attacking, it is a direct 15% hit to your expected DPS[^1]. 

<figure float="center">
  <img src="{{site.baseurl}}/images/TickLoss.png" width="80%"/>
  <figcaption> Percentage of ticks used in each run. The black line is a Gaussian rolling average (sigma=5). </figcaption>
</figure>

For this reason, pushing your ticks used to 90-95% is one of the best ways you can improve your Hunllef fight time and winrate. 
In comparison, missing an offensive switch wastes 4 ticks. With a median fight time of 458 ticks across all my won runs, each missed switch is equivalent to losing 0.87% of my used ticks. My median missed offensive switches across won runs is 2/run, meaning I could gain an approximately 1.7% DPS boost by not missing switches.

Finally, we can use the simulator to compare my performance statistics against someone with perfect play. The perfect player saves about **45 seconds on average** with T1 prep and 20 seconds on average with T2 prep.

[^1]:Before factoring in ticks used eating food, which is minor.

## Should you do T1 or T2 Prep?

Short answer: **Do T2 for the first ~50 KC**, and swap to T1 if you've gotten very proficient at the Hunllef fight.

One important factor affecting your Gauntlet grind is whether to make Tier 1 armor (T1 Prep) or Tier 2 armor (T2 Prep). Before the Summer Sweep Up changes, the online consensus seems to be that T1 prep saves 1min 30s-2min over T2 prep, though in my experience after the Sweep Up changes, it is closer to 1min-1min 30s.

As taking extra damage causes you to eat more, T1 prep fights should be longer on average than T2 prep fights [^2]; but how much longer? I ran 10000 simulation fights for a character with level 90 combats, who has 90% ticks used, never hits the wrong defensive prayer, and hits one wrong offensive prayer per fight on average:

<figure float="center">
  <img src="{{site.baseurl}}/images/TimeDistribution.png" width="80%"/>
  <figcaption> Distribution of time in Hunllef fight (n=10000) for T1 and T2 prep.</figcaption>
</figure>

As the average T1 fight takes 233 seconds and the average T2 fight takes 214 seconds,  a T2 fight will be **19s** faster on average for this player. 
Factoring the prep time, this means that a T1 Gauntlet run is still faster then a T2 run, but only by 40s-1min 40s instead.

With this in mind, if you **win every Hunlleff fight**, you should be doing T1 prep. If your T1 runs are 1 min 10s faster on average, you will save **7 hours and 47 minutes** over 400 KC.

However, if you **don't** win every Hunllef fight, then we have to take into account the effect that your winrate has on the total time taken to hit a certain KC number. For example, my estimated winrate is ~0.87 for T2 prep. Therefore to get 400 KC, I'd need to make 460 CG runs. From my T1 runs so far, my estiamted T1 winrate is 0.58. Let's say I improve it to 0.75 with practice. Then the total number of runs needed to get 400 KC is 534. 

If my T2 prep takes 6 minutes on average, and my T1 prep takes 4 min 30s on average, then 460 T2 CGs takes 66h 21m, and 534 T1 CGs takes 75h 19m! With these winrates, it would actually be faster for me to do T2 prep.

When you're first learning the Hunllef fight, you are going to be making mistakes that you can survive with T2 armor but not T1 armor. Your T2 winrate will be significantly higher than T1, meaning you will hit your first 50 KC much faster doing T2 prep. 
The Hunllef fight mechanics are exactly the same on T1 and T2 prep, so all those T2 prep fights will be teaching you mechanics that transfer over to T1 prep. 
For this reason, I recommend **learning the Hunllef fight doing T2 prep**, and only changing over to T1 prep when you've gotten a decent winrate (>0.85) at T2 prep.

If you have an estimate of your T2 and T1 winrates and average prep times, you can use the simulator's KC time section to compute which will be faster for you specifically.

## Do Ranged and Magic Levels Matter?

Short answer: **Yes**, and a Ranged level is worth 2 Magic levels.

To determine how much a given combat level matters for CG clear times, we can hold all the other levels of our simulated player constant, and then vary the skill we are interested in. First, let's fix a Magic and Defense level of 90, and then vary Ranged level from 70-99 and compute the average length of a Hunllef kill:

<figure float="center">
  <img src="{{site.baseurl}}/images/Ranged.png" width="80%"/>
  <figcaption> Average Hunllef fight length as a function of Ranged level, for a player with 90 Mage/Defense. The line of best fit slope for T1 is -1.88 s/lvl, and for T2 is -1.77 s/lvl. </figcaption>
</figure>

For T1 prep, the slope of the line of best fit is -1.88 s/lvl, meaning that every Ranged level reduces the average time of a T1 prep Hunllef fight by 1.88 seconds. It is notable that, unlike Magic and Defense, Ranged level actually has theoretical DPS breakpoints where the max hit of the T3 Bow goes up by one (for example at 91 Ranged). These breakpoints appear subtly in the graph, but they don't matter that much compared with the natural DPS variation due to RNG.

Next we can do the simulation for Magic level, fixing Ranged and Defense at 90: 

<figure float="center">
  <img src="{{site.baseurl}}/images/Magic.png" width="80%"/>
  <figcaption> Average Hunllef fight length as a function of Magic level, for a player with 90 Ranged/Defense. The line of best fit slope for T1 is -0.80 s/lvl, and for T2 is -0.73 s/lvl.</figcaption>
</figure>

Here the slope is telling us that each Magic level saves around 0.8s per fight. Although saving 1.8 or 0.8 seconds per level per fight is small, the difference between level 85 Ranged and Magic vs level 92 Ranged/Magic is ~18 seconds/fight. 
Over 400 KC that saves you 2 hours if you never die, and even more if the quicker fights improves your winrate.


## Do Defense Levels Matter?

Short answer: **Not really**.

Using the fight simulator we can compute the average amount of damage taken as a function of defense level, for a player with a given Ranged/Mage level and performance metrics.

For example, if we take a relatively low level player with 85 Ranged and 80 Magic, we can run 1000 simulated fights with a defense level of 70 and compute the average damage taken, and repeat for each defense level from 70-99. This lets us compute how much damage each defense level saves, on average. We'll assume the player gets hit by 4 Tornados and misses 2 defensive prayers per fight, since defense levels are most important when you make defensive mistakes. 

With T1 armor, each defense level saves this player 0.919 damage on average per fight, and with T2 armor it is 0.932 damage on average. This means that the difference between 70 defense and 99 defense is 26.66 damage per fight, or a little more than one paddlefish saved.

<figure float="center">
  <img src="{{site.baseurl}}/images/Defense.png" width="80%"/>
  <figcaption> Average damage taken as a function of Defense level, for a player with 90 Mage/Ranged. The slope of the line of best fit for T1 is -.85 damage/lvl, and for T2 it is -0.77 damage/level.</figcaption>
</figure>

From the graph we can see that there are no important Defense level breakpoints either, just a slow linear reduction in damage taken. 
From this we can conclude that training your defense just for Corrupted Gauntlet is not worth the time. If your defense level is low, just take one extra paddlefish into the fight.

## Gold Per Hour

The OSRS wiki claims [4.233 million GP/hr](https://oldschool.runescape.wiki/w/Money_making_guide/Completing_The_Corrupted_Gauntlet) for completing 6 Corrupted Gauntlets per hour. Of that 4.233 million GP/hr, 1.688 comes from getting an enhanced weapon seed, meaning that you should expect ~2.5 million GP/hr without getting an enhanced weapon seed.

Across the 74 runs I recorded, my loot tracker says I made 18.9 million GP. Notably, I've gotten **two** crystal armor seeds so far, twice the rate. Unfortunately I don't have stats for the total prep+fight length of each run, but anecdotally my runs seem to take *about* 10 minutes on average. Using this number, I've spent 12 hours and 20 minutes in CG, meaning I made 1.53 GP/hr.


## Conclusion
The key take-aways I have from this project are:

1. Each Ranged level is worth 2 Magic levels at CG
2. Defense level doesn't matter
3. While you're learning, T2 prep will net you more KC/hour.
4. Minimize your tick loss for maximum DPS.
5. I spent more time on this then the time I will save by optimizing my Gauntlet runs.

I hope you find this useful and that it helps you win an argument in a Reddit thread.

[^2]:The T2 armor also has slightly higher accuracy bonuses.

