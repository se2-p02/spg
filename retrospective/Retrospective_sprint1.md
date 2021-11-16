TEMPLATE FOR RETROSPECTIVE (Team P-02)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories → Committed: 5 vs Done: 5
- Story Points → Committed: 17 vs Done: 17
- Hours → Planned: 82 hours 15 minutes vs Spent: 73 hours 36 minutes

**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    22   |    -   |  70h 45 m  |     47h 55m  |
| _#1_   |    2    |    8   |   3h 30 m  |     3h 45m   |
| _#2_   |    2    |    3   |     2h     |    5h 20m    |
| _#3_   |    2    |    3   |     2h     |      1h      |
| _#4_   |    2    |    1   |     2h     |   1d 2h 30m  |
| _#5_   |    2    |    2   |     2h     |      3h      |

> NOTE: technical tasks corresponds to story `#0`


- Hours per task → Average: 2h 20m Standard Deviation: 3h 09m
- Total task estimation error ratio: 1.11

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated
  - Total hours spent
  - Nr of automated unit test cases 
  - Coverage (if available)
- E2E testing:
  - Total hours estimated
  - Total hours spent
- Code review 
  - Total hours estimated 
  - Total hours spent
- Technical Debt management:
  - Total hours estimated 
  - Total hours spent
  - Hours estimated for remediation by SonarQube
  - Hours estimated for remediation by SonarQube only for the selected and planned issues 
  - Hours spent on remediation 
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
  


## ASSESSMENT

- What caused your errors in estimation (if any)?<br/>
As we did during the office project, we overestimated our coding capabilities, since we didn't take into account that during the development of a single and easy task, there could be many problems that make the spent time increase a lot. For a single wrong line of code, hours can be spent in order to fix it. This time spent fixing bugs and issues, led to having less time for the horizontal tasks, especially  testing.


- What lessons did you learn (both positive and negative) in this sprint?<br/>
We have to communicate more face to face since this sprint we mainly communicate via Telegram. This led to people during their job without interacting with others. If we spend more time for brief but frequent interaction, we could avoid time wasted during the development, and moreover, it would be a way to check that each team member was following the sprint plan. 
Moreover, we still have to correctly estimate the task time. We often just think about the high-level functions without considering all the possible issues that real-life coding has. We must set more estimation hours for the coding tasks in order to avoid completely wrong estimations. 
On the other hand, we learn how to test our web applications, so in future, we will have to spend less time on learning tasks and we can immediately test the results of the coding phase. 

- Which improvement goals set in the previous retrospective were you able to achieve? <br/>
With respect to the demo project, we had much fewer issues in merging the code of each member, and also the problems related to the specific coding language have been reduced for most of the team members. 
  
- Which ones you were not able to achieve? Why?<br/>
As stated before, also during this sprint we had issues in the communication and coordination phase. After the meetings for the sprint planning and a few scrum meetings, we didn't talk much to each other in order to see how the project was evolving. 
Of course, also fixing the estimation issues we have is fundamental in order to complete the project.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)<br/>
We must be more objective during the estimation, avoiding overestimating  our coding capabilities. 
Moreover, we must set up more meetings during the sprint, in order to understand what is the progress of the project and also check that everybody is following the planned plan.

- One thing you are proud of as a Team!!<br/>
We are proud that the team is balanced, which implies that there is not a leader dominating over the other team members. This is one of the key points of the agile method and we are respecting it. No one takes decisions without asking the others and in general no one tries to control the team.