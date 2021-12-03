TEMPLATE FOR RETROSPECTIVE (Team P-02)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories → Committed: 7 vs Done: 7
- Story Points → Committed: 27 vs Done: 27

- Hours → Planned: 83 hours 45 minutes vs Spent: 76 hours 55 minutes

### Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    22   |    -   |  58h 15 m  |     51h 40m  |
| _#6_   |    1    |    3   |   1h 30 m  |      20m     |  
| _#7_   |    4    |    8   |     5h     |    6h 10m    |
| _#8_   |    4    |    2   |  3h 30m    |      3h 45m  |
| _#9_   |    7    |    5   |     9h     |    7h 10m    |
| _#10_  |    2    |    3   |     1h 15m |     1h 10m   |
| _#11_  |    3    |    3   |     4h     |    4h 30m    |
| _#12_  |    2    |    3   |    4h 30m  |        3h    |

> NOTE: technical tasks corresponds to story `#0`


- Hours per task → Average: 2h 20m Standard Deviation: 3h 09m
- Total task estimation error ratio: 1.11

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated. 12h 30m
  - Total hours spent: 8h 15m
  - Nr of automated unit test cases: 14 
  - Coverage: 29.1%
- E2E testing:
  - Total hours estimated: 12h
  - Total hours spent: 9h 55m
- Code review 
  - Total hours estimated (called merge code): 2h
  - Total hours spent: 3h
- Technical Debt management:
  - Total hours estimated: 4h
  - Total hours spent: 1h 20m
  - Hours estimated for remediation by SonarQube: -
  - Hours spent on remediation: 1h 20m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.3%
  - rating for each quality characteristic reported in SonarQube under "Measures":
     - reliability: A
     - maintainability: A
     - security: A
     - security review: A
  


## ASSESSMENT

- What caused your errors in estimation?<br/>
In this sprint, we had a better estimation with respect to the first one. We learned from our mistakes and we kept more time for the coding tasks avoiding underestimations of them. We still have a few tasks that have been misestimated but no more than 1/2 hours while last time we had a very big difference between estimation and actual time. Probably in the next sprint we can remove some time from the horizontal tasks and add more time for the testing of every single story.


- What lessons did you learn (both positive and negative) in this sprint?<br/>
We learned that tests (especially E2E) have a very variable time for their development. Some components can be tested really quickly while others can require hours before making everything run correctly. We also learned that sonarcloud still needs to be fully configured to recognize all our client tests.

On the other hand, we have found a definite way to do the E2E tests (avoiding puppeteer and using the react testing library) and this will make our job much easier in the future.


- Which improvement goals set in the previous retrospective were you able to achieve? <br/>
Last sprint we said that we had to be more objective during the estimation of the coding tasks and the team improved a lot from this perspective. Moreover, communication has improved. We dedicated some time to the daily scrums and to meetings after the first week of the sprint in order to talk to each other and understand which was the status of the project.  

- Which ones you were not able to achieve? Why?<br/>
Reading the previous retrospective the main two goals have been successfully achieved

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)<br/>
Improve coverage. To do this, learn how to simulate a function to provide more detailed unit tests, set up the tools to use for end-to-end testing, and take into account coverage reports from sonarcloud.

- One thing you are proud of as a Team!!<br/>
As a team, we are proud that step by step we are learning from our mistakes and this is fundamental in a project that lasts months.

