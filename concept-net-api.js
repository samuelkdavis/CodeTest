var fetch = require("node-fetch");

module.exports = class ConceptNetApi{
    constructor(logger){
        this._logger = logger;
    }

    //weight checking currently hardcoded to 2
    //smarter weight checking: https://github.com/commonsense/conceptnet/blob/master/conceptnet/concepttools/concept_tools_new.py#L75
    async getRelations(searchTerm) {

        try{
            var searchWord = searchTerm.replace(/ /g, '_');
    
            var url = 'http://api.conceptnet.io/query?node=/c/en/' + searchWord + '&rel=/r/IsA';
    
            this._logger.debug('calling url ' + url);
    
            var response = await fetch(url);
            const json = await response.json();
    
            var mapped = json.edges.reduce(function(result, item){
                var label = item.end.label;
    
                if(label !== searchTerm && !result.includes(label) && item.weight > 1) {
                    result.push(label);
                }
    
                return result;
            }, []);
    
            return mapped;
        } catch(err){
            console.error(500);
        }
    };
}