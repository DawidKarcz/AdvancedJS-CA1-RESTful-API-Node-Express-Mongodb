const Job = require('../models/jobs');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');


// Getting all the jobs => / api/v1/jobs
exports.getJobs = catchAsyncErrors( async (req, res, next) => {
    
    const apiFilters = new APIFilters(Job.find(), req.query);
    apiFilters.filter();
    apiFilters.sort();
    apiFilters.limitFields();
    apiFilters.searchByQuery();
    apiFilters.pagination();
    
    const jobs = await apiFilters.query;

    res.status(200).json({
        success: true,
        results: jobs.length,
        data: jobs
    });
});

//Create new Job => // api/v1/job/new
exports.newJob = catchAsyncErrors( async (req, res, next) => {

    // Adding user to body
    req.body.user = req.user.id;
    const job = await Job.create(req.body);

    res.status(200).json({
        success: true,
        message: 'Job Created.',
        data: job
    })
});

// Get a single job with id and slug => /api/v1/:id/:slug
exports.getJob = catchAsyncErrors( async (req, res, next) => {`
`
    const job = await Job.find({ $and: [{ _id: req.params.id }, { slug: req.params.slug }] }).populate({
        path: 'user',
        select: 'name'
    });


    if(!job || job.length === 0 ) {
        return next(new ErrorHandler('Job not found', 404));
        
    }

    res.status(200).json({
        success: true,
        data: job
    });
});


// Update a Job => /api/vi/job/:id
exports.updateJob = catchAsyncErrors( async (req, res, next) => {
    let job = await Job.findById(req.params.id);

    if (!job) {
        return next(new ErrorHandler('Job not found', 404));
    }

    // Check if the user is owner
    if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorHandler(`User(${req.user.id}) is not allowed to update this job.`))
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
        
    });

    res.status(200).json({
        success: true,
        message: 'Job is updated',
        data: job
    });
});

// Delete a Job => /api/vi/job/:id
exports.deleteJob = catchAsyncErrors( async (req, res, next) => {
    let job = await Job.findById(req.params.id);

    if(!job) {
        return next(new ErrorHandler('Job not found', 404));
    
    }

    // Check if the user is owner
    if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorHandler(`User(${req.user.id}) is not allowed to delete this job.`))
    }

    job = await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Job is deleted.'
    })
});

// Get stats about a topic(job) => /api/v1/stats/:topic
exports.jobStats = catchAsyncErrors( async (req, res, bext) => {
    const stats = await Job.aggregate([
       {
           $match: {$text: {$search: "\""+req.params.topic +"\""}}
       },
       {
           $group: {
               _id: {$toUpper: '$experience'},
               totalJobs: {$sum: 1},
               avgPosition: {$avg: '$positions'},
               avgSalary: {$avg: '$salary'},
               minSalary: {$min: '$salary'},
               maxSalary: {$max: '$salary'}
           }
       }
    ]);

    if(stats.length === 0) {
        return next(new ErrorHandler(`No stats found for - ${req.params.topic}`, 200));
        
    }

    res.status(200).json({
        success: true,
        data: stats
    });
});