const Base = require('./base.js');

module.exports = class extends Base {

    async indexAction(){

        const model = this.model('attribute_category');

        const result = await model.getlist(this.post());

        return this.success(result);

    }

    async goodsAttributeAction(){

        const model = this.model('attribute');

        const result = await model.getlist(this.post());

        return this.success(result);

    }

    async gttributeGroupAction(){

        const model = this.model('attribute_category');

        let result = await model.field('id,name').where({enabled:1}).select();

        // topCategory.map((item) => {
        //     item.level = 1;
        //     categoryList.push(item);
        //   });

        result.map((item)=>{
            item.id = item.id +"";
        })

        return this.success(result);

    }



}