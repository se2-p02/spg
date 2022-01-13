
Team P-02 - Fourth Sprint Retrospective
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories → Committed: 3 vs Done: 3
- Story Points → Committed: 13 vs Done: 13

- Hours → Planned: 81 hours vs Spent: 80 hours 45 minutes

### Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    16   |    -   |  67 30m  |     60h 15m  |
| _#16_   |    4    |    5   |   5h 30m  |      10h 35m     |  
| _#40_   |    2    |    5   |   4h   |    5h 5m    |
| _#41_   |    4    |    3   |  4h    |      4h 50m  |

> NOTE: technical tasks corresponds to story `#0`

- Hours per task → Average: 2h 53m Standard Deviation: 2h 30m
- Total task estimation error ratio: 1.003

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated. 1h 30m
  - Total hours spent: 2h 15m
  - Nr of automated unit test cases: 53 total, 9 added in this sprint
  - Coverage: 62.5%
- E2E testing:
  - Total hours estimated: 11h 30m
  - Total hours spent: 11h
- Code review 
  - Total hours estimated: 5h
  - Total hours spent: 6h 10m
- Technical Debt management:
  - Total hours estimated: 3h
  - Total hours spent: 5h 50m
  - Hours estimated for remediation by SonarQube: 4h 30m
  - Hours spent on remediation: 5h 50m
  - Debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.3%
  - Rating for each quality characteristic reported in SonarQube under "Measures":
     - reliability: A
     - maintainability: A
     - security: A
     - security review: A


## ASSESSMENT

- What caused your errors in estimation?<br/>
We are starting to produce balanced estimations with minor differences between estimated and actual spent hours: some tasks have still a noticeable difference but this is mostly due to initial considerations on the desired behaviour.

- What lessons did you learn (both positive and negative) in this sprint?<br/>
First of all we learned how to properly configure SonarCloud, which was having issues with the CI scan.
From the point of view of estimations, we still slightly overestimate story-related tasks (we are getting used to the web app mechanics) and underestimate technical tasks like Technical Debt management or Unit/E2E testing, since it's difficult to know in advance what you are going to test.
A negative lesson learned could be that sometimes all it takes is some wrong coding from a teammate to break the behaviour of the entire app.

- Which improvement goals set in the previous retrospective were you able to achieve? <br/>
We are continuing with regular scrums in order to keep everyone on track.
We managed to increase total coverage (29.1% -> 54.7%) by configuring SonarCloud and completing tests left over from the previous sprint; this was the important objective set in the previous retrospective. 

- Which ones you were not able to achieve? Why?<br/>
We have not yet achieved the suggested SonarCloud coverage of 80%, but it's a good point.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)<br/>
In the next sprint we would like to improve the overall interface of the application, make it cleaner and more pleasant to the eye.

- One thing you are proud of as a Team!!<br/>
The team coordination reached high levels: we understand each other, some tasks are done in 2+ people and generally working on something that another teammate started is not a problem.
