function getInputs() {
  return {
    magicLevel: parseInt(document.getElementById("magicLevel").value),
    rangedLevel: parseInt(document.getElementById("rangedLevel").value),
    defenseLevel: parseInt(document.getElementById("defenseLevel").value),
    prayer: document.getElementById("prayer").value,
    ticksUsed: parseFloat(document.getElementById("ticksUsed").value),
    wrongOverhead: parseInt(document.getElementById("wrongOverhead").value),
    wrongStyle: parseInt(document.getElementById("wrongStyle").value),
    tornadoHits: parseInt(document.getElementById("tornadoHits").value),
    nSims: parseInt(document.getElementById("nSims").value),
  };
}

const PRESETS = {
  learner: { ticksUsed: 0.8, wrongOverhead: 3, wrongStyle: 5, tornadoHits: 5 },
  proficient: { ticksUsed: 0.9, wrongOverhead: 1, wrongStyle: 2, tornadoHits: 1 },
  perfect: { ticksUsed: 1.0, wrongOverhead: 0, wrongStyle: 0, tornadoHits: 0 },
};

function applyPreset(name) {
  const preset = PRESETS[name];
  document.getElementById("ticksUsed").value = preset.ticksUsed;
  document.getElementById("wrongOverhead").value = preset.wrongOverhead;
  document.getElementById("wrongStyle").value = preset.wrongStyle;
  document.getElementById("tornadoHits").value = preset.tornadoHits;
}

function runSimulations(params, tierPrep, nSims) {
  const results = [];
  for (let i = 0; i < nSims; i++) {
    const result = simulatedFight(
      params.magicLevel,
      params.rangedLevel,
      params.defenseLevel,
      params.ticksUsed,
      tierPrep,
      params.prayer,
      params.wrongStyle,
      params.wrongOverhead,
      params.tornadoHits
    );
    results.push(result);
  }
  return results;
}

function computeStats(values) {
  const n = values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const median =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];
  const min = sorted[0];
  const max = sorted[n - 1];
  const variance = sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  return { mean, median, min, max, stdDev, q1, q3 };
}

function linearRegression(x, y) {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

let damageChart = null;
let timeChart = null;
let lineCharts = {};

let lastT1AvgFightTime = null;
let lastT2AvgFightTime = null;

function renderViolinChart(canvasId, t1Data, t2Data, title, yLabel) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  if (canvasId === "damageChart" && damageChart) {
    damageChart.destroy();
  }
  if (canvasId === "timeChart" && timeChart) {
    timeChart.destroy();
  }

  const chart = new Chart(ctx, {
    type: "violin",
    data: {
      labels: ["T1 Prep", "T2 Prep"],
      datasets: [
        {
          label: "Damage Taken",
          data: [t1Data, t2Data],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16 },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: yLabel,
          },
        },
      },
    },
  });

  if (canvasId === "damageChart") {
    damageChart = chart;
  }
  if (canvasId === "timeChart") {
    timeChart = chart;
  }

  return chart;
}

function renderLineChart(canvasId, xData, t1Data, t2Data, title, xLabel, yLabel) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  if (lineCharts[canvasId]) {
    lineCharts[canvasId].destroy();
  }

  lineCharts[canvasId] = new Chart(ctx, {
    type: "line",
    data: {
      labels: xData,
      datasets: [
        {
          label: "T1 Prep",
          data: t1Data,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.1,
          pointRadius: 3,
        },
        {
          label: "T2 Prep",
          data: t2Data,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.1,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16 },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xLabel,
          },
        },
        y: {
          title: {
            display: true,
            text: yLabel,
          },
        },
      },
    },
  });

  return lineCharts[canvasId];
}

function runMainSimulation() {
  const params = getInputs();
  const nSims = params.nSims;

  document.getElementById("mainResults").style.display = "none";
  document.getElementById("mainLoading").style.display = "block";

  setTimeout(() => {
    const t1Results = runSimulations(params, 1, nSims);
    const t2Results = runSimulations(params, 2, nSims);

    const t1Damage = t1Results.map((r) => r[1]);
    const t1Time = t1Results.map((r) => r[0] * 0.6);
    const t2Damage = t2Results.map((r) => r[1]);
    const t2Time = t2Results.map((r) => r[0] * 0.6);

    const t1DamageStats = computeStats(t1Damage);
    const t1TimeStats = computeStats(t1Time);
    const t2DamageStats = computeStats(t2Damage);
    const t2TimeStats = computeStats(t2Time);

    renderViolinChart(
      "damageChart",
      t1Damage,
      t2Damage,
      "Damage Taken: T1 vs T2 Prep",
      "Total Damage"
    );
    renderViolinChart(
      "timeChart",
      t1Time,
      t2Time,
      "Time Taken: T1 vs T2 Prep",
      "Time (seconds)"
    );

    lastT1AvgFightTime = t1TimeStats.mean;
    lastT2AvgFightTime = t2TimeStats.mean;

    const timeSaved = t1TimeStats.mean - t2TimeStats.mean;
    const damageDiff = t1DamageStats.mean - t2DamageStats.mean;

    document.getElementById("t1AvgDamage").textContent = t1DamageStats.mean.toFixed(1);
    document.getElementById("t2AvgDamage").textContent = t2DamageStats.mean.toFixed(1);
    document.getElementById("t1AvgTime").textContent = t1TimeStats.mean.toFixed(1) + "s";
    document.getElementById("t2AvgTime").textContent = t2TimeStats.mean.toFixed(1) + "s";
    document.getElementById("timeSaved").textContent = timeSaved.toFixed(1) + "s";
    document.getElementById("damageDiff").textContent = damageDiff.toFixed(1);

    document.getElementById("mainLoading").style.display = "none";
    document.getElementById("mainResults").style.display = "block";
  }, 50);
}

function runDefenseSweep() {
  const params = getInputs();
  const nSims = params.nSims;

  document.getElementById("defenseResults").style.display = "none";
  document.getElementById("defenseLoading").style.display = "block";

  setTimeout(() => {
    const defLevels = [];
    const t1AvgDamage = [];
    const t2AvgDamage = [];

    for (let def = 70; def < 100; def++) {
      defLevels.push(def);

      const sweepParams = { ...params, defenseLevel: def };

      const t1Results = runSimulations(sweepParams, 1, nSims);
      const t2Results = runSimulations(sweepParams, 2, nSims);

      const t1Damage = t1Results.map((r) => r[1]);
      const t2Damage = t2Results.map((r) => r[1]);

      t1AvgDamage.push(t1Damage.reduce((a, b) => a + b, 0) / nSims);
      t2AvgDamage.push(t2Damage.reduce((a, b) => a + b, 0) / nSims);
    }

    renderLineChart(
      "defenseChart",
      defLevels,
      t1AvgDamage,
      t2AvgDamage,
      `Average Damage Taken vs Defense Level (Magic=${params.magicLevel}, Ranged=${params.rangedLevel})`,
      "Defense Level",
      "Average Damage Taken"
    );

    const t1Reg = linearRegression(defLevels, t1AvgDamage);
    const t2Reg = linearRegression(defLevels, t2AvgDamage);

    document.getElementById("t1DefSlope").textContent = (-1 * t1Reg.slope).toFixed(4);
    document.getElementById("t2DefSlope").textContent = (-1 * t2Reg.slope).toFixed(4);

    document.getElementById("defenseLoading").style.display = "none";
    document.getElementById("defenseResults").style.display = "block";
  }, 50);
}

function runCombatSweep(sweepType) {
  const params = getInputs();
  const nSims = params.nSims;

  document.getElementById("combatSweepResults").style.display = "none";
  document.getElementById("combatSweepLoading").style.display = "block";

  setTimeout(() => {
    const levels = [];
    const t1AvgTime = [];
    const t2AvgTime = [];

    for (let lvl = 70; lvl < 100; lvl++) {
      levels.push(lvl);

      const sweepParams = { ...params };
      if (sweepType === "ranged") {
        sweepParams.rangedLevel = lvl;
      } else {
        sweepParams.magicLevel = lvl;
      }

      const t1Results = runSimulations(sweepParams, 1, nSims);
      const t2Results = runSimulations(sweepParams, 2, nSims);

      const t1Time = t1Results.map((r) => r[0] * 0.6);
      const t2Time = t2Results.map((r) => r[0] * 0.6);

      t1AvgTime.push(t1Time.reduce((a, b) => a + b, 0) / nSims);
      t2AvgTime.push(t2Time.reduce((a, b) => a + b, 0) / nSims);
    }

    const statName = sweepType === "ranged" ? "Ranged" : "Magic";
    const otherStat = sweepType === "ranged"
      ? `Magic=${params.magicLevel}`
      : `Ranged=${params.rangedLevel}`;

    renderLineChart(
      "combatSweepChart",
      levels,
      t1AvgTime,
      t2AvgTime,
      `Average Fight Time vs ${statName} Level (${otherStat}, Defense=${params.defenseLevel})`,
      `${statName} Level`,
      "Average Fight Time (seconds)"
    );

    const t1Reg = linearRegression(levels, t1AvgTime);
    const t2Reg = linearRegression(levels, t2AvgTime);

    document.getElementById("t1CombatSlope").textContent = t1Reg.slope.toFixed(2) + " s/lvl";
    document.getElementById("t2CombatSlope").textContent = t2Reg.slope.toFixed(2) + " s/lvl";

    document.getElementById("combatSweepLoading").style.display = "none";
    document.getElementById("combatSweepResults").style.display = "block";
  }, 50);
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function calculateKC() {
  if (lastT1AvgFightTime === null || lastT2AvgFightTime === null) {
    alert("Run the simulation first.");
    return;
  }
  const t1Winrate = parseFloat(document.getElementById("t1Winrate").value);
  const t2Winrate = parseFloat(document.getElementById("t2Winrate").value);
  const t1Prep = parseFloat(document.getElementById("t1PrepTime").value);
  const t2Prep = parseFloat(document.getElementById("t2PrepTime").value);
  const kc = parseInt(document.getElementById("kcInput").value);

  if (t1Winrate <= 0 || t2Winrate <= 0) {
    alert("Winrates must be greater than 0.");
    return;
  }
  if (kc < 1) {
    alert("KC must be at least 1.");
    return;
  }

  const t1Runs = kc / t1Winrate;
  const t2Runs = kc / t2Winrate;
  const t1Total = t1Runs * (t1Prep + lastT1AvgFightTime);
  const t2Total = t2Runs * (t2Prep + lastT2AvgFightTime);

  document.getElementById("t1ExpectedRuns").textContent = t1Runs.toFixed(1);
  document.getElementById("t2ExpectedRuns").textContent = t2Runs.toFixed(1);
  document.getElementById("t1TotalTime").textContent = formatTime(t1Total);
  document.getElementById("t2TotalTime").textContent = formatTime(t2Total);
  document.getElementById("kcResults").style.display = "flex";
}
