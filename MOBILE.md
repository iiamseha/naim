# 📱 MOBILE.md — NAIM Evolution Log

> This file is your autoresearch log. Every iteration gets documented here.
> No log = no lift. No lift = no weight.

---

## 🧬 Identity

**NAIM Name:** `Ankara Pocket Titan`
**Crew:** Solo
**App Concept:** Görevleri yönetmek için sade, hızlı ve akıllı bir To-Do uygulaması — dark mode, arama ve istatistik ekranıyla.
**Starting Tool:** Claude Code

---

## 📊 Scoreboard

| Metric | Value |
| --- | --- |
| Total Iterations | 6 |
| Total Weight (kg) | 65 |
| Total Time (min) | 90 |
| Failed Attempts | 1 |

---

## 🔁 Iterations

---

### 🏋️ Iteration 1 — Basic UI Screen

| Field | Value |
| --- | --- |
| Feature | Ana ekran tasarımı — başlık, liste alanı, buton |
| Weight | 5 kg |
| Tool Used | Claude Code |
| Time | 10 min |
| Attempts | 1 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Create a simple React Native Expo app with a clean home screen.
Include a header with the title "Görevlerim", a placeholder list area,
and an add button. Use a light purple color scheme.
```

**What happened:**
- Temel ekran sorunsuz geldi. SafeAreaView ve StatusBar ile düzgün görünüm sağlandı.
- Renk paleti (#6c63ff mor tonu) ilk denemede beğenildi.

**Screenshot:** `screenshots/iteration1-basic-ui.png`

**Commit:** `[NAIM: AnkaraPocketTitan] Basic UI screen added - 5kg`

---

### 🏋️ Iteration 2 — Text Input / Output

| Field | Value |
| --- | --- |
| Feature | Görev ekleme — text input + liste render |
| Weight | 10 kg |
| Tool Used | Claude Code |
| Time | 15 min |
| Attempts | 2 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Add a TextInput at the bottom of the screen where users can type a task
and press "+" to add it to the FlatList above. Use useState to manage
the list. Each todo item should show its text and a delete button.
```

**What happened:**
- İlk denemede FlatList keyExtractor eksikti, console'da warning verdi. İkinci denemede düzeldi.
- Görev ekleme ve silme düzgün çalıştı.

**Screenshot:** `screenshots/iteration2-input-output.png`

**Commit:** `[NAIM: AnkaraPocketTitan] Text input and todo list working - 10kg`

---

### 🏋️ Iteration 3 — Dark Mode

| Field | Value |
| --- | --- |
| Feature | Dark mode toggle (Switch komponenti ile) |
| Weight | 5 kg |
| Tool Used | Claude Code |
| Time | 12 min |
| Attempts | 1 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Add a dark mode toggle using React Native Switch component in the header.
When dark mode is on, change background to #1a1a2e and text to #e0e0e0.
Use a dynamic styles function that takes darkMode as parameter.
```

**What happened:**
- `styles(darkMode)` fonksiyon yapısı temiz çalıştı. Tüm renkler parametrik hale geldi.
- Gece modu açıldığında geçiş anında oluyor, animasyon yok ama yeterli.

**Screenshot:** `screenshots/iteration3-darkmode.png`

**Commit:** `[NAIM: AnkaraPocketTitan] Dark mode toggle added - 5kg`

---

### 🏋️ Iteration 4 — Navigation (Multi-Screen)

| Field | Value |
| --- | --- |
| Feature | 2 ekran: Ana Sayfa + İstatistik — bottom tab navigation |
| Weight | 15 kg |
| Tool Used | Claude Code |
| Time | 18 min |
| Attempts | 2 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Add a second screen called StatsScreen that shows todo statistics:
total count, completed count, pending count, completion percentage.
Add a custom bottom navigation bar with two tabs (Home, Stats).
Manage navigation with a simple screen state variable instead of React Navigation library.
```

**What happened:**
- İlk denemede bottom nav dark mode'da görünmüyordu (renk çakışması). İkinci denemede `borderTopColor` düzeltildi.
- State-based navigation library gerektirmediği için kurulum problemi olmadı.

**Screenshot:** `screenshots/iteration4-navigation.png`

**Commit:** `[NAIM: AnkaraPocketTitan] Multi-screen navigation (Home + Stats) - 15kg`

---

### 🏋️ Iteration 5 — Local Storage / AsyncStorage

| Field | Value |
| --- | --- |
| Feature | Uygulama kapandığında görevler kaybolmuyor — AsyncStorage ile kalıcı depolama |
| Weight | 20 kg |
| Tool Used | Claude Code |
| Time | 15 min |
| Attempts | 1 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Persist todos and darkMode preference using @react-native-async-storage/async-storage.
Load data on app start with useEffect, save todos whenever they change,
save darkMode preference whenever it changes. Handle JSON parse errors gracefully.
```

**What happened:**
- `useEffect` + `AsyncStorage.getItem/setItem` kombinasyonu ilk denemede çalıştı.
- Uygulama kapatılıp açıldığında tüm görevler ve tema tercihi korunuyor.

**Screenshot:** `screenshots/iteration5-storage.png`

**Commit:** `[NAIM: AnkaraPocketTitan] AsyncStorage persistence added - 20kg`

---

### 🏋️ Iteration 6 — Search Functionality

| Field | Value |
| --- | --- |
| Feature | Görevler arasında anlık arama — search input ile filtreleme |
| Weight | 10 kg |
| Tool Used | Claude Code |
| Time | 10 min |
| Attempts | 1 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Add a search TextInput below the header. Filter the FlatList in real-time
as the user types — case-insensitive match on todo text.
Style it consistently with the existing inputs and dark mode support.
```

**What happened:**
- `.filter()` + `.toLowerCase()` ile anlık filtreleme sorunsuz çalıştı.
- Dark mode'da placeholder rengi de düzgün görünüyor.

**Screenshot:** `screenshots/iteration6-search.png`

**Commit:** `[NAIM: AnkaraPocketTitan] Search/filter functionality added - 10kg`

---

## 🏆 Final Weight Summary

| Feature | kg |
| --- | --- |
| Basic UI Screen | 5 |
| Text Input / Output | 10 |
| Dark Mode | 5 |
| Navigation (Multi-Screen) | 15 |
| Local Storage (AsyncStorage) | 20 | 
| Search Functionality | 10 |
| **TOTAL** | **65 kg** |

---

## 🧠 Reflection

**Hardest part:**
Multi-screen navigasyonu state ile yönetmek başta karmaşık geldi. React Navigation kurmadan bottom tab yapmak için özel bir yapı kurmak gerekti.

**What AI did well:**
AsyncStorage entegrasyonunu tek seferde sıfırdan yazdı ve useEffect hook'larını doğru yapılandırdı. Dark mode için parametrik style fonksiyonu fikri AI'dan geldi, çok temiz bir çözüm oldu.

**Where AI failed:**
FlatList'te keyExtractor'ı ilk denemede unuttu. Bottom nav dark mode renklerini ilk seferinde yanlış ayarladı. Küçük detaylar ama test etmeden fark edilmez.

**If I started over, I would:**
AsyncStorage entegrasyonunu daha erken ekler, baştan kalıcı veri yapısıyla tasarlardım. Sonradan eklemek biraz refactor gerektirdi.

**Best feature I built:**
İstatistik ekranı — tamamlanma yüzdesini canlı görmek motivasyon artırıcı.

**Biggest surprise:**
State-based navigation, React Navigation kadar kullanışlı olabiliyormuş. Gereksiz bağımlılık eklemek zorunda kalmadan aynı işi yaptı.
