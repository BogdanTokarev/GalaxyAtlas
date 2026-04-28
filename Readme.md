# Solar System Quiz — מערכת השמש

אתר אינטרקטיבי ועמוד לחינוך על מערכת השמש שלנו.

## תיאור הפרויקט

אתר אינטרקטיבי לחינוך על מערכת השמש, הכולל:
- 🌍 **דף בית** עם אנימציית מערכת שמש תלת-ממדית
- 🪐 **דף כוכב לכת** עם נתונים חיים מ-API
- 🧠 **חידון** עם שאלות שנוצרות דינמית מנתוני API
- 🏆 **דף ניקוד** עם שמירה ב-LocalStorage

## טכנולוגיות

- HTML5 סמנטי
- CSS3 — Flexbox, Grid, 3D Transforms, Custom Properties
- JavaScript (ES6+) — Fetch API, async/await, LocalStorage
- ללא ספריות חיצוניות

## API

[Solar System OpenData](https://api.le-systeme-solaire.net/rest/bodies/) — ללא מפתח API

## דפים

| דף | קובץ | תיאור |
|---|---|---|
| בית | `index.html` | אנימציית מערכת שמש, לחיצה על כוכב לכת לניווט |
| כוכב לכת | `planet.html?name=mars` | נתונים מה-API: כבידה, רדיוס, ירחים, מסלול ועוד |
| חידון | `quiz.html` | 5 שאלות, 15 שניות לשאלה, ניקוד |
| ניקוד | `scores.html` | טבלת ניקוד גבוה עם מיון |

## מבנה קבצים

```
project/
├── index.html
├── planet.html
├── quiz.html
├── scores.html
├── css/
│   ├── style.css     ← משתנים משותפים, ריסט, רכיבים
│   ├── solar.css     ← אנימציית מערכת שמש 3D
│   └── quiz.css      ← חידון, ניקוד, דיאלוג
├── js/
│   ├── api.js        ← כל קריאות ה-fetch
│   ├── solar.js      ← אנימציה + ניווט
│   ├── planet.js     ← עמוד כוכב לכת
│   ├── quiz.js       ← לוגיקת חידון
│   └── scores.js     ← עמוד ניקוד
└── docs/
    ├── plan.md
    └── progress.md
```

## הרצה

פתח את `index.html` בדפדפן (Chrome / Firefox מומלץ).
> שים לב: קריאות ה-API דורשות חיבור לאינטרנט.

---
© 2025 Solar System Quiz — פרויקט גמר
