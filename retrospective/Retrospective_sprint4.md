
Team P-02 - Fourth Sprint Retrospective
=====================================

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
The main cause of errors in the estimation was due to a story that was not completed from the previous sprint and since the assignee of the story couldn't finish it also in this sprint, another teammate worked on it, almost doubling the time needed. This error is compensated by a miss prediction in the technical story which includes some tasks that are really complex to estimate as TD management, docker setups, and code review.

- What lessons did you learn (both positive and negative) in this sprint?<br/>
A lesson we learned is that we have to divide the tasks taking into account the skills of the team members and help as much as possible the ones that are less confident with coding. Previously, we just divide the workload equally, while now we learned that a person may be more useful developing a complex component while another could help during less technical tasks.
Another thing we learned is to test components using mock functions to simulate the APIs. This was a huge step that simplified the testing tasks and allowed us to increase a lot the coverage.

- Which improvement goals set in the previous retrospective were you able to achieve? <br/>
In the previous sprint, our goal was to improve the overall interface of the application (as requested by the stakeholders). This became one of the main goals of this sprint and this is the reason why we had to do only three stories. The GUI is now way more clear and less aggressive than before.

- Which ones you were not able to achieve? Why?<br/>
We didn't reach 80% of coverage as suggested by SonarCloud but we reached the level we considered acceptable (60% as discussed with the professor).

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)<br/>
In the next sprint, the main goal will be to develop more user stories than we did during this sprint. The interface is now fixed and it will more important to add functionality to the system that improves the GUI.

- One thing you are proud of as a Team!!<br/>
The team tuning has reached a great level. We can understand the code of each other with no problems (which helps during the code review phase) and in general, we trust a lot the code/tests written by other team members. 
