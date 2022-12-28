```mermaid
flowchart LR

A --> B -->|Yes| C --> F
F --> |No| B
B --> |No| E
F --> |Yes| D

A(First State)
B{Important Decision}
C(OK)
D(Definitely okay!)
E(Certainly not okay!)
F{Sure?}
```
