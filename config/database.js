const mongoose = require('mongoose');
// const Job = require('../models/jobs');
// const User = require('../models/users');

const connectDatabase = () => { mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log(`MongoDB Database connected with host: ${con.connection.host}`);
 });
};

// Seed Jobs to the Database

// const seedUsers = [
//     {
//         "title": "CSS Expert Developer",
//         "slug": "css-expert-developer",
//          "description": "Must be a full-stack developer, able to implement everything in a MEAN or MERN stack paradigm (MongoDB, Express, Angular and/or React, and Node.js).",
//          "email": "employeer1@gmail.com",
//          "address": "Dublin, Blancherstown",
//          "company": "Amazon",
//          "industry": [
//              "Information Technology"
//          ],
//          "jobType": "Permanent",
//          "minEducation": "Phd",
//          "positions": 21,
//          "experience": "2 Year - 5 Years",
//          "salary": "93332",
//          "user": "618d23acc2eb0776c89393fd"
        
//  },
//  {
//     "title": "CSS Expert Developer",
//     "slug": "css-expert-developer",
//      "description": "Must be a full-stack developer, able to implement everything in a MEAN or MERN stack paradigm (MongoDB, Express, Angular and/or React, and Node.js).",
//      "email": "employeer1@gmail.com",
//      "address": "Dublin, Blancherstown",
//      "company": "Amazon",
//      "industry": [
//          "Information Technology"
//      ],
//      "jobType": "Permanent",
//      "minEducation": "Phd",
//      "positions": 21,
//      "experience": "2 Year - 5 Years",
//      "salary": "93332",
//      "user": "618d23acc2eb0776c89393fd"
    
// }

// ];

// // Seed Jobs to the Database

// const seedJobs = [
//     {
//         "name" : "Mark Blair",
//         "email" : "em12@gmail.com",
//         "password" : "secret1234",
//         "role": "employeer"
        
        
//     },
//     {
//         "name" : "Blair Mark",
//         "email" : "em123@gmail.com",
//         "password" : "secret1234",
//         "role": "user"
        
        
//     }
// ];

// const seedDB = async () => {
//     await User.deleteMany({});
//     await Job.deleteMany({});
//     await Job.insertMany(seedUsers);
//     await User.insertMany(seedJobs);
// };

// seedDB().then(() => {
//     mongoose.connection.close();
// });

module.exports = connectDatabase; 