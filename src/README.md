### How much time did you spend on the assignment?

I spent 2 days on this assignment, some of which was spent on re-familiarizing myself with React.

### If you used a plotting library, why did you use it?

I used Chart.js, mainly because of its popularity/community backing and documentation. I also knew that my scatter plots did not need to be highly customizable for this particular project, so the package's limitations in that respect wouldn’t cause me trouble. While doing research on the plotting libraries, multiple resources mentioned that the library does not do well with large datasets. There are other libraries, such as highcharts, that are better with larger datasets and are a more enterprise solution, but considering I knew the length of the loan data before rendering, I thought this wouldn’t pose too much of a performance risk. 

### What did you like about your implementation?

1. Clear separation between business logic and UI. 
2. Considering I didn’t use a state management library, I decided to house much of my app’s state inside app.js and pass information down as props. 
3. Function and variable names are concise and intent revealing, thus reducing the need for copious comments. 
4. Functions are generally short and descriptive.

### If you were to restart, what would you change about your implementation?

I would start by designating a component as my single-source of truth for state management where the majority of my state altering functions would exist. This would have saved me the trouble of refactoring. I would have also used typescript and created interfaces for the objects I employed in the app. I would also flatten my objects and only pass in necessary data to aid me in triggering react’s change detection and simplify props.

### If you were given more time, how would you test your project?

I would use the mocked loandata as inputs for the functions I would unit test. The separation between UI concerns and program logic would help the unit testing effort. I think end-to-end tests would be overkill for this particular project as there is no api.

