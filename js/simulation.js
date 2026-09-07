const MAX_HIT = 40;
const ATTACK_SPEED_TICKS = 4;
const TICK_SECONDS = 0.6;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rangedStats(
  rangedLevel,
  rangedAttackBonus,
  rangedStrengthBonus,
  targetDefence,
  targetRangedDefence,
  prayerAcc,
  prayerStr
) {
  const effectiveRangedStrength = Math.floor(
    rangedLevel * prayerStr + 8
  );

  let maxHit = Math.floor(
    0.5 +
      (effectiveRangedStrength * (rangedStrengthBonus + 64)) / 640
  );
  maxHit = Math.floor(maxHit * 1);

  const effectiveRangedAttack = Math.floor(
    rangedLevel * prayerAcc + 8
  );

  const attackRoll = Math.floor(
    effectiveRangedAttack * (rangedAttackBonus + 64) * 1
  );

  const defenceRoll = (targetDefence + 9) * (targetRangedDefence + 64);

  let hitChance;
  if (attackRoll > defenceRoll) {
    hitChance = 1 - (defenceRoll + 2) / (2 * (attackRoll + 1));
  } else {
    hitChance = attackRoll / (2 * (defenceRoll + 1));
  }

  return {
    effectiveRangedStrength,
    maxHit,
    effectiveRangedAttack,
    attackRoll,
    defenceRoll,
    hitChance,
  };
}

function simulateRangedAttack(
  rangedLevel,
  rangedAttackBonus,
  rangedStrengthBonus,
  targetDefence,
  targetRangedDefence,
  prayerAcc,
  prayerStr,
  hunllef = true
) {
  const stats = rangedStats(
    rangedLevel,
    rangedAttackBonus,
    rangedStrengthBonus,
    targetDefence,
    targetRangedDefence,
    prayerAcc,
    prayerStr
  );

  if (Math.random() >= stats.hitChance) {
    return 0;
  }

  const maxHit = hunllef ? rangedStrengthBonus : stats.maxHit;
  return randInt(1, maxHit);
}

function expectedRangedDps(
  rangedLevel,
  rangedAttackBonus,
  rangedStrengthBonus,
  attackSpeedTicks,
  targetDefence,
  targetRangedDefence,
  prayerAcc,
  prayerStr
) {
  const stats = rangedStats(
    rangedLevel,
    rangedAttackBonus,
    rangedStrengthBonus,
    targetDefence,
    targetRangedDefence,
    prayerAcc,
    prayerStr
  );

  const maxHit = stats.maxHit;
  const hitChance = stats.hitChance;
  const expectedHit = maxHit / 2 + 1 / (maxHit + 1);
  const expectedDamage = hitChance * expectedHit;
  const attackInterval = attackSpeedTicks * 0.6;

  return expectedDamage / attackInterval;
}

function magicCombatStats(
  magicLevel,
  magicAttackBonus,
  targetMagicLevel,
  targetMagicDefenceBonus,
  prayerMultiplier
) {
  let effectiveLevel = Math.floor(magicLevel * prayerMultiplier);
  effectiveLevel += 3;
  effectiveLevel += 9;

  const accuracyRoll = effectiveLevel * (magicAttackBonus + 64);
  const defenceRoll = (targetMagicLevel + 9) * (targetMagicDefenceBonus + 64);

  let hitChance;
  if (accuracyRoll > defenceRoll) {
    hitChance = 1 - (defenceRoll + 2) / (2 * (accuracyRoll + 1));
  } else {
    hitChance = accuracyRoll / (2 * (defenceRoll + 1));
  }

  return {
    effectiveMagicLevel: effectiveLevel,
    accuracyRoll,
    defenceRoll,
    hitChance,
    maxHit: MAX_HIT,
  };
}

function simulateMagicAttack(
  magicLevel,
  magicAttackBonus,
  magicMaxHit,
  targetMagicLevel,
  targetMagicDefenceBonus,
  prayerMultiplier
) {
  const stats = magicCombatStats(
    magicLevel,
    magicAttackBonus,
    targetMagicLevel,
    targetMagicDefenceBonus,
    prayerMultiplier
  );

  if (Math.random() >= stats.hitChance) {
    return 0;
  }

  return randInt(1, magicMaxHit);
}

function expectedMagicDps(
  magicLevel,
  magicAttackBonus,
  magicMaxHit,
  attackSpeedTicks,
  targetMagicLevel,
  targetMagicDefenceBonus,
  prayerMultiplier
) {
  const stats = magicCombatStats(
    magicLevel,
    magicAttackBonus,
    targetMagicLevel,
    targetMagicDefenceBonus,
    prayerMultiplier
  );

  const hitChance = stats.hitChance;
  const expectedHit = magicMaxHit / 2 + 1 / (magicMaxHit + 1);
  const expectedDamagePerAttack = hitChance * expectedHit;
  const attackInterval = attackSpeedTicks * 0.6;

  return expectedDamagePerAttack / attackInterval;
}

function nHunllefAttacks(ticks) {
  return Math.floor(ticks / 5.55);
}

function expectedFightLength(
  magicLevel,
  rangedLevel,
  tierPrep,
  ticksUsed,
  prayer = "cox"
) {
  const hunllefRangedDef = {
    targetDefence: 240,
    targetRangedDefence: 20,
  };

  const hunllefMagicDef = {
    targetMagicLevel: 240,
    targetMagicDefenceBonus: 20,
  };

  let rangedPray, magicPray;
  if (prayer === "cox") {
    rangedPray = { prayerAcc: 1.2, prayerStr: 1.23 };
    magicPray = { prayerMultiplier: 1.25 };
  } else if (prayer === "titans") {
    rangedPray = { prayerAcc: 1.18, prayerStr: 1.18 };
    magicPray = { prayerMultiplier: 1.18 };
  }

  let rangedAtk, magicAtk;
  if (tierPrep === 1) {
    rangedAtk = {
      rangedAttackBonus: 188,
      rangedStrengthBonus: 138,
      attackSpeedTicks: 4,
    };
    magicAtk = {
      magicAttackBonus: 200,
      magicMaxHit: 40,
      attackSpeedTicks: 4,
    };
  } else if (tierPrep === 2) {
    rangedAtk = {
      rangedAttackBonus: 200,
      rangedStrengthBonus: 138,
      attackSpeedTicks: 4,
    };
    magicAtk = {
      magicAttackBonus: 212,
      magicMaxHit: 40,
      attackSpeedTicks: 4,
    };
  }

  const magicDps = expectedMagicDps(
    magicLevel,
    magicAtk.magicAttackBonus,
    magicAtk.magicMaxHit,
    magicAtk.attackSpeedTicks,
    hunllefMagicDef.targetMagicLevel,
    hunllefMagicDef.targetMagicDefenceBonus,
    magicPray.prayerMultiplier
  );

  const rangedDps = expectedRangedDps(
    rangedLevel,
    rangedAtk.rangedAttackBonus,
    rangedAtk.rangedStrengthBonus,
    rangedAtk.attackSpeedTicks,
    hunllefRangedDef.targetDefence,
    hunllefRangedDef.targetRangedDefence,
    rangedPray.prayerAcc,
    rangedPray.prayerStr
  );

  const averageDps = (ticksUsed * (magicDps + rangedDps)) / 2;
  const time = 1000 / averageDps;
  const ticks = Math.ceil(time / 0.6);
  return ticks;
}

function simulateHunllefMagicAttack(
  magicLevel,
  tierPrep,
  prayer = "cox",
  overhead = true
) {
  let defMult;
  if (prayer === "cox") {
    defMult = 1.25;
  } else if (prayer === "titans") {
    defMult = 1.05;
  }

  let defBonus, maxHit;
  if (tierPrep === 1) {
    defBonus = 166 * defMult;
    maxHit = 13;
  } else if (tierPrep === 2) {
    defBonus = 224 * defMult;
    maxHit = 10;
  }

  return simulateMagicAttack(240, 90, maxHit, magicLevel, defBonus, 1);
}

function simulateHunllefRangedAttack(
  defLevel,
  tierPrep,
  prayer = "cox",
  overhead = true
) {
  let defMult;
  if (prayer === "cox") {
    defMult = 1.25;
  } else if (prayer === "titans") {
    defMult = 1.05;
  }

  let defBonus, maxHit;
  if (tierPrep === 1) {
    defBonus = 166 * defMult;
    maxHit = overhead ? 13 : 55;
  } else if (tierPrep === 2) {
    defBonus = 224 * defMult;
    maxHit = overhead ? 10 : 45;
  }

  return simulateRangedAttack(240, 90, maxHit, defLevel, defBonus, 1, 1);
}

function simulateHunllefAttacks(
  nHits,
  defenseLevel,
  magicLevel,
  tierPrep,
  prayer = "cox",
  overhead = true
) {
  const hits = [];
  let style = 0;
  for (let i = 0; i < nHits; i++) {
    if ((i + 1) % 4 === 1) {
      style += 1;
    }
    if (style % 2 === 0) {
      hits.push(
        simulateHunllefRangedAttack(defenseLevel, tierPrep, prayer, overhead)
      );
    } else {
      hits.push(
        simulateHunllefMagicAttack(magicLevel, tierPrep, prayer, overhead)
      );
    }
  }
  return hits;
}

function simulatedFightLength(magicLevel, rangedLevel, tierPrep, prayer = "cox") {
  const hunllefRangedDef = {
    targetDefence: 240,
    targetRangedDefence: 20,
  };

  const hunllefMagicDef = {
    targetMagicLevel: 240,
    targetMagicDefenceBonus: 20,
  };

  let rangedPray, magicPray;
  if (prayer === "cox") {
    rangedPray = { prayerAcc: 1.2, prayerStr: 1.23 };
    magicPray = { prayerMultiplier: 1.25 };
  } else if (prayer === "titans") {
    rangedPray = { prayerAcc: 1.18, prayerStr: 1.18 };
    magicPray = { prayerMultiplier: 1.18 };
  }

  let rangedAtk, magicAtk;
  if (tierPrep === 1) {
    rangedAtk = { rangedAttackBonus: 188, rangedStrengthBonus: 138 };
    magicAtk = { magicAttackBonus: 200, magicMaxHit: 40 };
  } else if (tierPrep === 2) {
    rangedAtk = { rangedAttackBonus: 200, rangedStrengthBonus: 138 };
    magicAtk = { magicAttackBonus: 212, magicMaxHit: 40 };
  }

  let style = 0;
  let i = 0;
  let damage = 0;
  let ticks = 0;
  while (damage < 1000) {
    if (i % 5 === 0) {
      style += 1;
    }
    if ((style & 2) === 0) {
      const hit = simulateRangedAttack(
        rangedLevel,
        rangedAtk.rangedAttackBonus,
        rangedAtk.rangedStrengthBonus,
        hunllefRangedDef.targetDefence,
        hunllefRangedDef.targetRangedDefence,
        rangedPray.prayerAcc,
        rangedPray.prayerStr,
        false
      );
      damage += hit;
    } else {
      const hit = simulateMagicAttack(
        magicLevel,
        magicAtk.magicAttackBonus,
        magicAtk.magicMaxHit,
        hunllefMagicDef.targetMagicLevel,
        hunllefMagicDef.targetMagicDefenceBonus,
        magicPray.prayerMultiplier
      );
      damage += hit;
    }
    i++;
    ticks += 4;
  }
  return ticks;
}

function rollTornadoHits(nHits, tierPrep) {
  const hits = [];
  for (let i = 0; i < nHits; i++) {
    if (tierPrep === 1) {
      hits.push(randInt(15, 25));
    } else if (tierPrep === 2) {
      hits.push(randInt(10, 20));
    }
  }
  return hits;
}

function simulatedFight(
  magicLevel,
  rangedLevel,
  defenseLevel,
  ticksUsed,
  tierPrep,
  prayer = "cox",
  wrongStyle = 0,
  wrongOverhead = 0,
  tornadoHits = 0
) {
  let initialFightTicks =
    simulatedFightLength(magicLevel, rangedLevel, tierPrep, prayer) +
    4 * wrongStyle;
  initialFightTicks = Math.ceil(initialFightTicks / ticksUsed);

  let hits = simulateHunllefAttacks(
    nHunllefAttacks(initialFightTicks),
    defenseLevel,
    magicLevel,
    tierPrep,
    prayer
  );

  const nToRemove = Math.min(Math.floor(wrongOverhead), hits.length);
  const indicesToRemove = new Set();
  while (indicesToRemove.size < nToRemove) {
    indicesToRemove.add(randInt(0, hits.length - 1));
  }
  hits = hits.filter((_, idx) => !indicesToRemove.has(idx));

  const wrongHits = simulateHunllefAttacks(
    Math.floor(wrongOverhead),
    defenseLevel,
    magicLevel,
    tierPrep,
    prayer,
    false
  );
  hits = hits.concat(wrongHits);

  let fightTicks = initialFightTicks;
  let damage = hits.reduce((a, b) => a + b, 0) - 99;

  const tornadoDmg = rollTornadoHits(tornadoHits, tierPrep);
  damage += tornadoDmg.reduce((a, b) => a + b, 0);

  let nEatsRequired = Math.ceil((damage - 99) / 20);
  while (nEatsRequired > 0) {
    damage -= 20 * nEatsRequired;
    const extraTicks = 3 * nEatsRequired;
    const extraHits = simulateHunllefAttacks(
      nHunllefAttacks(extraTicks),
      defenseLevel,
      magicLevel,
      tierPrep,
      prayer
    );
    fightTicks += extraTicks;
    hits = hits.concat(extraHits);
    damage += extraHits.reduce((a, b) => a + b, 0);
    nEatsRequired = Math.ceil(damage / 20);
  }

  const totalDamage = hits.reduce((a, b) => a + b, 0);
  return [fightTicks, totalDamage];
}
