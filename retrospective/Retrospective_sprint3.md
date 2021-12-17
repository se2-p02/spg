
TEMPLATE FOR RETROSPECTIVE (Team P-02)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories → Committed: 6 vs Done: 6
- Story Points → Committed: 15 vs Done: 15

- Hours → Planned: 81 hours 10 minutes vs Spent: 79 hours 20 minutes

### Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    12   |    -   |  42h 30m  |     39h 30m  |
| _#13_   |    2    |    2   |   1h 45m  |      40m     |  
| _#14_   |    6    |    2   |   7h 40m   |    9h 35m    |
| _#15_   |    6    |    2   |  8h 15m    |      11h 25m  |
| _#16_   |    4    |    5   |     7h     |    5h 35m    |
| _#17_  |    4    |    2   |    5h 30m   |     3h 5m   |
| _#18_  |    6    |    2   |   8h 30m    |    9h 30m    |

> NOTE: technical tasks corresponds to story `#0`

- Hours per task → Average: 2h 1m Standard Deviation: 2h 9m
- Total task estimation error ratio: 1.023

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated. 7h 45m
  - Total hours spent: 8h 25m
  - Nr of automated unit test cases: 19 
  - Coverage: 54.7%
- E2E testing:
  - Total hours estimated: 17h
  - Total hours spent: 15h 35m
- Code review 
  - Total hours estimated: 5h
  - Total hours spent: 4h 55m
- Technical Debt management:
  - Total hours estimated: 2h 30m
  - Total hours spent: 4h 15m
  - Hours estimated for remediation by SonarQube: -
  - Hours spent on remediation: 4h 15m
  - Debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.2%
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