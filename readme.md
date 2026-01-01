# GoFitts Experiment

This repository contains the PsychoJS version of the GoFitts task. The
`index.html` file is set up for deployment on the [JATOS](https://www.jatos.org/) platform.

## Experiment Flow

```mermaid
flowchart TD
    A[Start Experiment] --> B[Display Welcome Screen]
    B --> C[Participant Info Dialog]
    C --> D{Info Valid?}
    D -->|No| C
    D -->|Yes| E[Initialize Experiment]
    E --> F[Generate Target Positions]
    F --> G[Start Trial Sequence]
    G --> H[Display Targets]
    H --> I[Participant Clicks Target]
    I --> J{Correct Target?}
    J -->|No| I
    J -->|Yes| K{More Targets?}
    K -->|Yes| H
    K -->|No| L{More Sequences?}
    L -->|Yes| F
    L -->|No| M[Save Results]
    M --> N[End Experiment]
```

## Running on JATOS

Upload the entire folder as a JATOS component. The experiment will
start automatically once JATOS has loaded and results will be stored by
JATOS.
