```mermaid
gantt
    title 2023 New Site MVP
    excludes weekends
    dateFormat  YYYY-MM-DD
    section Article Feature
    Build phase           :active,a1, 2022-12-15, 12d
    E2E Testing           :a2, after a1, 5d
    Release + Bug Fixes   :a3, after a2, 5d
    section Comments Feature
    Build phase           :crit, b1, 2023-01-15, 10d
    E2E Testing           :crit,b2, after b1, 5d
    Release + Bug Fixes   :crit, b3, after b2, 5d
    MVP released :milestone, after b3, 0d
```
