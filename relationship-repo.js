var ConceptNetApi = require("./concept-net-api");

module.exports = class RelationshipRepo{
    constructor(limit){
        this._limit = limit;
    }

    //no support for cycle detection
    async getIsARelationshipTree(searchTerm) {
        var treeObj = {};
        treeObj[searchTerm] = {};
    
        var queue = [];
        queue.push(searchTerm);
    
        var currentNode = queue.shift();
    
        for(var i = 0; currentNode && i < this._limit; i++){
            logger.debug('looking up \'Is A\' relations for: ' + currentNode);
    
            var conceptNetApi = new ConceptNetApi(logger);
            var children = await conceptNetApi.getRelations(currentNode);
            var uniqueChildren = children.filter(word => !treeObj.hasOwnProperty(word));
            logger.debug('found \'Is A\' relations: ' + children);
    
            if(uniqueChildren.length > 0)
            {
                var currentObjNode = treeObj[currentNode];
                delete treeObj[currentNode];
                uniqueChildren.forEach((child)=>{
    
                    treeObj[child] = {};
                    treeObj[child][currentNode] = {};
                    treeObj[child][currentNode] = currentObjNode;
        
                    queue.push(child);
    
                    logger.debug('adding ' + child + ' to parent ' + currentNode);
                });
            } else {
                //ignore
                //look into adding edge without the node
            }
    
            currentNode = queue.shift();
        }
        
        var response = JSON.stringify(treeObj, null, 4);
    
        logger.debug('Response: ' + response);
        console.log(response);
    };
}
