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

        result.map((item)=>{
            item.id = item.id +"";
        })

        return this.success(result);

    }

    async saveAttributeAction(){
        try{
            const model = this.model('attribute');
            await model.saveData(this.post());
            return this.success();
        }catch(error){
            think.logger.error(error);
            return this.fail({
              errno: 1000,
              errmsg: '服务器异常，操作失败！',
            })
        }
        
    }

    async deleteAttributeAction(){

        try{
            const ids = this.post('ids');
            const model = this.model('attribute');
            await  model.where({id:['IN',ids]}).delete();
            return this.success();
        }catch(error){
            think.logger.error(error);
            return this.fail({
              errno: 1000,
              errmsg: '服务器异常，操作失败！',
            })
        }
    }

    async getAttributeInfoAction(){
        try{
            const model = this.model('attribute');
            let result = await model.field("id,attribute_category_id,name").where({id:this.post('id')}).find();
            result.attribute_category_id = result.attribute_category_id+"";
            return this.success(result)
        }catch(error){
            think.logger.error(error);
            return this.fail({
              errno: 1000,
              errmsg: '服务器异常，操作失败！',
            })
        }
    }

    async saveEditoryAttributeInfoAction(){
        try{
            const model = this.model('attribute');
            await model.where({id:this.post('id')}).update({attribute_category_id:this.post('attribute_category_id'),name:this.post('name')});
            return this.success()
        }catch(error){
            think.logger.error(error);
            return this.fail({
              errno: 1000,
              errmsg: '服务器异常，操作失败！',
            })
        }
    }

}