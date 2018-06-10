var logger = require("./logger");
var RelationshipRepo = require("./relationship-repo");

var args = process.argv.slice(2);
logger.debug(args);
var searchTerm = args[0];
logger.info('search term: ' + searchTerm);

var limitArg = args[1];
var limit;
if(limitArg !== undefined){
    limit = limitArg.match( /=([0-9]+)/)[1];
    logger.debug('limit has been specified as ' + limit);
}
if(isNaN(limit)){
    logger.debug('limit has not been correctly set ' + limit + 'defaulting to 5');

    limit = 5;
}

var relationshipRepo = new RelationshipRepo(limit);

(()=>relationshipRepo.getIsARelationshipTree(searchTerm))();