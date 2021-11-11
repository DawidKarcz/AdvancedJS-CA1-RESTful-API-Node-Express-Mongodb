class APIFilters {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter() {
        const queryCopy = {...this.queryStr};

        // Removing fields from the query
        const removeFields = ['sort', 'fields', 'q', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);

        // Advanced filter using less than, less than or equal to, greater than and greater than or equal to.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    

    // Advanced sorting using the query String which allows to sort one or multiply objects  from the Mongodb database.
    sort() {
        if(this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-postingDate');
        }

        return this;
    }
    
    // This allows to limit the query search fields for jobs to me retrieved from the Mongodb database, for example if you want to 
    // get all the jobs from the database to be displayed only with their titles without any other variables about that job showing
    // or to search some particular fields only like for example title and salary of the jobs.
    limitFields() {
        if(this.queryStr.fields) {
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }
    
    // Advanced search by query function which allows to retrive data from the Mongodb database using the jobs title, 
    // for example if the the user wants to search jobs in the fields which contain java, the only jobs that are going to be retrieved from
    // the database are the ones containing a java title query string in it.
    searchByQuery() {
        if(this.queryStr.q) {
            const qu = this.queryStr.q.split('-').join(' ');
            this.query = this.query.find({$text: {$search: "\""+ qu +"\""}});
        }

        return this;
    }
    
    // Advanced pagination function which allows to paginate a given amount of results per page and also to search the results on
    // a given page with the amount of results the user wants to be provided for him.
    pagination() {
        const page = parseInt(this.queryStr.page, 10) || 1;
        const limit = parseInt(this.queryStr.limit, 10) || 10;
        const skipResults = (page - 1) * limit;

        this.query = this.query.skip(skipResults).limit(limit);

        return this;
    }
}

module.exports = APIFilters;