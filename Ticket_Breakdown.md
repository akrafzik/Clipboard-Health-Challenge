# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

Ticket Breakdown:

1. Add externalId to agent entity
Description: We need to add a new property on the Agent entity to enable the Facilities team to register an externalId to be used in our reports, so those reports can be more human-friendly instead of showing DB ids, which doesn't help much.
Questions: Understand if this property will be used for other purposes in the future, if so, we should create e a new column on the Agent entity to store this information as a nonrequired column. If the only purpose will be for this report, add the information on metadata instead. We'll need to add validations to make sure that this externalId is unique inside the Facility?
Approach: Add new column or map new property to be added; Update migrations and indexes to DB; Enable this property to be saved/updated when creating or updating an Agent in our services;
Effort estimation: 3 - Since it's not required information, we should be sure about the changes and how to safely update our databases and we need to update our services.
Acceptance criteria: An agent should be created/updated storing the information of externalId if provided. In case of being provided, the externalId value should not be duplicated inside the Facility domain (need validation). 

2. Add externalId field on UI
Description: Since we'll add a new property to the Agent entity we need to enable our users to create or update agents by adding this information.
Approach: Add a new input field on create/update form agent on all components.
Effort estimation: 2 - Since it's a new field and the logic validation should be on backend, should be an easy update.
Acceptance criteria: Be able to add, update and remove the external Id information on any Agent.

3. Update report generation process
Description: We need to add the externalId information to be returned from the Agent entity and update the report generation logic.
Approach: Map the new externalId property where is required to be able to return it when getShiftsByFacility function is called. In cases where the information is empty a null value should be returned for this property. For the generateReport function, we'll need to get the new property provided and send it to the PDF template in the same property where the DB ID was being sent. This will prevent us to need to update the PDF template.
Effort estimation: 5 - We need to update 2 different functions. If the code is easy to maintain, this could be really easy but will be important to update tests and be sure that every process will be not affected by this change.
Acceptance criteria: Both functions need to be reading and providing the externalId property during the process; All tests should be updated by adding this property to cases and adding new ones to be sure that the logic will follow if the information is available or not. At last, the PDF report should contain this information where the DB ID was being shown.