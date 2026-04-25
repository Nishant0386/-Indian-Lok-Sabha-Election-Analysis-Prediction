# -Indian-Lok-Sabha-Election-Analysis-Prediction
🗳️ Indian Lok Sabha Election Analysis &amp; Prediction (1962–2024) | Analyzing 60+ years of election data using Python, Pandas, Matplotlib, Seaborn &amp; Scikit-learn | 7 Objectives: Voter Turnout, Party Dominance, Candidate Profiles, Swing Seats, ML Prediction, Delimitation &amp; Women's Reservation


# 🗳️ Indian Lok Sabha Election Analysis & Prediction (1962–2024)

> Analyzing 60+ years of India's democratic data to uncover patterns, predict winners, and understand what truly decides elections.

---

## 📋 Project Overview

India is the world's largest democracy. This project analyzes **real election data from 1962 to 2024** sourced from the Election Commission of India to find patterns, understand what decides who wins, and predict future election outcomes — including the impact of Delimitation and Women's Reservation.

---

## 🎯 7 Objectives & Key Findings

| # | Objective | Key Finding |
|---|-----------|-------------|
| 1 | **Voter Turnout Analysis** | Turnout rose from 55% (1962) to 66%+ (2024). Bihar votes least, Lakshadweep votes most. |
| 2 | **Party Dominance & Vote Share** | BJP: 2 seats (1984) → 303 (2019). INC: 414 → 52. Biggest political shift in Indian history. |
| 3 | **Candidate Profile Analysis** | Candidates WITH criminal cases win MORE. Richer candidates win MORE. Incumbents are 3x more likely to win. |
| 4 | **Winning Margin & Swing Seats** | ~30% seats won by less than 5% margin — these swing seats decide who becomes PM. |
| 5 | **ML Model — Predicting Winners** | Random Forest best model (AUC > 0.80). Total Declared Assets = #1 predictor of winning. |
| 6 | **Delimitation + Women Seats** | UP gains +15 seats, Tamil Nadu loses -7. Under 33% rule: UP gets +5 women seats, Kerala LOSES -3 — South India penalised for controlling population. |
| 7 | **Women's Reservation Analysis** | Women actually win at a HIGHER rate than men. But only 14% MPs are women today. 33% reservation = 181 women MPs. |

---

## 📦 Datasets Used

| File | Description |
|------|-------------|
| `Loksabha_1962-2019_.csv` | All election winners 1962–2019 |
| `eci_data_2024.csv` | 2024 all candidates & votes |
| `GE_India_2024.xlsx` | 2024 constituency margins |
| `2004-2019-affidavits.csv` | Criminal cases, assets, education (ECI affidavits) |
| `Table_2A_State_Uts.csv` | Census 2011 state population |
| `phase_data.xlsx` | 2024 phase-wise turnout |

---

## 🛠️ Tech Stack

```python
Python | Pandas | NumPy | Matplotlib | Seaborn | Scikit-learn | Jupyter Notebook
```

## 📊 ML Models Built

- Logistic Regression
- Decision Tree
- Random Forest ← Best Model
- Gradient Boosting

---

## 🔮 2029 Election Predictions

- If delimitation before 2029 → North India dominates Parliament structurally
- 33% Women Reservation → 181 women MPs guaranteed from 2029
- ~150 swing seats (< 5% margin) will decide the next government
- Incumbent MPs with high declared assets = most likely to win

---

## 🚀 How to Run

```bash
git clone https://github.com/Nishant0386/Indian-Lok-Sabha-Election-Analysis-Prediction.git
cd Indian-Lok-Sabha-Election-Analysis-Prediction
```

1. Place all dataset files in the same folder as the notebook
2. Open `Election_ULTIMATE_FINAL.ipynb` in Jupyter Notebook
3. Run All Cells (`Kernel → Restart & Run All`)
