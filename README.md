### Technology stack
 * Frontend: React.js
 * Backend: node.js. Asynchronous single threaded with an event loop ensures a larger number of requests are served.
 * Servers: AWS EC2 instances
 * Tools: Travis CI for testing framework
 * Databases: MySQL, PostgreSQL or any such relational database



### Database Schema

```
CREATE TABLE `user` (
 `UserID` int(19) NOT NULL AUTO_INCREMENT,
 `Name` varchar(50) DEFAULT NULL,
 `Username` varchar(50) DEFAULT NULL,
 `MobileNo` varchar(10) DEFAULT NULL,
 `EmailID` varchar(50) DEFAULT NULL,
 `SignupSource` varchar(20) DEFAULT NULL,
 `Active` tinyint(1) NOT NULL,
 `Archived` tinyint(1) NOT NULL,
 `CreatedDate` timestamp NULL DEFAULT NULL
 PRIMARY KEY (`UserID`)
);


CREATE TABLE `access_token` (
`AccessTokenID` varchar(255) NOT NULL AUTO_INCREMENT,
`UserID` int(19) NOT NULL,
`TTL` int(10) NOT NULL,
`Active` tinyint(1) NOT NULL,
`CreatedDate` timestamp NULL DEFAULT NULL
PRIMARY KEY (`AccessTokenID`)
);


CREATE TABLE `user_mapping` (
`UserMappingID` int(19) NOT NULL AUTO_INCREMENT,
`FollowerUserID` int(19) NOT NULL,
`FollowedUserID` int(19) NOT NULL,
`Active` tinyint(1) NOT NULL,
`Archived` tinyint(1) NOT NULL,
`CreatedDate` timestamp NULL DEFAULT NULL
PRIMARY KEY (`UserMappingID`)
);


CREATE TABLE `tweets` (
`TweetID` int(19) NOT NULL AUTO_INCREMENT,
`TweetedByUserID` int(19) NOT NULL,
`TweetBody` varchar(140) NOT NULL,
`Active` tinyint(1) NOT NULL,
`Archived` tinyint(1) NOT NULL,
`CreatedDate` timestamp NULL DEFAULT NULL
PRIMARY KEY (`TweetID`)
);
```

Dummy Object Detailing a JSON with the typical data of each table.

```
{
	"user": 
	{
		"UserID": 1,
		"Name": "Shivangi Kadam",
		"Username": "shivangi231",
		"MobileNo": "9999999999",
		"EmailID": "shivangi.kadam@gmail.com",
		"SignupSource": "Facebook",
		"Active": 1,
		"Archived": 0,
		"CreatedDate": "2018-12-27 13:30:10"
	},
	"access_token": 
	{
		"AccessTokenID": "09h1KyPeJj23h56o",
		"UserID": 1,
		"TTL": 1296000,
		"Active": 1,
		"CreatedDate": "2018-12-27 13:33:41"
	},
	"user_mapping": 
	[{
		"UserMappingID" : 1,
		"FollowerUserID" : 1,
		"FollowedUserID" : 2,
		"Active" : 1,
		"Archived" 0: ,
		"CreatedDate" : "2018-12-30 19:01:29"
	},
	{
		"UserMappingID" : 2,
		"FollowerUserID" : 1,
		"FollowedUserID" : 3,
		"Active" : 1,
		"Archived" 0: ,
		"CreatedDate" : "2018-12-30 19:01:29"
	},
	{
		"UserMappingID" : 3,
		"FollowerUserID" : 1,
		"FollowedUserID" : 4,
		"Active" : 1,
		"Archived" 0: ,
		"CreatedDate" : "2018-12-30 19:01:29"
	},
	{
		"UserMappingID" : 4,
		"FollowerUserID" : 2,
		"FollowedUserID" : 1,
		"Active" : 1,
		"Archived" 0: ,
		"CreatedDate" : "2018-12-30 19:01:29"
	},
	{
		"UserMappingID" : 5,
		"FollowerUserID" : 2,
		"FollowedUserID" : 3,
		"Active" : 1,
		"Archived" 0: ,
		"CreatedDate" : "2018-12-30 19:01:29"
	},
	{
		"UserMappingID" : 6,
		"FollowerUserID" : 2,
		"FollowedUserID" : 6,
		"Active" : 1,
		"Archived" 0: ,
		"CreatedDate" : "2018-12-30 19:01:29"
	}]
	"tweet":
	[{
		"TweetID": 1,
		"TweetedByUserID": 1,
		"TweetBody": "Hi! This is my first tweet!",
		"Active": 1,
		"Archived": 0,
		"CreatedDate": "2019-02-01 01:40:01"
	},
	{
		"TweetID": 2,
		"TweetedByUserID": 1,
		"TweetBody": "Hi! This is my second tweet!",
		"Active": 1,
		"Archived": 0,
		"CreatedDate": "2019-02-02 04:19:38"
	}];
}
```

### API​ to​ ​return​ ​all​ ​the​ ​tweets​ ​to​ ​show​ ​on​ ​the​ ​dashboard

```
function fetchAllTweets (userID, fromDateTime, toDateTime, page, itemsPerPage) {

	// Validate all parameters

	fromDateTime = fromDateTime || '2018-12-26T18:30:00+00:00'; //Default date denoting the beginning time
	toDateTime = toDateTime || moment();
	page = page || 1;
	itemsPerPage = itemsPerPage || 30;



	// Connect to the database

	var con = mysql.createConnection({
  		host: "dbHost",
  		user: "dbUser",
  		password: "dbPassword"
	});

	// Build Query and Run

	var sql = '';
	sql = 'SELECT * FROM tweet WHERE TweetedByUserID = ';
	sql += userID;
	sql += 'AND CreatedDate BETWEEN ';
	sql += '\'' + fromDateTime + '\' AND ';
	sql += '\'' + toDateTime + '\' ';
	sql += 'ORDER BY CreatedDate DESC ';
	sql += 'LIMIT ' + page * itemsPerPage + ', ' + itemsPerPage;


	// SELECT * FROM tweet WHERE TweetedByUserID = 1 AND CreatedDate BETWEEN '2018-12-26T18:30:00+00:00' AND '2018-12-29T18:30:00+00:00' ORDER BY CreatedDate DESC LIMIT 0, 30;
	con.connect(function(err) {
  		if (err) throw err;
  			console.log("Connected!");
  			con.query(sql, function (err, tweetResult) {
    			if (err || !tweetResult || !tweetResult.length) return {
    				"success": false,
    				"msg": "Something went wrong",
    				"data": {}
    			};
    			console.log("tweetResult: " + tweetResult[0]);
    			/*
    			[{
					"TweetID": 1,
					"TweetedByUserID": 1,
					"TweetBody": "Hi! This is my first tweet!",
					"Active": 1,
					"Archived": 0,
					"CreatedDate": "2019-02-01 01:40:01"
				},
				{
					"TweetID": 2,
					"TweetedByUserID": 1,
					"TweetBody": "Hi! This is my second tweet!",
					"Active": 1,
					"Archived": 0,
					"CreatedDate": "2019-02-02 04:19:38"
				}]
				*/
				return tweetResult[0];
  			});
		});
}
```



### Scalability

The system built in the above manner will be able to scale up to a high degree. All the functionalities required are satisfied in the following ways:

##### A user should be able to sign up/login
Whenever a user attempts to login by providing the mobile no/username/email, the corresponding entry is checked in the ``user`` table (or created if an entry is not found in the table). For the UserID against that entry, the ``access_token`` table is checked and the access token is found out; by adding the ttl (in seconds) to the CreatedDate to see if the access_token is valid. If it is, the user is successfully logged in.

##### Users​ should​ be​ able​ to​ follow​ each​ other.
The ``user_mapping`` table is a many to many table that maintains the follow list of users. If a user adds a new account to be followed, a new entry happends in user_mapping table, where `FollowedUserID` is the id of the user being followed and `FollowerUserID` is the id of the user following the account.

##### User​ should​ be​ able​ to​ tweet​ about​ anything​ they​ like.
The ``tweet`` table, which maintains the user id against each tweet is used to log all tweets done by all users. The actual contents of the tweets reside in `TweetBody` column.

##### When​ a​ user​ comes​ on​ their​ homepage,​ they​ should​ see​ all​ the​ tweets​ of people​ they​ are​ following​ sorted​ by​ latest​ tweet​ on​ top.
This can be done by finding out all users from the ``user_mapping`` table against the logged in user's UserIDs. The results returned can be used to the extract the tweets from the ``tweet`` table against the list of the fetched UserIDs in a sorted manner.


### Limitation


The limitation of this system will come into picture when the number of users increase, along with the follower/following activity.

In the current system, to find all the tweets on the homepage, we need to query in user_mapping table to get the list of UserIDs, then make another query with an IN statement inside the tweet table; This will slow the system down, when the number of records are a lot

Indexing can solve the problem to a great extent to ensure faster look up of the TweetedByUserID. But we will also need to have a caching mechanism to serve the requests more quickly



### Bonus question: Text Box

Steps to run:

npm install

npm run start

Open localhost:3000
