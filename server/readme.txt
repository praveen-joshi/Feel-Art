Please Read comment of file route/user.js to understand the working of which dependecy we are using and why

Models contains the structure as well as logic (validate)  that if the req that comes contains the same structure
or not For Ex:Post req to Create User may not contains password some times
so we need to reject such request at very first otherwise expection may come anytime 

