const Base = require('./base.js');

module.exports = class extends Base {

    async indexAction(){

        const model = this.model('attribute_category');

        const result = await model.getlist(this.post());

        return this.success(result);

    }



}