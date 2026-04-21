const quarterlyData = [
  { q: "Q1 2024", revenue: 51.2, lower: null, upper: null },
  { q: "Q2 2024", revenue: 54.8, lower: null, upper: null },
  { q: "Q3 2024", revenue: 57.1, lower: null, upper: null },
  { q: "Q4 2024", revenue: 61.3, lower: null, upper: null },
  { q: "Q1 2025", revenue: 63.9, lower: null, upper: null },
  { q: "Q2 2025", revenue: 65.0, lower: null, upper: null },
  { q: "Q3 2025", revenue: 71.4, lower: 68.0, upper: 75.0 },
  { q: "Q4 2025", revenue: 77.2, lower: 73.0, upper: 81.0 },
  { q: "Q1 2026", revenue: 82.1, lower: 77.0, upper: 88.0 },
  { q: "Q2 2026", revenue: 86.8, lower: 81.0, upper: 93.0 }
];

const productMatrix = [
  { name: "Amlodipine", x: 12.4, y: 30.8, size: 20 },
  { name: "Metformin", x: 10.7, y: 28.5, size: 18 },
  { name: "Adalimumab Biosimilar", x: 15.9, y: 12.6, size: 24 },
  { name: "Simvastatin", x: -3.4, y: 9.1, size: 12 },
  { name: "Filgrastim", x: 8.6, y: 15.2, size: 16 }
];

const countryGrowth = {
  categories: ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Bahrain", "Oman"],
  values: [14.0, 12.8, 8.6, 6.1, 4.2, -1.2]
};

const performanceRows = [
  {
    product: "Adalimumab Biosimilar",
    best: "UAE",
    weak: "Kuwait",
    signal: "Question Mark, underpenetrated",
    priority: "High"
  },
  {
    product: "Amlodipine",
    best: "Saudi Arabia",
    weak: "Bahrain",
    signal: "Star, strong retention",
    priority: "Medium"
  },
  {
    product: "Metformin",
    best: "Saudi Arabia",
    weak: "Oman",
    signal: "Star, expanding demand",
    priority: "Medium"
  },
  {
    product: "Simvastatin",
    best: "Qatar",
    weak: "Oman",
    signal: "Dog, decline risk",
    priority: "Critical"
  },
  {
    product: "Filgrastim",
    best: "UAE",
    weak: "Bahrain",
    signal: "Cash-flow stabilizer",
    priority: "High"
  }
];

const insights = [
  {
    title: "Adalimumab in UAE: scale now",
    detail:
      "Penetration is 18 points below formulary benchmark while growth signal is strongest in UAE. Expand KAM coverage and payer-level contracting in next cycle.",
    confidence: "89%",
    action: "Create UAE biosimilar acceleration plan"
  },
  {
    title: "Simvastatin in Oman: evaluate sunset",
    detail:
      "Sustained decline and pricing pressure indicate low ROI in Oman. Shift promotion budgets to higher-yield molecules unless strategic account reasons exist.",
    confidence: "84%",
    action: "Run product discontinuation scenario"
  },
  {
    title: "Protect Saudi stars",
    detail:
      "Amlodipine and Metformin carry portfolio resilience. Reinforce supply reliability and maintain physician engagement to prevent competitor share leakage.",
    confidence: "91%",
    action: "Launch key account defense sprint"
  },
  {
    title: "Forecast risk monitor for Kuwait tenders",
    detail:
      "Q4 and Q1 forecast variance is sensitive to tender timing. Use monthly refresh and trigger re-forecast if award timing shifts by more than 3 weeks.",
    confidence: "78%",
    action: "Set tender variance alert workflow"
  }
];

const botState = {
  revenueTotal: quarterlyData
    .filter((d) => d.lower !== null)
    .reduce((sum, d) => sum + d.revenue, 0)
};

function initForecastCards() {
  const container = document.getElementById("forecastCards");
  const forecast = quarterlyData.filter((x) => x.lower !== null);

  container.innerHTML = forecast
    .map((item, index) => {
      const prev = quarterlyData[quarterlyData.indexOf(item) - 4];
      const yoy = prev ? (((item.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1) : "0.0";
      return `
        <article class="forecast-mini">
          <h3>${item.q}</h3>
          <p><strong>$${item.revenue.toFixed(1)}M</strong> (${yoy}% YoY)</p>
          <p>CI: $${item.lower.toFixed(0)}M - $${item.upper.toFixed(0)}M</p>
          <p>Quarter ${index + 1} of forward plan</p>
        </article>
      `;
    })
    .join("");
}

function initPerformanceTable() {
  const tbody = document.getElementById("performanceTable");
  tbody.innerHTML = performanceRows
    .map((row) => {
      const cls =
        row.priority === "High" ? "high" : row.priority === "Critical" ? "critical" : "medium";
      return `
        <tr>
          <td>${row.product}</td>
          <td>${row.best}</td>
          <td>${row.weak}</td>
          <td>${row.signal}</td>
          <td><span class="tag ${cls}">${row.priority}</span></td>
        </tr>
      `;
    })
    .join("");
}

function initInsights() {
  const grid = document.getElementById("insightGrid");
  grid.innerHTML = insights
    .map(
      (insight) => `
        <article class="insight-card">
          <h3>${insight.title}</h3>
          <p>${insight.detail}</p>
          <div class="insight-meta">Confidence: ${insight.confidence}</div>
          <button class="action-btn" data-action="${insight.action}">Action Item</button>
        </article>
      `
    )
    .join("");

  grid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    alert(`AI Prompt Sent:\n${target.dataset.action}`);
  });
}

function getForecastBrief() {
  const forecast = quarterlyData.filter((d) => d.lower !== null);
  return forecast
    .map((d) => `${d.q}: $${d.revenue.toFixed(1)}M (CI $${d.lower.toFixed(0)}-${d.upper.toFixed(0)}M)`)
    .join(" | ");
}

function buildAgentReply(message) {
  const q = message.toLowerCase();

  if (q.includes("country") || q.includes("region") || q.includes("oman") || q.includes("saudi") || q.includes("uae")) {
    return "Country signal: Saudi Arabia (+14.0%) and UAE (+12.8%) are strongest growth engines. Oman is negative (-1.2%) and needs a restructuring plan, not incremental field force.";
  }

  if (q.includes("product") || q.includes("adalimumab") || q.includes("simvastatin") || q.includes("metformin")) {
    return "Product signal: Protect Amlodipine/Metformin as stars, accelerate Adalimumab in UAE with payer contracts, and evaluate Simvastatin sunset in Oman due to sustained decline.";
  }

  if (q.includes("forecast") || q.includes("quarter") || q.includes("2026") || q.includes("2025")) {
    return `Forward forecast: ${getForecastBrief()}. Total forecast revenue for Q3 2025 to Q2 2026 is $${botState.revenueTotal.toFixed(1)}M.`;
  }

  if (q.includes("action") || q.includes("next") || q.includes("boost") || q.includes("sales")) {
    return "Top action plan: 1) Reallocate 15-20% budget from low-yield SKUs to Adalimumab UAE and Saudi stars, 2) set monthly tender-trigger reforecast for Kuwait, 3) run Oman portfolio reset within 30 days.";
  }

  if (q.includes("risk") || q.includes("confidence") || q.includes("uncertainty")) {
    return "Risk view: Confidence bands widen into 2026 due to tender timing and pricing policy shifts. Keep a rolling monthly forecast refresh and trigger alerts when variance crosses 5%.";
  }

  return "I can answer in real time on forecast, products, countries, and action plans. Try: 'What should we do in Oman?', 'Give me Q1 2026 forecast', or 'How do we boost sales next quarter?'";
}

function appendChatMessage(text, role) {
  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.className = `chat-message ${role}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function initChatAgent() {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const quickButtons = document.querySelectorAll(".quick-btn");

  appendChatMessage(
    "Sales AI Agent online. Ask about quarterly forecast, region performance, product risk, or next best action.",
    "bot"
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) {
      return;
    }

    appendChatMessage(question, "user");
    input.value = "";

    const response = buildAgentReply(question);
    setTimeout(() => appendChatMessage(response, "bot"), 180);
  });

  quickButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const prompt = btn.getAttribute("data-prompt");
      if (!prompt) {
        return;
      }
      input.value = prompt;
      form.requestSubmit();
    });
  });
}

function initForecastChart() {
  const labels = quarterlyData.map((d) => d.q);
  const revenues = quarterlyData.map((d) => d.revenue);
  const lower = quarterlyData.map((d) => d.lower);
  const upper = quarterlyData.map((d) => d.upper);

  const ctx = document.getElementById("forecastChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Lower Bound (80% CI)",
          data: lower,
          borderColor: "rgba(255, 170, 80, 0.7)",
          backgroundColor: "rgba(255, 170, 80, 0.1)",
          borderDash: [4, 4],
          spanGaps: true
        },
        {
          label: "Upper Bound (80% CI)",
          data: upper,
          borderColor: "rgba(255, 170, 80, 0.7)",
          backgroundColor: "rgba(255, 170, 80, 0.1)",
          borderDash: [4, 4],
          spanGaps: true
        },
        {
          label: "Revenue",
          data: revenues,
          borderColor: "#65c6ff",
          backgroundColor: "rgba(101, 198, 255, 0.2)",
          pointRadius: 3,
          tension: 0.25,
          fill: true
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          title: { display: true, text: "USD Millions" }
        }
      }
    }
  });
}

function initBcgChart() {
  const ctx = document.getElementById("bcgChart");
  new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: productMatrix.map((p) => ({
        label: p.name,
        data: [{ x: p.x, y: p.y, r: p.size }],
        backgroundColor: p.x > 10 ? "rgba(85, 201, 140, 0.7)" : p.x < 0 ? "rgba(255, 106, 124, 0.75)" : "rgba(106, 173, 255, 0.75)"
      }))
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: "Growth Rate (%)" } },
        y: { title: { display: true, text: "Revenue (USD M)" } }
      },
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

function initCountryChart() {
  const ctx = document.getElementById("countryChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: countryGrowth.categories,
      datasets: [
        {
          label: "Growth %",
          data: countryGrowth.values,
          backgroundColor: countryGrowth.values.map((v) =>
            v < 0 ? "rgba(255, 106, 124, 0.75)" : "rgba(107, 183, 255, 0.75)"
          )
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          title: { display: true, text: "Growth %" }
        }
      }
    }
  });
}

initForecastCards();
initPerformanceTable();
initInsights();
initForecastChart();
initBcgChart();
initCountryChart();
initChatAgent();
