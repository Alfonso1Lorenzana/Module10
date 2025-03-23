## BestTracker

What is being addressed, is an Array, with their job titles.
That will be Department, Employee, Role. The Database, will handle these variables.
And populate them, this function will be going to index.ts, and then, goes ```cli.ts``` to see what will be populating
The DB seeds.sql according to what the schema is populating it. That will also be addressed, by the ```services``` 
that has files according to what we need, which our DB has. What ```services``` has are ```connection.ts``` ```DepartmentService.ts```
as well as ```EmployeesService.ts```and ```RoleService.ts```

If it has already been populated, it will be emptied. DROP ```your_name_of_the_database```

I put the services, in a ```connection.ts``` which will populate the DATABASE, which is psql type.

Also, there is a ```.gitignore``` to especially ignore node_modules since whomever runs this application,
will be running it locally. The .env here has all of the DB credentials.

It's needs to run as follows: ```node dist/index.js```
In Visual Studio

In there will be where the ```user_of_this_product``` inputs his/her information.
Screencastify demo: 







